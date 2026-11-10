import type { SiteImage } from '@profitstudio/booking-engine';
import { Photo } from './Photo';

interface FrameProps {
  image: SiteImage | null;
  sizes: string;
  /** Shows the small "Sample" tag on the photo until the owner replaces it. */
  sample: boolean;
  caption?: string;
  className?: string;
  priority?: boolean;
}

/**
 * A photograph with its optional caption below and, until the owner replaces it, a small
 * "Sample" tag. Renders nothing without an image, so a removed photo never leaves a hole.
 */
export function Frame({ image, sizes, sample, caption, className, priority }: FrameProps) {
  if (!image) return null;
  return (
    <figure className={`photo-figure ${className ?? ''}`}>
      <div className="photo-figure__frame">
        <Photo image={image} sizes={sizes} priority={priority} />
        {sample && <span className="tag tag--on-photo">Sample</span>}
      </div>
      {caption && <figcaption className="caption">{caption}</figcaption>}
    </figure>
  );
}
