import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

export interface ViewerImage {
  url: string;
  title?: string;
  caption?: string;
}

interface ImageViewerProps {
  isOpen: boolean;
  images: ViewerImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom & pan when image changes or viewer opens/closes
  useEffect(() => {
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });
    setIsDragging(false);
  }, [currentIndex, isOpen]);

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex] || images[0];

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isZoomed) return;
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isZoomed || touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  // Mouse pan handling when zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isZoomed || !isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPan({
      x: dragStartRef.current.panX + dx,
      y: dragStartRef.current.panY + dy,
    });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  return (
    <div
      ref={containerRef}
      id="lightbox-container"
      className="fixed inset-0 z-50 bg-[#05070d]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 transition-opacity duration-200 select-none animate-in fade-in"
      onClick={(e) => {
        if (e.target === containerRef.current) {
          onClose();
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Top Bar: Counter, Title & Controls */}
      <div className="flex items-center justify-between z-20 w-full max-w-5xl mx-auto py-2">
        <div className="flex items-center gap-3">
          {images.length > 1 && (
            <span className="font-mono text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md">
              {currentIndex + 1} / {images.length}
            </span>
          )}
          {currentImg.title && (
            <span className="text-xs font-mono text-zinc-300 truncate max-w-md hidden sm:inline">
              {currentImg.title}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Toggle */}
          <button
            type="button"
            onClick={() => {
              const nextZoom = !isZoomed;
              setIsZoomed(nextZoom);
              if (!nextZoom) setPan({ x: 0, y: 0 });
            }}
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
            className="p-2 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition text-xs font-mono flex items-center gap-1.5 cursor-pointer"
            title={isZoomed ? "Reset zoom" : "Zoom in"}
          >
            {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[11px]">{isZoomed ? 'Reset' : 'Zoom'}</span>
          </button>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image viewer"
            className="p-2 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div 
        className="relative flex-1 flex items-center justify-center overflow-hidden my-auto w-full max-w-5xl mx-auto py-2"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {/* Previous Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous image"
            className="absolute left-2 sm:left-4 z-20 p-2.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition duration-200 cursor-pointer shadow-lg"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Center Image Container */}
        <div
          className={`transition-all duration-200 ease-out flex items-center justify-center max-h-full max-w-full ${
            isZoomed ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
          }`}
          style={{
            transform: isZoomed 
              ? `scale(1.75) translate(${pan.x / 1.75}px, ${pan.y / 1.75}px)` 
              : 'scale(1) translate(0px, 0px)',
          }}
          onMouseDown={handleMouseDown}
          onClick={(e) => {
            e.stopPropagation();
            if (!isDragging) {
              const nextZoom = !isZoomed;
              setIsZoomed(nextZoom);
              if (!nextZoom) setPan({ x: 0, y: 0 });
            }
          }}
        >
          <img
            src={currentImg.url}
            alt={currentImg.title || 'System Diagram'}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="max-h-[76vh] max-w-[90vw] sm:max-w-[85vw] object-contain rounded-lg border border-zinc-800/80 shadow-2xl pointer-events-auto"
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next image"
            className="absolute right-2 sm:right-4 z-20 p-2.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition duration-200 cursor-pointer shadow-lg"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Bottom Bar: Caption / Helper */}
      <div className="w-full max-w-5xl mx-auto py-2 text-center text-xs text-zinc-400 font-sans z-20">
        {currentImg.caption && (
          <p className="max-w-2xl mx-auto text-zinc-300 font-medium truncate mb-1 text-xs sm:text-sm">
            {currentImg.caption}
          </p>
        )}
        <div className="text-[11px] font-mono text-zinc-500 flex items-center justify-center gap-4">
          <span className="hidden sm:inline">Use Arrow keys to navigate</span>
          <span>Click to {isZoomed ? 'zoom out' : 'zoom in'}{isZoomed ? ' · Drag to pan' : ''}</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
