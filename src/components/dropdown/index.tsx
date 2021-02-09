import * as React from "react";
import classnames from "classnames";
import "./select.scss";

type SelectProps = {
  options: Array<string>;
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void;
};

const Dropdown = (selectProps: SelectProps) => {
  const { options, onChange } = selectProps;

  return (
    <div className="trello-clone-select-container">
      <select className="select-css" onChange={onChange}>
        {options.map((option, idx) => (
          <option key={`${option}-${idx}`}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
