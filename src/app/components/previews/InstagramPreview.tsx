import Icon from "../icons";

type InstagramPreviewProps = {
  restaurant: string;
  description: string;
  image?: string;
  post: string;
};

export function InstagramPreview({
  restaurant,
  description,
  image,
  post,
}: InstagramPreviewProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#e6e4df] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {/* fake profile picture */}
          <div className="size-9 rounded-full bg-[#dfe8df]" />

          <div>
            <p className="text-sm font-semibold text-[#263630]">{restaurant}</p>

            <p className="text-xs text-[#909891] line-clamp-1">{description}</p>
          </div>
        </div>

        <Icon name="more" className="size-5 text-[#59665f]" />
      </div>

      {/* Post image */}
      {image && (
        <img src={image} className="aspect-square w-full object-cover" />
      )}

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex gap-4">
          <Icon name="heart" className="size-5 text-[#263630]" />

          <Icon name="comment" className="size-5 text-[#263630]" />

          <Icon name="send" className="size-5 text-[#263630]" />
        </div>

        <Icon name="bookmark" className="size-5 text-[#263630]" />
      </div>

      {/* Caption */}
      <div className="px-4 pb-4 text-sm leading-relaxed text-[#37443c]">
        <p>
          <span className="font-semibold">{restaurant}</span> {post}
        </p>
      </div>
    </div>
  );
}
