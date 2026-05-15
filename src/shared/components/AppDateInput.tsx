import { AppDateTimePickerInput } from './AppDateTimePickerInput';

type AppDateInputProps = {
  label?: string;
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  error?: string;
};

function formatDate(date: Date | null, placeholder: string) {
  if (!date) {
    return placeholder;
  }

  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function AppDateInput({
  label,
  value,
  onChange,
  placeholder = 'Select date',
  error,
}: AppDateInputProps) {
  return (
    <AppDateTimePickerInput
      label={label}
      title="Select date"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      mode="date"
      error={error}
      formatValue={formatDate}
    />
  );
}
