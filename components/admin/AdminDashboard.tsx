"use client";

import * as React from "react";

import { useAppointments } from "@/features/appointments/useAppointments";
import { AppointmentTable } from "@/features/appointments/components/AppointmentTable";
import { AppointmentFilters } from "@/features/appointments/components/AppointmentFilters";

import { useReviews } from "@/features/reviews/useReviews";
import { ReviewTable } from "@/features/reviews/components/ReviewTable";
import { ReviewFilters } from "@/features/reviews/components/ReviewFilters";

import { usePosts } from "@/features/posts/usePosts";
import { PostTable } from "@/features/posts/components/PostTable";
import { PostForm } from "@/features/posts/components/PostForm";

type Tab = "appointments" | "reviews" | "posts";

export function AdminDashboard() {
  const [tab, setTab] = React.useState<Tab>("appointments");

  /**
   * APPOINTMENTS
   */
  const {
    appointments,
    isLoading: appointmentsLoading,
    error: appointmentsError,
    updateStatus,
    remove,
    search,
    setSearch,
    status,
    setStatus,
  } = useAppointments();

  /**
   * REVIEWS
   */
  const {
    reviews,
    isLoading: reviewsLoading,
    error: reviewsError,
    search: reviewSearch,
    setSearch: setReviewSearch,
    filter,
    setFilter,
    approve,
    hide,
    remove: removeReview,
  } = useReviews();

  /**
   * POSTS
   */
  const {
    posts,
    isLoading: postsLoading,
    create,
    update,
    remove: removePost,
  } = usePosts();

  const [editingPost, setEditingPost] = React.useState<any>(null);

  /**
   * =========================
   * TAB-AWARE STATS (CORE FIX)
   * =========================
   */
  const stats = React.useMemo(() => {
    if (tab === "appointments") {
      return {
        title: "Randevu Özeti",
        items: [
          { label: "Toplam", value: appointments.length, color: "gray" },
          {
            label: "Bekleyen",
            value: appointments.filter((a) => a.status === "pending").length,
            color: "amber",
          },
          {
            label: "Onaylı",
            value: appointments.filter((a) => a.status === "approved").length,
            color: "emerald",
          },
          {
            label: "Reddedilen",
            value: appointments.filter((a) => a.status === "rejected").length,
            color: "red",
          },
        ],
      };
    }

    if (tab === "reviews") {
      return {
        title: "Yorum Özeti",
        items: [
          { label: "Toplam", value: reviews.length, color: "gray" },
          {
            label: "Bekleyen",
            value: reviews.filter((r) => !r.approved).length,
            color: "amber",
          },
          {
            label: "Onaylı",
            value: reviews.filter((r) => r.approved).length,
            color: "emerald",
          },
        ],
      };
    }

    return {
      title: "Blog Özeti",
      items: [
        { label: "Toplam", value: posts.length, color: "gray" },
        {
          label: "Yayında",
          value: posts.filter((p) => p.published).length,
          color: "emerald",
        },
        {
          label: "Taslak",
          value: posts.filter((p) => !p.published).length,
          color: "amber",
        },
      ],
    };
  }, [tab, appointments, reviews, posts]);

  const colorMap: Record<string, string> = {
    gray: "bg-gray-50 border-gray-200",
    amber: "bg-amber-50 border-amber-100",
    emerald: "bg-emerald-50 border-emerald-100",
    red: "bg-red-50 border-red-100",
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* CONTAINER */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* HEADER */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm min-h-[200px]">

          <h1 className="text-2xl font-bold text-gray-900">
            Yönetim Paneli
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            {stats.title}
          </p>

          {/* TAB STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {stats.items.map((s) => (
              <div
                key={s.label}
                className={`p-4 rounded-xl border ${colorMap[s.color]}`}
              >
                <div className="text-xs text-gray-500">
                  {s.label}
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-2 bg-white border border-gray-200 rounded-2xl p-2 shadow-sm">
          {[
            { id: "appointments", label: "Randevular" },
            { id: "reviews", label: "Yorumlar" },
            { id: "posts", label: "Blog Yazıları" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as Tab)}
              className={`
                px-4 py-2 text-sm rounded-xl font-semibold transition
                ${
                  tab === t.id
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="relative min-h-[800px]">

          {/* APPOINTMENTS */}
          <div className={tab === "appointments" ? "block space-y-4" : "hidden"}>
            <AppointmentFilters
              search={search}
              setSearch={setSearch}
              status={status}
              setStatus={setStatus}
            />

            <AppointmentTable
              data={appointments}
              onApprove={(id) => updateStatus(id, "approved")}
              onReject={(id) => updateStatus(id, "rejected")}
              onDelete={(id) => remove(id)}
            />
          </div>

          {/* REVIEWS */}
          <div className={tab === "reviews" ? "block space-y-4" : "hidden"}>
            <ReviewFilters
              search={reviewSearch}
              setSearch={setReviewSearch}
              filter={filter}
              setFilter={setFilter}
            />

            <ReviewTable
              data={reviews}
              onApprove={approve}
              onHide={hide}
              onDelete={removeReview}
            />
          </div>

          {/* POSTS */}
          <div className={tab === "posts" ? "block space-y-6" : "hidden"}>
            <PostForm
              initial={editingPost}
              onSubmit={(data: any) => {
                if (editingPost) update(editingPost.id, data);
                else create(data);
                setEditingPost(null);
              }}
              onCancel={() => setEditingPost(null)}
            />

            <PostTable
              data={posts}
              onEdit={setEditingPost}
              onDelete={removePost}
              onTogglePublish={(p: any) =>
                update(p.id, { published: !p.published })
              }
            />
          </div>

        </div>
      </div>
    </div>
  );
}