import type { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface InputProps {
  type: React.HTMLInputTypeAttribute;
  errorMessage?: string;
  placeholder?: string;
  className?: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: RegisterOptions<any>;
}
export default function Input({ type, register, rules, errorMessage, placeholder, className, name }: InputProps) {
  return (
    <div className={className}>
      <input
        type={type}
        className="p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
        placeholder={placeholder}
        {...register(name, rules)}
      />
      <div className="mt-1 text-red-600 min-h-[1.25rem] text-sm">{errorMessage}</div>
    </div>
  );
}
