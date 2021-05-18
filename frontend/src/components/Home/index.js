import React, { useState, useEffect } from 'react'
import Header from './Header';
import {Container, SidebarContainer, DashboardContainer, SideBarListFigures, GraphContainer, OperationOverviewContainer, OperationDetails }  from './styles';
import DepGraph from './DepGraph';
import SideBarOps from './SideBarOps';
import { useDispatch, useSelector } from 'react-redux';
import { getTableDependencies } from '../../services/actions/tableActions';
import { getObjectsList, getUserDependencies } from '../../services/actions/objectActions';
import { Error, Loading } from '../Loading&Error';
import { Button } from '../Button';
import { ObjectInfo } from './SideBarOps/styles';
import { BsSquareFill, BsFillTriangleFill, BsPlus, BsStarFill, BsFillDiamondFill, BsFillCircleFill } from 'react-icons/bs';

export default function Home(props) {
  const [selectedDepObject, setSelectedDepObject] = useState({});
  
  const dispatch = useDispatch();
  const tbDependencies = useSelector(state => state.tableDependencies);
  const { loading: loadingDep, tableDependencies, error: errorDep } = tbDependencies
  
  const { loading: loadingOp, operationResult } = useSelector(state => state.operationResult);

  const objList = useSelector(state => state.objectsList);
  const { loading: loadingObjList, objectsList, error: errorObjList } = objList;
  
  const userDep = useSelector(state => state.userDependencies);
  const { loading: loadingUserDep, userDependencies, error: errorUserDep } = userDep;  
  
  
  const handleSelectObject = (object) => {
    if (object.object_id === selectedDepObject.object_id) {
      setSelectedDepObject({});
    } else {
      const usDepObj = userDependencies.find(obj => obj.name === object.object_name);
      if (usDepObj) {
        setSelectedDepObject({
          "object_name": object.object_name,
          "object_id": object.object_id,
          "object_type": object.object_type,
          "created": object.created,
          "lastDDLTime": object.lastDDLTime,
          "status": object.status,
          "refName": usDepObj.refName,
          "refType": usDepObj.refType,
          "depType": usDepObj.depType,
          "refLinkName": usDepObj.refLinkName
        });
      } else {
        setSelectedDepObject(object);
      }
    }
  }
  
  useEffect(() => {
    if (!objectsList || objectsList.length === 0) dispatch(getObjectsList()).then(() => {
      if (!userDependencies || userDependencies.length === 0) dispatch(getUserDependencies()).then(async () => {
        if (!tableDependencies || tableDependencies.length === 0) await dispatch(getTableDependencies());
      });
    });

  },[dispatch, objectsList, tableDependencies, userDependencies]);

  return (
    loadingObjList || loadingUserDep || loadingDep ? <Loading />:  
    errorObjList ? <Error msg={`ERROR AT LOADING OBJECTS LIST: ERROR ${errorObjList.data.errorNum} STATUS: ${ errorObjList.status}`} /> :
    errorUserDep ? <Error msg={`ERROR AT LOADING USER DEPENDENCIES: ERROR ${errorUserDep.data.errorNum} STATUS: ${errorUserDep.status}`} />:
    errorDep ? <Error msg={`ERROR AT LOADING DEPENDENCIES: ERROR: ${errorDep.data.errorNum} STATUS: ${errorDep.status}`}/>:
    <div>
      <Header props={props}/>
      <Container>
        <SidebarContainer>
          <SideBarListFigures>
            <BsSquareFill/> <label>Table</label>
            <BsFillTriangleFill /> <label>Procedure</label>
            <BsPlus id="trigger"/> <label>Trigger</label>
            <BsStarFill/> <label>View</label>
            <BsFillDiamondFill /> <label>Function</label>
            <BsFillCircleFill /> <label>Other</label>
          </SideBarListFigures>
          
          <SideBarOps objectsList={objectsList}
            tableDependencies={tableDependencies}
            userDependencies={userDependencies}
          />
        </SidebarContainer>

        <DashboardContainer>
          <GraphContainer>
          <DepGraph objectsList={objectsList}
              tableDependencies={tableDependencies}
              userDependencies={userDependencies}
              setSelectedDepObject={setSelectedDepObject} 
              selectedDepObject={selectedDepObject}/>
          </GraphContainer>
          
          {loadingOp ? <OperationOverviewContainer> <Loading /></OperationOverviewContainer> :
            operationResult.result ?
              <OperationOverviewContainer>
                <label>{operationResult.operation}</label>
                <OperationDetails>
                  <label>The following objects will be affected:</label>
                  { operationResult.result.map((object,i) => {
                    return <Button key={object.object_id}
                      color={i % 2 === 0 ? "brown" : "cornflowerblue"}
                      onClick={() => handleSelectObject(object)}
                      id={object.object_id}
                      chosen={selectedDepObject.object_id}
                    >
                      {object.object_name}
                    </Button>
                    })
                  }
                </OperationDetails>
                {
                 selectedDepObject && selectedDepObject.object_id?
                  <ObjectInfo>
                    {
                      Object.keys(selectedDepObject).map((key) => {
                        return <div key={key}>
                          <label>{key}:</label> <label>{selectedDepObject[key]}</label>
                        </div>
                      })
                    }
                  </ObjectInfo> 
                  : null  
                }
              </OperationOverviewContainer>
              :
              <OperationOverviewContainer />
          }
        </DashboardContainer>
      </Container>
    </div>
  )
  
}
