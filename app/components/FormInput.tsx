interface IFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
}

export default function FormInput({
  id,
  value,
  onChange,
  placeholder,
  disabled,
  type = "text",
  maxLength,
}: IFormInputProps) {
  return (
    <input
      id={id}
      maxLength={maxLength}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full rounded-lg border border-[#E5E5E5] px-4 py-3 bg-white text-[#333333] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#609f28] disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-800 dark:text-[#ededed] dark:placeholder-[#666666]"
    />
  );
}
