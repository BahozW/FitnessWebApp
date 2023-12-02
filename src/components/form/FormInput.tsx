import { FC } from "react";

interface InputProps {
  type: "text" | "number" | "email" | "password";
  label: string;
  name: string;
  placeholder?: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  min?: string;
}

const FormInput: FC<InputProps> = ({
  type,
  label,
  name,
  placeholder,
  error,
  disabled,
  min,
}) => {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        className="form-input"
        id={name}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        required
        min={min}
      />
      {error && <p className="form-error">Input field error</p>}
    </div>
  );
};

export default FormInput;