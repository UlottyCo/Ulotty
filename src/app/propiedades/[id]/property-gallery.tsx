"use client";

import { useEffect, useState } from "react";

interface PropertyGalleryProps {
  photoUrls: string[];
  alt: string;
}

export function PropertyGallery({ photoUrls, alt }: PropertyGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const isOpen = openIndex !== null;

  function showPrev() {
    setOpenIndex((i) => (i === null ? null : (i - 1 + photoUrls.length) % photoUrls.length));
  }

  function showNext() {
    setOpenIndex((i) => (i === null ? null : (i + 1) % photoUrls.length));
  }

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (photoUrls.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {photoUrls.map((url, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={url}
            src={url}
            alt={alt}
            onClick={() => setOpenIndex(i)}
            className={`h-48 w-full cursor-pointer rounded-lg object-cover ${
              i === 0 ? "col-span-2 h-72 sm:col-span-3" : ""
            }`}
          />
        ))}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setOpenIndex(null)}
            className="absolute right-4 top-4 text-3xl text-white/80 hover:text-white"
          >
            ×
          </button>

          <p className="absolute top-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
            {openIndex + 1} / {photoUrls.length}
          </p>

          {photoUrls.length > 1 && (
            <button
              type="button"
              aria-label="Foto anterior"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-4xl text-white/80 hover:text-white sm:left-6"
            >
              ‹
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoUrls[openIndex]}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] object-contain"
          />

          {photoUrls.length > 1 && (
            <button
              type="button"
              aria-label="Foto siguiente"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-4xl text-white/80 hover:text-white sm:right-6"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
