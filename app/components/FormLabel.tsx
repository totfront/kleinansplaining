interface IFormLabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

export default function FormLabel({ htmlFor, children }: IFormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-[#333333] dark:text-[#ededed] mb-2"
    >
      {children}
    </label>
  );
}
