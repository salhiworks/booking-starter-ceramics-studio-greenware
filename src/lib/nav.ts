/** The page's sections, in order — the header, the phone menu and the footer all list these. */
export const NAV: readonly { href: string; label: string; header?: false }[] = [
  { href: '#techniques', label: 'Wheel or hand' },
  { href: '#lessons', label: 'Lessons & prices' },
  { href: '#first-lesson', label: 'First lesson' },
  { href: '#clay-to-kiln', label: 'Clay to kiln' },
  { href: '#studio', label: 'The studio' },
  { href: '#good-to-know', label: 'Good to know' },
  { href: '#visit', label: 'Visit', header: false },
];
