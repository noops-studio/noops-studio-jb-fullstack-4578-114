import { useState } from "react";

interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) return null;
  
  const prev = () => setCurrent((current - 1 + images.length) % images.length);
  const next = () => setCurrent((current + 1) % images.length);

  return (
    <div className="relative">
      <img
        src={images[current]}
        alt={`Post image ${current + 1}`}
        className="w-full h-auto object-cover"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 opacity-50 hover:opacity-100"
          >
            Prev
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 opacity-50 hover:opacity-100"
          >
            Next
          </button>
        </>
      )}
    </div>
  );
}
