"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "./posts.api";

import { Post } from "./posts.types";

/**
 * API response type FIX
 */
type PostsResponse = {
  ok: boolean;
  data: Post[];
};

export function usePosts() {
  const queryClient = useQueryClient();

  const query = useQuery<PostsResponse>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const create = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Post> }) =>
      updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const remove = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return {
    posts: query.data?.data ?? [],
    isLoading: query.isLoading,
    error: query.error,

    create: (data: Partial<Post>) => create.mutate(data),
    update: (id: string, data: Partial<Post>) => update.mutate({ id, data }),
    remove: (id: string) => remove.mutate(id),
  };
}