"use client";

import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getReviews,
  updateReview,
  deleteReview,
} from "./review.api";

export function useReviews() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "approved" | "pending">(
    "all"
  );

  const query = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });

  const update = useMutation({
    mutationFn: updateReview,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["reviews"] }),
  });

  const remove = useMutation({
    mutationFn: deleteReview,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["reviews"] }),
  });

  const filtered = useMemo(() => {
    const data = query.data?.data ?? [];

    return data.filter((r) => {
      const matchSearch =
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.comment.toLowerCase().includes(search.toLowerCase());

      const matchFilter =
        filter === "all"
          ? true
          : filter === "approved"
          ? r.approved
          : !r.approved;

      return matchSearch && matchFilter;
    });
  }, [query.data, search, filter]);

  return {
    reviews: filtered,

    isLoading: query.isLoading,
    error: query.error,

    search,
    setSearch,

    filter,
    setFilter,

    approve: (id: string) =>
      update.mutate({ id, approved: true }),

    hide: (id: string) =>
      update.mutate({ id, approved: false }),

    remove: (id: string) => remove.mutate(id),
  };
}