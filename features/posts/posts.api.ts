import { Post } from "./posts.types";

export async function getPosts(): Promise<{ ok: boolean; data: Post[] }> {
  const res = await fetch("/api/admin/posts");
  return res.json();
}

export async function createPost(data: Partial<Post>) {
  const res = await fetch("/api/admin/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function updatePost(id: string, data: Partial<Post>) {
  const res = await fetch(`/api/admin/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deletePost(id: string) {
  const res = await fetch(`/api/admin/posts/${id}`, {
    method: "DELETE",
  });

  return res.json();
}