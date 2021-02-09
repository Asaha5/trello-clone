import * as React from "react";
import classnames from "classnames";
import "./button.scss";

type ButtonProps = {
  text: string;
  type?: "success" | "info";
  disabled?: boolean;
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
};

const Button = (buttonProps: ButtonProps) => {
  const { text, onClick, type = "success", disabled } = buttonProps;

  return (
    <div className="trello-clone-button">
      <button
        type="button"
        onClick={onClick}
        className={classnames({
          info: type === "info",
          success: type === "success",
        })}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
