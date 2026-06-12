import React from "react";
import { cn } from "../helpers";

interface ProductImageProps {
  imageUrl?: string;
  title: string;
  ratio?: string;
}

export function ProductImage({ imageUrl, title, ratio = "aspect-[3/4]" }: ProductImageProps) {
  const fallbackImage = getFallbackImage(title);
  const initialSrc = imageUrl || fallbackImage;
  const [currentSrc, setCurrentSrc] = React.useState<string | undefined>(initialSrc);
  const [failed, setFailed] = React.useState(false);
  const canShowImage = Boolean(currentSrc && !failed);

  React.useEffect(() => {
    setCurrentSrc(imageUrl || fallbackImage);
    setFailed(false);
  }, [fallbackImage, imageUrl]);

  return (
    <div className={cn("overflow-hidden bg-zinc-100 dark:bg-zinc-900 transition-colors duration-200", ratio)}>
      {canShowImage ? (
        <img
          src={currentSrc}
          alt={title}
          loading="lazy"
          onError={() => {
            if (currentSrc !== fallbackImage) {
              setCurrentSrc(fallbackImage);
              return;
            }
            setFailed(true);
          }}
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

function getFallbackImage(title: string) {
  const normalized = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (normalized.includes("meo")) {
    return "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=800";
  }
  if (normalized.includes("cho") || normalized.includes("shiba") || normalized.includes("corgi")) {
    return "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800";
  }
  if (normalized.includes("ca ") || normalized.includes("koi")) {
    return "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=800";
  }
  if (normalized.includes("vet")) {
    return "https://images.unsplash.com/photo-1552728089-57bdde30ebd3?auto=format&fit=crop&q=80&w=800";
  }
  return "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800";
}
