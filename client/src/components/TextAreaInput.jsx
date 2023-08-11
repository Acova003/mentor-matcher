import React from "react";

export default function TextAreaInput(props) {
  const { question, name, value, handleInputChange } = props;
  return (
    <div>
      <div className="field">
        <label className="label">{question}</label>
        <textarea
          className="textarea"
          name={name}
          value={value}
          onChange={handleInputChange}
          maxLength={200}
        />
      </div>
      <div className="char-count">
        <p className={{ value }.length === 200 ? "warning" : ""}>
          {value.length}/200
          {value.length === 200 && (
            <span> Maximum number of characters reached</span>
          )}
        </p>
      </div>
    </div>
  );
}
