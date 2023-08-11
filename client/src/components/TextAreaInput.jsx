import React from "react";

export default function TextAreaInput(
  question,
  name,
  value,
  handleInputChange
) {
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
        {/* <p className={project.description.length === 200 ? "warning" : ""}>
          {answers.description.length}/200
          {answers.description.length === 200 && (
            <span> Maximum number of characters reached</span>
          )}
        </p> */}
      </div>
    </div>
  );
}
