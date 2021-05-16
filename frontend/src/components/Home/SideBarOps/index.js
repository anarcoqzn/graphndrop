import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Error, Loading } from '../../Loading&Error';
import { Button } from '../../Button';
import { Container, ObjectInfo, OperationsContainer } from './styles';
import { getTableDependencies } from '../../../services/actions/tableActions';
import { getUserDependencies } from '../../../services/actions/objectActions';

export default function SideBarOps(props) {
  const [affectedObjects, setAffectedObjects] = useState([]);
  const dispatch = useDispatch();
  const { loading, selectedObject, error } = useSelector(state => state.selectedObject);
  const { tableDependencies } = useSelector(state => state.tableDependencies);
  const { userDependencies } = useSelector(state => state.userDependencies);

  const handleDrop = () => {
    const allDependencies = tableDependencies.concat(userDependencies);

    const t_affectedObjects = allDependencies.map(elem => {
      if ((elem.to && elem.to.table === selectedObject.object_name) ||
          (elem.refName && elem.refName === selectedObject.object_name)) {
        return elem;
      }
    });
    
    setAffectedObjects(t_affectedObjects.filter(elem => elem && (elem.constraint_name || elem.name)));
  }

  useEffect(() => {
    console.log(userDependencies);
    if (!userDependencies || userDependencies.length === 0) dispatch(getUserDependencies());
    if (!tableDependencies || tableDependencies.length === 0) dispatch(getTableDependencies());
  }, [dispatch]);

  useEffect(() => {
    console.log(affectedObjects);
  }, [affectedObjects]);

  return (
    loading ? <Loading /> :
    error ? <Error msg="ERROR" /> :
        <Container>
          
          <h3>Object Info</h3>
          
          {selectedObject && selectedObject.object_name ?
            <OperationsContainer>
              <ObjectInfo>
                <label>Object name</label> <label>{selectedObject.object_name}</label>
                <label>Object ID</label> <label>{selectedObject.object_id}</label>
                <label>Object type</label> <label>{selectedObject.object_type}</label>
                <label>Created At</label> <label>{new Date(selectedObject.created).toDateString()}</label>
                <label>Last DDL Time</label> <label>{new Date(selectedObject.lastDDLTime).toDateString()}</label>
                <label>Status</label> <label>{selectedObject.status}</label>
              </ObjectInfo>
              <h3>What if</h3>
              <Button color="lightcoral" onClick={handleDrop}>DROP?</Button>
            </OperationsContainer>
            :
            <h5>(Please, click on a node)</h5>
          }
    </Container>
  );
}