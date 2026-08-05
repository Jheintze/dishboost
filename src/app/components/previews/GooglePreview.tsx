type GooglePreviewProps = {
  restaurant: string;
  image?: string;
  summary: string;
  details: string;
  cta: string;
};

export function GooglePreview({
  restaurant,
  image,
  summary,
  details,
  cta,
}: GooglePreviewProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#dadce0] bg-white">
      {/* Header */}
      <div className="px-4 py-3">
        <p className="text-base font-semibold text-[#202124]">{restaurant}</p>

        <p className="text-xs text-[#5f6368]">Latest update</p>
      </div>

      {/* Image */}
      {image && <img src={image} className="h-52 w-full object-cover" />}

      {/* Content */}
      <div className="px-4 py-4">
        <p className="text-sm font-medium leading-relaxed text-[#202124]">
          {summary}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-[#5f6368]">{details}</p>

        <p className="mt-4 text-sm font-medium text-[#202124]">{cta}</p>

        <button className="mt-5 rounded-full border border-[#dadce0] px-5 py-2 text-sm font-medium text-[#1a73e8]">
          Learn more
        </button>
      </div>
    </div>
  );
}