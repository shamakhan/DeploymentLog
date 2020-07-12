import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function DeploymentList() {
  const { loading, list } = useSelector((state: RootState) => ({
    loading: state.deployments.get('loading'),
    list: state.deployments.get('list')
  }));

  return (
    <div className="deployment-list">
      <h2>DeploymentList</h2>
    </div>
  );
}

export default DeploymentList;
