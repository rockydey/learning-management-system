interface InputProps {
  title?: string;
  placeholder?: string;
  type?: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  required?: boolean;
  endText?: string;
  name?: string;
  error?: string;
  disabled?: boolean;
  accept?: string;
}

function Input({
  title,
  placeholder = "Type Here...",
  type = "text",
  value,
  onChange,
  endText,
  accept,
  required,
  disabled,
  name,
  error,
}: InputProps) {
  const inputId = name ? `input_${name}` : undefined;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="font-[500] text-[15px] relative cursor-pointer"
      >
        <div className="flex">
          {title && (
            <h2 className="text-base font-medium text-heading">{title}</h2>
          )}
          {required && <span className="text-red-500">*</span>}
        </div>
        <input
          id={inputId}
          type={type}
          value={value}
          name={name}
          accept={accept}
          onChange={onChange}
          className={`
            w-full focus:outline-0 border border-text px-5 py-2 rounded mt-2
            ${endText ? "pr-[50px]" : ""} 
            ${disabled ? "cursor-not-allowed" : ""} 
            ${error ? "border-red-500" : ""} 
            ${type === "file" ? "cursor-pointer" : ""}
          `}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          required={required}
        />
        {endText && (
          <p className="absolute -bottom-[2px] right-4 text-[12px] text-gray-400">
            {endText}
          </p>
        )}
      </label>

      {error && (
        <p className="input_error" role="alert">
          {error}!
        </p>
      )}
    </div>
  );
}

export default Input;
