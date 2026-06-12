import React from "react";
import { cn } from "../helpers";

interface ProductImageProps {
  imageUrl?: string;
  title: string;
  ratio?: string;
}

export function ProductImage({ imageUrl, title, ratio = "aspect-[3/4]" }: ProductImageProps) {
  const [failed, setFailed] = React.useState(false);
  const canShowImage = Boolean(imageUrl && !failed);

  React.useEffect(() => {
    setFailed(false);
  }, [imageUrl]);

  return (
    <div className={cn("overflow-hidden bg-zinc-100 dark:bg-zinc-900 transition-colors duration-200", ratio)}>
      {canShowImage ? (
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="grid h-full w-full place-items-center bg-gradient-to-br from-zinc-100 to-zinc-200 px-3 text-center text-[11px] font-semibold text-zinc-400 dark:from-zinc-900 dark:to-zinc-800 dark:text-zinc-600">
          {title}
        </div>
      )}
    </div>
  );
}
