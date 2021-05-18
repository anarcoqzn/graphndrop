import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../../Button';
import { Container, ObjectInfo } from './styles';
import { setGraphData, setOperationResult } from '../../../services/actions/objectActions';
export default function SideBarOps({ userDependencies, tableDependencies, objectsList}) {
  
  const { selectedObject } = useSelector(state => state.selectedObject);
  const { graphData } = useSelector(state => state.graphData);
  const dispatch = useDispatch();

  function handleDrop() {
    const allDependencies = [];
    
    tableDependencies.concat(userDependencies).forEach(elem => {
      if ((elem.to && elem.to.table === selectedObject.object_name) ||
        (elem.refName && elem.refName === selectedObject.object_name)) {
        allDependencies.push(elem);
      }
    });
    
    const finalResult = [];
    objectsList.forEach((obj) => {
      if (obj && allDependencies.find((elem) => (elem.from && elem.from.table === obj.object_name) ||
                                                 elem.name === obj.object_name)) {
        finalResult.push(obj);
      }
    })

    dispatch(setOperationResult(
      {
        operation: 'DROP ' + selectedObject.object_type + ' ' + selectedObject.object_name+';',
        result: finalResult
      }
    ));
  }

  async function handleUndo() {
    await dispatch(setGraphData({ operation: 'RESTORE', data: graphData }));
  }

  return (
    (tableDependencies && userDependencies && objectsList) &&
    (tableDependencies.length > 0 && userDependencies.length > 0 && objectsList.length > 0) ?
    <Container>
      
      <h3>Object Info</h3>
      
      {selectedObject && selectedObject.object_name ?
        <div>
          <ObjectInfo color="brown">
            <label>Object name</label> <label>{selectedObject.object_name}</label>
            <label>Object ID</label> <label>{selectedObject.object_id}</label>
            <label>Object type</label> <label>{selectedObject.object_type}</label>
            <label>Created At</label> <label>{new Date(selectedObject.created).toDateString()}</label>
            <label>Last DDL Time</label> <label>{new Date(selectedObject.lastDDLTime).toDateString()}</label>
            <label>Status</label> <label>{selectedObject.status}</label>
          </ObjectInfo>
          <h3>What if</h3>
            {!graphData || !graphData.nodes ? 
              <Button color="lightcoral" onClick={handleDrop}>DROP?</Button> :
              <Button color="lightblue" onClick={handleUndo}>UNDO DROP</Button> 
            }
        </div>
        :
        <h5>(Please, click on a node)</h5>
      }
    </Container>
  :
      <Container></Container>
  )
}