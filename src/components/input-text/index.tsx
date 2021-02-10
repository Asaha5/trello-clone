//
import * as React from "react";
import "./text.scss";

type TextInputProps = {
  type: "text" | "textarea";
  role?: "textbox" | "textarea";
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  value: string;
};

const TextInput = ({
  type,
  onChange,
  value,
  role,
  ...rest
}: TextInputProps) => {
  return (
    <div className="trello-clone-text-container">
      <input
        className="trello-clone-text-input"
        type={type}
        role={role}
        onChange={onChange}
        value={value}
        {...rest}
      />
    </div>
  );
};

export default TextInput;
