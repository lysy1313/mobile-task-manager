import { AppDateTimePickerInput } from './AppDateTimePickerInput';

type AppTimeInputProps = {
  label?: string;
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  error?: string;
};

function formatTime(date: Date | null, placeholder: string) {
  if (!date) {
    return placeholder;
  }

  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function AppTimeInput({
  label,
  value,
  onChange,
  placeholder = 'Select time',
  error,
}: AppTimeInputProps) {
  return (
    <AppDateTimePickerInput
      label={label}
      title="Select time"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      mode="time"
      error={error}
      formatValue={formatTime}
    />
  );
}
