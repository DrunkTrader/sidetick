type ProgressBarProps = {
  value: number;
};

export function ProgressBar({ value }: ProgressBarProps): React.JSX.Element {
  return (
    <div className="h-2 w-full rounded-full bg-[var(--color-navy-light)]">
      <div
        className="h-2 rounded-full bg-[var(--color-teal)]"
        style={{ width: `${Math.max(0, Math.min(value, 100))}%` }}
      />
    </div>
  );
}
