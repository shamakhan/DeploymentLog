import React, { useState, useRef, FormEvent } from 'react';
import { validate } from "./constants";
import { toast } from "react-toastify";

function DeploymentForm() {
  const [url, setUrl] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [version, setVersion] = useState("");

  const urlRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState({});

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = { url, templateName, version };
    const validation = validate(formData);
    if (validation.valid) {
      setErrors(() => {});
      const response = await fetch("/api/deployments", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(formData)
      });
      const json = await response.json();
      if (response.status !== 200) {
        toast(json.message);
      } else {
        if (json.status === "SUCCESS") {
          console.log(json)
        } else {
          toast(json.message);
        }
      }
    } else {
      setErrors(() => validation.errors);
      if (validation.errors && validation.errors.hasOwnProperty('url')) {
        if (urlRef.current !== null) {
          urlRef.current.focus();
        }
      }
    }
  }

  return (
    <div className="deployment-form">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="url">URL: </label>
          <input
          type="text"
          ref={urlRef}
          name="url"
          value={url}
          onChange={(evt) => setUrl(evt.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="templateName">Template Name: </label>
          <input
            type="text"
            name="templateName"
            value={templateName}
            onChange={(evt) => setTemplateName(evt.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="version">Version: </label>
          <input
            type="text"
            name="version"
            value={version}
            onChange={(evt) => setVersion(evt.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default DeploymentForm;
