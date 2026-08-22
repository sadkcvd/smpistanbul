"use client";

import * as React from "react";

export function PostForm({
  initial,
  onSubmit,
  onCancel,
}: any) {
  const [title, setTitle] = React.useState(initial?.title ?? "");
  const [slug, setSlug] = React.useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = React.useState(initial?.excerpt ?? "");
  const [content, setContent] = React.useState(initial?.content ?? "");
  const [published, setPublished] = React.useState(initial?.published ?? false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ title, slug, excerpt, content, published });
      }}
      className="bg-white border rounded-2xl p-4 space-y-3"
    >
      <input
        className="w-full border p-2 rounded"
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />

      <textarea
        className="w-full border p-2 rounded"
        placeholder="excerpt"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
      />

      <textarea
        className="w-full border p-2 rounded h-40"
        placeholder="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        Yayınla
      </label>

      <div className="flex gap-2">
        <button className="px-4 py-2 bg-black text-white rounded">
          Kaydet
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-100 rounded"
        >
          İptal
        </button>
      </div>
    </form>
  );
}