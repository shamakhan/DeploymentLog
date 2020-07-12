import React, { useEffect } from 'react';
import DeploymentForm from "./components/DeploymentForm";
import DeploymentList from "./components/DeploymentList";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import { useDispatch } from 'react-redux';
import { fetchTemplates } from "./store/templates/actions";
import { fetchDeployments } from "./store/deployments/actions";
import './App.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTemplates());
    dispatch(fetchDeployments());
  }, []);

  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <DeploymentForm />
      <DeploymentList />
    </div>
  );
}

export default App;
