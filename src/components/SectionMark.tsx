/**
 * The design's one ornament: the stage line — five short bars in the colours clay passes through
 * on its way to the kiln (wet · leather-hard · bone dry · bisque · glazed). A section's label is its
 * number, the stage line and its name in small capitals. Decorative — hidden from screen readers;
 * the heading below names the section.
 */
export function SectionMark({ n, label, tone }: { n: number; label: string; tone?: 'on-dark' }) {
  return (
    <p className={`section-mark ${tone ? `section-mark--${tone}` : ''}`} aria-hidden="true">
      <span className="section-mark__n">{String(n).padStart(2, '0')}</span>
      <StageLine />
      <span className="section-mark__label">{label}</span>
    </p>
  );
}

/** The five stages of clay as five short bars. `upTo` dims the stages after it. Decorative. */
export function StageLine({ className, upTo }: { className?: string; upTo?: number }) {
  return (
    <span className={`stage-line ${className ?? ''}`} aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`stage-line__bar stage-line__bar--${i}`} data-dim={upTo !== undefined && i > upTo ? '' : undefined} />
      ))}
    </span>
  );
}
