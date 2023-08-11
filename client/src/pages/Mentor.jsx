import React from "react";
import { useState } from "react";
import TextAreaInput from "../components/TextAreaInput";

export default function Mentor() {
  const [answers, setAnswers] = useState({
    fullName: "",
    email: "",
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
  });
  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    emailInputEmpty: false,
    q1: false,
    q2: false,
    q3: false,
    q4: false,
    q5: false,
    q6: false,
    q7: false,
  });

  const isValidEmail = (email) => {
    const res = email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    return res !== null;
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setAnswers((state) => ({
      ...state,
      [name]: value,
    }));
    setErrors((state) => ({
      ...state,
      [name]: false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let tempErrors = { ...errors };

    // Check if full name is empty
    if (!answers.fullName.trim()) {
      tempErrors.fullName = true;
    }

    // Check if Email is valid
    if (!isValidEmail(answers.email) && answers.email.length > 0) {
      tempErrors.email = true;
    }

    // Check if Email is empty
    if (!answers.email.trim()) {
      tempErrors.emailInputEmpty = true;
    }

    // Check if questions are empty
    const questionNames = ["q1", "q2", "q3", "q4", "q5", "q6", "q7"];

    for (const name of questionNames) {
      if (!answers[name].trim()) {
        tempErrors[name] = true;
      }
    }

    setErrors(tempErrors);
    return;
  };
  return (
    <div>
      <div className="outer-container">
        <div className="container">
          <div className="card">
            <div className="card-content">
              <div className="form-container content">
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    {/* This name input field should be removed when registration is created */}
                    <label className="label">What is your full name?</label>
                    <input
                      className="input is-rounded"
                      name="fullName"
                      value={answers.fullName}
                      onChange={handleInputChange}
                    />
                    {errors.fullName && (
                      <p className="warning">Please enter your full name</p>
                    )}
                  </div>
                  <div className="field">
                    <label className="label">Email</label>
                    <input
                      className="input is-rounded"
                      name="email"
                      value={answers.email}
                      onChange={handleInputChange}
                    />
                    {/* Change for email */}
                    {errors.email && <p className="warning">Invalid Email</p>}
                    {errors.emailInputEmpty && (
                      <p className="warning">Email is required</p>
                    )}
                  </div>
                  <TextAreaInput
                    question="Tell us about your career experience in tech and what technologies are you proficient in?"
                    name="q1"
                    value={answers.q1}
                    handleInputChange={handleInputChange}
                  />
                  {errors.q1 && (
                    <p className="warning">Please answer the question</p>
                  )}

                  <TextAreaInput
                    question="What are you most passionate about in your career?"
                    name="q2"
                    value={answers.q2}
                    handleInputChange={handleInputChange}
                  />
                  {errors.q2 && (
                    <p className="warning">Please answer the question</p>
                  )}

                  <TextAreaInput
                    question="What do you believe are the most important qualities of a successful mentor-mentee relationship?"
                    name="q3"
                    value={answers.q3}
                    handleInputChange={handleInputChange}
                  />
                  {errors.q3 && (
                    <p className="warning">Please answer the question</p>
                  )}

                  <TextAreaInput
                    question="What are you hoping to get out of being a mentor?"
                    name="q4"
                    value={answers.q4}
                    handleInputChange={handleInputChange}
                  />
                  {errors.q4 && (
                    <p className="warning">Please answer the question</p>
                  )}

                  <TextAreaInput
                    question="What would an ideal mentee profile look like for you?"
                    name="q5"
                    value={answers.q5}
                    handleInputChange={handleInputChange}
                  />
                  {errors.q5 && (
                    <p className="warning">Please answer the question</p>
                  )}

                  <TextAreaInput
                    question="What was your career before your time at CodeOp?"
                    name="q6"
                    value={answers.q6}
                    handleInputChange={handleInputChange}
                  />
                  {errors.q6 && (
                    <p className="warning">Please answer the question</p>
                  )}

                  <TextAreaInput
                    question="Are there any parts of your identity that might make you somebody’s role model? (eg: gender, ethnicity, sexual orientation, cultural background)"
                    name="q7"
                    value={answers.q7}
                    handleInputChange={handleInputChange}
                  />
                  {errors.q7 && (
                    <p className="warning">Please answer the question</p>
                  )}

                  <div className="is-align-content-end">
                    <button
                      className="button is-primary is-rounded"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
