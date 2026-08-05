type GooglePreviewProps = {
  restaurant: string;
  image?: string;
  post: string;
};

export function GooglePreview({ restaurant, image, post }: GooglePreviewProps) {
  return (
    <div className="overflow-hidden bg-white">
      <div className="px-4 py-3">
        <p className="text-sm font-semibold text-[#263630]">{restaurant}</p>

        <p className="text-xs text-[#909891]">Latest update</p>
      </div>

      {image && <img src={image} className="h-48 w-full object-cover" />}

      <div className="px-4 py-4">
        <p className="whitespace-pre-line text-sm leading-relaxed text-[#37443c]">
          {post}
        </p>

        <button className="mt-4 rounded-lg border border-[#dadce0] px-4 py-2 text-sm font-medium text-[#1a73e8]">
          Learn more
        </button>
      </div>
    </div>
  );
}
