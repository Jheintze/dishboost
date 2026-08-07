import { capitalizeWords } from "@/app/lib/utils/text";

type FacebookPreviewProps = {
  restaurant: string;
  image?: string | null;
  post: string;
  cta: string;
};

export function FacebookPreview({
  restaurant,
  image,
  post,
  cta,
}: FacebookPreviewProps) {
  const displayRestaurant = capitalizeWords(restaurant);
  return (
    <div className="overflow-hidden bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-[#1877F2] text-sm font-bold text-white">
          {restaurant.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="text-sm font-semibold text-[#263630]">
            {displayRestaurant}
          </p>

          <p className="text-xs text-[#909891]">Just now · 🌎</p>
        </div>
      </div>

      {/* Post text */}
      <p className="px-4 pb-3 whitespace-pre-line text-sm leading-relaxed text-[#37443c]">
        {post}
      </p>
      <p className="px-4 pt-2 pb-4 text-sm font-medium text-[#37443c]">{cta}</p>

      {/* Image */}
      {image && <img src={image} className="h-56 w-full object-cover" />}

      {/* Reactions */}
      <div className="flex items-center justify-between px-4 py-3 text-xs text-[#59665f]">
        <span>👍 ❤️ 1027</span>
        <span>397 comments</span>
      </div>

      {/* Actions */}
      <div className="mx-4 flex border-t border-[#eceae5] py-2 text-sm font-medium text-[#59665f]">
        <span className="flex-1 text-center">👍 Like</span>

        <span className="flex-1 text-center">💬 Comment</span>

        <span className="flex-1 text-center">↗ Share</span>
      </div>
    </div>
  );
}
