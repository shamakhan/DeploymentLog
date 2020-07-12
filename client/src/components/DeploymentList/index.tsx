import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { RootState } from "../../store";
import { deleteDeployment } from "../../store/deployments/actions";
import "./style.scss";
import { Map } from 'immutable';
import DeleteIcon from "@material-ui/icons/Delete";
import { IDeployment } from '../../interfaces/IDeployment';

function DeploymentList() {
  const { loading, list } = useSelector((state: RootState) => ({
    loading: state.deployments.get('loading'),
    list: state.deployments.get('list')
  }));

  const [showDeleteModal, setConfirmationModal] = useState(false);
  const [deleting, setDeleting] = useState<string>("");
  
  const deletingDeployment = useSelector((state: RootState) =>  state.deployments.get('deletingDeployment'));

  const toggleConfirmation = () => {
    if (!showDeleteModal) {
      setDeleting("");
    }
    setConfirmationModal(!showDeleteModal);
  }

  const prevDeletingRef = useRef();

  useEffect(() => {
    if (deleting && !deletingDeployment && prevDeletingRef.current !== deletingDeployment && showDeleteModal) {
      toggleConfirmation();
    }
    prevDeletingRef.current = deletingDeployment;
  }, [deletingDeployment, deleting])


  const dispatch = useDispatch();

  const handleDelete = () => {
    if (deleting) {
      dispatch(deleteDeployment(deleting))
    }
  }

  return (
    <div className="deployment-list">
      <Table striped bordered>
        <thead>
          <tr>
            <th>URL</th>
            <th>Template Name</th>
            <th>Version</th>
            <th>DeployedAt</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading && <tr><td colSpan={5}><div className="loader"></div></td></tr>}
          {!loading && list.size === 0 && <tr><td colSpan={5} className="text-center">No records found.</td></tr>}
          {!loading && list.size !== 0 && list.map((deployment: Map<String, any>) => (<tr key={deployment.get('_id')}>
          <td>{deployment.get('url')}</td>
          <td>{deployment.get('templateName')}</td>
          <td>{deployment.get('version')}</td>
          <td>{(new Date(deployment.get('deployedAt'))).toUTCString()}</td>
          <td>
            <DeleteIcon className="delete-icon" onClick={() => {  toggleConfirmation(); setTimeout(() => setDeleting(() => deployment.get("_id")), 500); } } />
          </td>
          </tr>))}
        </tbody>
      </Table>
      <Modal isOpen={showDeleteModal} toggle={toggleConfirmation}>
        {/* <ModalHeader toggle={toggleConfirmation}>Modal title</ModalHeader> */}
        <ModalBody>
          Are you sure you want to delete this deployment ?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={deletingDeployment} onClick={handleDelete}>
            {deletingDeployment ? (<div className="loader"></div>) : "Confirm"}
          </Button>{' '}
          <Button color="secondary" disabled={deletingDeployment} onClick={toggleConfirmation}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeploymentList;
