'use client';

import { Children, useRef, useState, type ReactNode } from 'react';

interface MobileCarouselProps {
  children: ReactNode;
  /** Grid classes applied above the mobile breakpoint, e.g. "sm:grid-cols-2 sm:gap-6" */
  desktopClassName?: string;
  /** The breakpoint at which the desktop grid takes over — must match the
      breakpoint used in desktopClassName ("sm" or "md"). */
  until?: 'sm' | 'md';
}

export default function MobileCarousel({
  children,
  desktopClassName = '',
  until = 'sm',
}: MobileCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - 16, behavior: 'smooth' });
  };

  const onScroll = () => {
    const el = trackRef.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first) return;
    const step = first.offsetWidth + 16;
    setActive(Math.min(count - 1, Math.max(0, Math.round(el.scrollLeft / step))));
  };

  const trackClasses =
    until === 'md'
      ? 'max-md:flex max-md:gap-4 max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:-mx-4 max-md:px-4 max-md:pb-2 max-md:[&::-webkit-scrollbar]:hidden'
      : 'max-sm:flex max-sm:gap-4 max-sm:overflow-x-auto max-sm:snap-x max-sm:snap-mandatory max-sm:-mx-4 max-sm:px-4 max-sm:pb-2 max-sm:[&::-webkit-scrollbar]:hidden';
  const cardClasses =
    until === 'md'
      ? 'max-md:w-[85%] max-md:shrink-0 max-md:snap-start [&>*]:h-full'
      : 'max-sm:w-[85%] max-sm:shrink-0 max-sm:snap-start [&>*]:h-full';
  const dotsHidden = until === 'md' ? 'md:hidden' : 'sm:hidden';

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={onScroll}
        className={`grid ${trackClasses} ${desktopClassName}`}
        style={{ scrollbarWidth: 'none' }}
      >
        {Children.map(children, (child, i) => (
          <div key={i} className={cardClasses}>
            {child}
          </div>
        ))}
      </div>
      <div className={`mt-6 flex justify-center gap-2 ${dotsHidden}`}>
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => scrollToIndex(i)}
            className="h-2 rounded-full transition-all"
            style={{
              width: i === active ? '24px' : '8px',
              backgroundColor:
                i === active ? 'var(--color-primary)' : 'rgba(0,0,0,0.15)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
