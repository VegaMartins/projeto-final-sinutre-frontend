interface MacroStatProps {
  label: string;
  value: number;
  unit: string;
  variant?: 'default' | 'highlight';
  goal?: number;
  hint?: string;
}

export function MacroStat({
  label,
  value,
  unit,
  variant = 'default',
  goal,
  hint,
}: MacroStatProps) {
  const isHighlight = variant === 'highlight';

  const wrapperClasses = isHighlight
    ? 'stat text-center bg-primary text-primary-content border-none shadow-md'
    : 'stat text-center lg:border-r border-base-200';

  const valueMutedClass = isHighlight
    ? 'opacity-70'
    : 'text-base-content/60';

  const titleClass = isHighlight
    ? 'stat-title font-semibold mt-1 text-primary-content/80'
    : 'stat-title font-semibold mt-1';

  const descClass = isHighlight
    ? 'stat-desc font-medium text-primary-content/60'
    : 'stat-desc font-medium text-base-content/50';

  return (
    <div className={wrapperClasses}>
      <div className="stat-value text-2xl lg:text-4xl mb-1">
        {value}
        {goal !== undefined ? (
          <span className={`text-sm lg:text-xl font-normal ${valueMutedClass}`}>
            {' '}/ {goal}
          </span>
        ) : (
          <span className={`text-sm lg:text-xl font-normal ${valueMutedClass}`}>
            {unit}
          </span>
        )}
      </div>
      <div className={titleClass}>{label}</div>
      {hint && <div className={descClass}>{hint}</div>}
    </div>
  );
}
