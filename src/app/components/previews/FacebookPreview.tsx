type FacebookPreviewProps = {
  post: string;
};

export function FacebookPreview({ post }: FacebookPreviewProps) {
  return (
    <>
      <div className="flex gap-4 px-4 pt-3 text-lg text-[#59665f]">♡ 💬 ↗</div>

      <p className="px-4 pb-4 pt-2 line-clamp-6 whitespace-pre-line text-sm leading-relaxed text-[#37443c]">
        {post}
      </p>
    </>
  );
}
