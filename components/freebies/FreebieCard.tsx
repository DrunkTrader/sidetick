type FreebieCardProps = {
  category: string;
  icon: string;
  title: string;
  description: string;
  format: string;
  isUnlocked: boolean;
  onUnlockClick: () => void;
  onDownloadClick: () => void;
};

export function FreebieCard({
  category,
  icon,
  title,
  description,
  format,
  isUnlocked,
  onUnlockClick,
  onDownloadClick,
}: FreebieCardProps): React.JSX.Element {
  return (
    <article className="rounded-2xl border border-[rgba(0,200,150,0.12)] bg-white p-5 shadow-[0_8px_24px_rgba(10,22,40,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-[rgba(26,107,255,0.12)] px-3 py-1 text-xs font-medium text-[var(--color-blue)]">
          {category}
        </span>
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="font-[var(--font-display)] text-lg text-[var(--color-text-dark)]">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs">{format}</span>
        {isUnlocked ? (
          <button
            type="button"
            onClick={onDownloadClick}
            className="rounded-full bg-[var(--gradient-cta)] px-4 py-2 text-xs font-semibold text-[var(--color-navy)]"
          >
            ⬇ Download Now
          </button>
        ) : (
          <button
            type="button"
            onClick={onUnlockClick}
            className="rounded-full border border-[rgba(0,200,150,0.24)] px-4 py-2 text-xs font-semibold text-[var(--color-text-dark)]"
          >
            🔒 Unlock to Download
          </button>
        )}
      </div>
    </article>
  );
}
