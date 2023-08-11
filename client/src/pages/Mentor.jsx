import React from "react";
import { useState } from "react";
import TextAreaInput from "../components/TextAreaInput";

export default function Mentor() {
  const [project, setProject] = useState({
    image: "",
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    title: false,
    image: false,
  });

  const isValidUrl = (image) => {
    const res = image.match(
      /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i
    );
    return res !== null;
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setProject((state) => ({
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

    // Check if title is non-empty
    if (!project.title.trim()) {
      tempErrors.title = true;
    }

    // Check if URL is valid
    if (!isValidUrl(project.image)) {
      tempErrors.image = true;
    }

    if (tempErrors.title || tempErrors.image) {
      setErrors(tempErrors);
      return;
    }

    props.addProject(project);
    setProject({
      image: "",
      title: "",
      description: "",
    });
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
                      name="name"
                      value={project.title}
                      onChange={handleInputChange}
                    />
                    {errors.title && (
                      <p className="warning">Please enter your full name</p>
                    )}
                  </div>
                  <div className="field">
                    <label className="label">Email</label>
                    <input
                      className="input is-rounded"
                      name="image"
                      value={project.image}
                      onChange={handleInputChange}
                    />
                    {/* Change for email */}
                    {errors.image && <p className="warning">Invalid Email</p>}
                  </div>
                  <TextAreaInput
                    question="What do you believe are the most important qualities of a successful mentor-mentee relationship?"
                    name="q1"
                  />

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
