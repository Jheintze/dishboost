type GooglePreviewProps = {
  post: string;
};

export function GooglePreview({ post }: GooglePreviewProps) {
  return (
    <>
     

      <p className="px-4 pb-4 pt-2 line-clamp-6 whitespace-pre-line text-sm leading-relaxed text-[#37443c]">
        {post}
      </p>
    </>
  );
}
