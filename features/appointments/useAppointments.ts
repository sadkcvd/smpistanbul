"use client";

import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from "./appointment.api";
import { AppointmentStatus } from "./appointment.types";

export function useAppointments() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const query = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  const updateStatus = useMutation({
    mutationFn: updateAppointmentStatus,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["appointments"] }),
  });

  const remove = useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["appointments"] }),
  });

  const filtered = useMemo(() => {
    const data = query.data?.data ?? [];

    return data.filter((a) => {
      const matchSearch =
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.phone.includes(search);

      const matchStatus = status === "all" || a.status === status;

      return matchSearch && matchStatus;
    });
  }, [query.data, search, status]);

  return {
    appointments: filtered,
    raw: query.data?.data ?? [],

    isLoading: query.isLoading,
    error: query.error,

    search,
    setSearch,
    status,
    setStatus,

    updateStatus: (id: string, status: AppointmentStatus) =>
      updateStatus.mutate({ id, status }),

    remove: (id: string) => remove.mutate(id),
  };
}