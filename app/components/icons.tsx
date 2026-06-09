export function VerifiedBadge({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#3da4ff"
        d="M12 1.5l2.4 1.7 2.9-.3 1.2 2.7 2.6 1.4-.6 2.9 1.7 2.4-1.7 2.4.6 2.9-2.6 1.4-1.2 2.7-2.9-.3L12 22.5l-2.4-1.7-2.9.3-1.2-2.7-2.6-1.4.6-2.9L2.5 12l1.7-2.4-.6-2.9 2.6-1.4 1.2-2.7 2.9.3L12 1.5z"
      />
      <path
        fill="#fff"
        d="M10.6 14.6l-2.2-2.2a.9.9 0 011.3-1.3l1.6 1.6 3.4-3.4a.9.9 0 011.3 1.3l-4 4a.9.9 0 01-1.4 0z"
      />
    </svg>
  );
}
