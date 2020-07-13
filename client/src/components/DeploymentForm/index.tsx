import React, { useState, useRef, FormEvent, useEffect } from 'react';
import { validate } from "./constants";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback, Row } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../store";
import { API_ROOT } from "../../constants";
import "./style.scss";
import { List, Map } from 'immutable';
import { addingDeployment, deploymentAdded, failedToAddDeployment } from "../../store/deployments/actions";

function DeploymentForm() {
  const [url, setUrl] = useState("");
  
  const [templateOptions, setTemplateOptions] = useState<string[]>([]);
  const [templateName, setTemplateName] = useState("");
  
  const [versionOptions, setVersionOptions] = useState<string[]>([]);
  const [version, setVersion] = useState("");

  const { templatesLoading, templates, adding } = useSelector((state: RootState) => ({
    templatesLoading: state.deployments.get('loading'),
    templates: state.templates.get('list', Map()),
    adding: state.deployments.get('adding', false),
  }));
  
  const dispatch = useDispatch();

  useEffect(() => {
    const templateNames = Object.keys((templates || Map()).toJS());
    setTemplateOptions(() => templateNames);
    setTemplateName(() => templateNames[0]);
  }, [templates]);

  useEffect(() => {
    const availableVersions = templates.get(templateName, List()).toJS();
    setVersionOptions(() => availableVersions);
    setVersion(() => availableVersions[0]);
  }, [templateName])

  const urlRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState({ url: "" });

  const resetFields = () => {
    setUrl("");
    setTemplateName(templateOptions[0]);
    setVersion(versionOptions[0]);
  }

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = { url, templateName, version };
    const validation = validate(formData);
    if (validation.valid) {
      setErrors(() => ({ url: "" }));
      dispatch(addingDeployment());
      try {
        const response = await fetch(`${API_ROOT}/api/deployments`, {
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
            toast("Deployment added successfully!");
            dispatch(deploymentAdded(json.data));
            resetFields();
          } else {
            toast(json.message);
            dispatch(failedToAddDeployment());
          }
        }
      } catch (e) {
        dispatch(failedToAddDeployment());
      }
    } else {
      // @ts-ignore
      setErrors(() => validation.errors.errors);
      if (validation.errors && validation.errors.hasOwnProperty('url')) {
        if (urlRef.current !== null) {
          urlRef.current.focus();
        }
      }
    }
  }

  return (
    <div className="deployment-form col-lg-9">
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Label for="url" sm={3} md={2}>URL</Label>
          <Col sm={9} md={10}>
            <Input type="text" invalid={errors && !!errors.url} placeholder="Enter URL" innerRef={urlRef} name="url" value={url} onChange={(evt) => setUrl(evt.target.value)} />
            <FormFeedback>{errors.url}</FormFeedback>
          </Col>
        </FormGroup>
        <Row form>
          <Col md={8}>
            <FormGroup row>
              <Label for="templateName" sm={3} md={3}>Template Name</Label>
              <Col sm={9} md={8}>
                <Input type="select" name="templateName" value={templateName} onChange={(evt) => setTemplateName(evt.target.value)} >
                  {templateOptions.map((template: string) => (
                    <option key={template}>{template}</option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup row>
              <Label for="version" sm={3}>Version</Label>
              <Col sm={9}>
                <Input type="select" name="version" value={version} onChange={(evt) => setVersion(evt.target.value)} >
                  {versionOptions.map((version: string) => (
                    <option key={version}>{version}</option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <Button type="submit" disabled={adding} color="info">
          {adding ? (<div className="loader"></div>) : "Add"}
        </Button>
      </Form>
    </div>
  );
}

export default DeploymentForm;
