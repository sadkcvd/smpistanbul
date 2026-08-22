import { Review } from "./review.types";

type ApiResponse<T> = {
  ok: boolean;
  data: T;
  message?: string;
};

export async function getReviews(): Promise<ApiResponse<Review[]>> {
  const res = await fetch("/api/admin/reviews");
  return res.json();
}

export async function updateReview(input: {
  id: string;
  approved: boolean;
}): Promise<ApiResponse<Review>> {
  const res = await fetch("/api/admin/reviews", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  return res.json();
}

export async function deleteReview(
  id: string
): Promise<ApiResponse<null>> {
  const res = await fetch(`/api/admin/reviews?id=${id}`, {
    method: "DELETE",
  });

  return res.json();
}