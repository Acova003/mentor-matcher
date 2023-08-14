import React from "react";
import { useState } from "react";
import TextAreaInput from "../components/TextAreaInput";

export default function Mentor() {
  const [answers, setAnswers] = useState({
    firstName: "",
    lastName: "",
    email: "",
    linkedinUrl: "",
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
  });
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    emailInputEmpty: false,
    linkedinUrl: false,
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

  const isValidLinkedInUrl = (linkedinUrl) => {
    const res = linkedinUrl.match(
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in\/[^\/]+\/?|(pub\/[^\/]+\/[^\/]+\/[^\/]+\/[^\/]+)|(company\/[^\/]+\/?))$/
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let tempErrors = { ...errors };

    // Check if first name is empty
    if (!answers.firstName.trim()) {
      tempErrors.firstName = true;
    }

    // Check if last name is empty
    if (!answers.lastName.trim()) {
      tempErrors.lastName = true;
    }

    // Check if Email is valid
    if (!isValidEmail(answers.email) && answers.email.length > 0) {
      tempErrors.email = true;
    }

    // Check if Email is empty ///////// THERE IS A BUG HERE WHEN THIS HAS THROWN AN ERRO IT STAYS AS AN ERROR
    if (!answers.email.trim()) {
      tempErrors.emailInputEmpty = true;
    }

    // Check if LinkedIn URL is valid
    if (
      !isValidLinkedInUrl(answers.linkedinUrl) &&
      answers.linkedinUrl.length > 0
    ) {
      tempErrors.linkedinUrl = true;
    }

    // Check if questions are empty
    const questionNames = ["q1", "q2", "q3", "q4", "q5", "q6", "q7"];

    // loop through all questions and check if they are empty
    for (const name of questionNames) {
      if (!answers[name].trim()) {
        tempErrors[name] = true;
      }
    }

    setErrors(tempErrors);
    // if any errors are true, return
    // send data to backend
    // if successful, redirect to success page
    // else, show error message

    if (Object.values(tempErrors).includes(true)) {
      return;
    }
    try {
      // Serialize JSON and send the request
      const response = await fetch("/api/mentors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: answers.firstName,
          last_name: answers.lastName,
          email: answers.email,
          linkedin_url: answers.linkedinUrl,
          // remove special characters from answers to sanitize the input
          q1: answers.q1.replace(/[^\w\s]/gi, ""),
          q2: answers.q2.replace(/[^\w\s]/gi, ""),
          q3: answers.q3.replace(/[^\w\s]/gi, ""),
          q4: answers.q4.replace(/[^\w\s]/gi, ""),
          q5: answers.q5.replace(/[^\w\s]/gi, ""),
          q6: answers.q6.replace(/[^\w\s]/gi, ""),
          q7: answers.q7.replace(/[^\w\s]/gi, ""),
        }),
      });

      // Parse the response JSON
      const data = await response.json();
      console.log(data);

      if (data.message) {
        alert(
          "You've successfully submitted your questionnaire! We'll be in touch soon."
        );

        // Reset the form after successful submission
        setAnswers({
          firstName: "",
          lastName: "",
          email: "",
          linkedinUrl: "",
          q1: "",
          q2: "",
          q3: "",
          q4: "",
          q5: "",
          q6: "",
          q7: "",
        });
      }
    } catch (err) {
      console.error("Error during submission:", err);
      alert("An error occurred while submitting the form.");
    }
  };
  return (
    <div>
      <div className="is-hidden-mobile" id="mentee-greeting">
        <p className="subtitle is-3">
          Thank you for your interest in CodeOp's mentorship program! Please
          fill out the following questionnaire below to help us match you with a
          student mentee.
        </p>

        {/* embed youtube video */}
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/bQsfsYRq8d0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div className="outer-container">
        <div className="container">
          <div className="card">
            <div className="card-content">
              <div className="form-container content">
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    {/* This name input field should be removed when registration is created */}
                    <label className="label">What is your first name?</label>
                    <input
                      className="input is-rounded"
                      name="firstName"
                      value={answers.firstName}
                      onChange={handleInputChange}
                    />
                    {errors.firstName && (
                      <p className="warning">*Please enter your first name</p>
                    )}
                  </div>
                  <div className="field">
                    {/* This name input field should be removed when registration is created */}
                    <label className="label">What is your last name?</label>
                    <input
                      className="input is-rounded"
                      name="lastName"
                      value={answers.lastName}
                      onChange={handleInputChange}
                    />
                    {errors.lastName && (
                      <p className="warning">*Please enter your last name</p>
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
                    {errors.email && <p className="warning">*Invalid Email</p>}
                    {errors.emailInputEmpty && (
                      <p className="warning">*Email is required</p>
                    )}
                  </div>
                  <div className="field">
                    <label className="label">LinkedIn profile URL</label>
                    <input
                      className="input is-rounded"
                      name="linkedinUrl"
                      value={answers.linkedinUrl}
                      onChange={handleInputChange}
                    />
                    {errors.linkedinUrl && (
                      <p className="warning">*Invalid LinkedIn URL</p>
                    )}
                  </div>
                  <TextAreaInput
                    question="Tell us about your career experience in tech and what technologies are you proficient in?"
                    name="q1"
                    value={answers.q1}
                    handleInputChange={handleInputChange}
                  />
                  {errors.q1 && (
                    <p className="warning">*Please answer the question</p>
                  )}

                  <TextAreaInput
                    question="What are you most passionate about in your career?"
                    name="q2"
                    value={answers.q2}
                    handleInputChange={handleInputChange}
                  />
                  {errors.q2 && (
                    <p className="warning">*Please answer the question</p>
                  )}

                  <TextAreaInput
                    question="What do you believe are the most important qualities of a successful mentor-mentee relationship?"
                    name="q3"
                    value={answers.q3}
                    handleInputChange={handleInputChange}
                  />
                  {errors.q3 && (
                    <p className="warning">*Please answer the question</p>
                  )}

                  <TextAreaInput
                    question="What are you hoping to get out of being a mentor?"
                    name="q4"
                    value={answers.q4}
                    handleInputChange={handleInputChange}
                  />
                  {errors.q4 && (
                    <p className="warning">*Please answer the question</p>
                  )}

                  <TextAreaInput
                    question="What would an ideal mentee profile look like for you?"
                    name="q5"
                    value={answers.q5}
                    handleInputChange={handleInputChange}
                  />
                  {errors.q5 && (
                    <p className="warning">*Please answer the question</p>
                  )}

                  <TextAreaInput
                    question="What was your career before your time at CodeOp?"
                    name="q6"
                    value={answers.q6}
                    handleInputChange={handleInputChange}
                  />
                  {errors.q6 && (
                    <p className="warning">*Please answer the question</p>
                  )}

                  <TextAreaInput
                    question="Are there any parts of your identity that might make you somebody’s role model? (eg: gender, ethnicity, sexual orientation, cultural background)"
                    name="q7"
                    value={answers.q7}
                    handleInputChange={handleInputChange}
                  />
                  {errors.q7 && (
                    <p className="warning">*Please answer the question</p>
                  )}

                  <div className="is-align-content-end">
                    <button
                      className="button is-primary is-rounded"
                      type="submit"
                      style={{ marginTop: "16px" }}
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
