interface CheckboxFieldProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

export default function CheckboxField({
  id,
  label,
  description,
  checked,
  disabled,
  onChange,
}: CheckboxFieldProps) {
  return (
    <label
      htmlFor={id}
      className="flex items-start gap-3 cursor-pointer group"
    >
      <div className="relative flex items-center justify-center mt-0.5">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="peer appearance-none w-4 h-4 border border-slate-700 rounded-sm bg-white checked:bg-amber-600 checked:border-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        />
        {/* Custom checkmark */}
        <svg
          className="absolute size-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M2 6l3 3 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
          {label}
        </span>
        {description && (
          <span className="text-xs text-gray-400 mt-0.5">{description}</span>
        )}
      </div>
    </label>
  );
}