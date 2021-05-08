import React,{ useEffect, useState } from 'react';
import { Graph } from 'react-d3-graph';
import { useDispatch, useSelector } from 'react-redux';
import { getTableDependencies } from '../../../services/actions/tableActions';
import { getObjectsList, getUserDependencies } from '../../../services/actions/objectActions';
import graphTypes from '../../../services/constants/graphTypeConstants';

export default function DepGraph(props) {
  const dispatch = useDispatch();
  const tbDependencies = useSelector(state => state.tableDependencies);
  const { loading: loadingDep, tableDependencies, error: errorDep } = tbDependencies
  const { objectsList } = useSelector(state => state.objectsList);
  const { userDependencies } = useSelector(state => state.userDependencies);

  const [data, setData] = useState({nodes:[],links:[]});
  
  // the graph configuration, just override the ones you need
  const myConfig = {
    nodeHighlightBehavior: true,
    height: window.innerHeight - 50,
    width: window.innerWidth - 260,
    directed: true,
    linkHighlightBehavior : true,
    node: {
      color: "#909090",
      highlightStrokeColor: "darkblue",
      symbolType: "square",
      fontSize: 14,
      size: 1000,
      highlightFontSize: 14,
      highlightFontWeight: 'bold',
      labelPosition: 'top',
    },
    link: {
      highlightColor: "lightblue",
      strokeWidth: 4,
      renderLabel: true,
      fontSize:15,
      highlightFontSize: 15,
      strokeLinecap: 'square'
    },
    d3: {
      gravity: -100 * data.nodes.length % window.innerWidth,
    },
  };
  const onClickNode = function(nodeId) {
    window.alert(`Clicked node ${nodeId}`);
  };
  
  const onClickLink = function(source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };

  const defineSymbolType = (obj) => {
    switch (obj.object_type) {
      case 'TABLE':
        return 'square';
      case 'PROCEDURE':
        return 'triangle';
      case 'TRIGGER':
        return 'diamond';
      case 'VIEW':
        return 'star';
      case 'FUNCTION':
        return 'cross';
      default:
        break;
    }
  }

  useEffect(() => {
    dispatch(getObjectsList()).then(async () => {
      switch (props.type) {
        case graphTypes.tableDependencies:
          await dispatch(getTableDependencies());
          break;
        case graphTypes.userDependencies:
          await dispatch(getUserDependencies());
          break;        
        default:
          break;
      }
    });
  }, [dispatch,props]);
  
  useEffect(() => {
    if (objectsList && objectsList.length > 0) {
      setData({ nodes: [], links: [] });
      const tempNodes = [];

      if (props.type === graphTypes.tableDependencies && tableDependencies && tableDependencies.length > 0) {
       
        objectsList.forEach(obj => {
          if (obj.object_type === 'TABLE') tempNodes.push({
            'id': obj.object_name,
            'symbolType': defineSymbolType(obj),
          })
        });

        setData({
          nodes: tempNodes,
          links: tableDependencies.map(dep => {
            return {
              'source': dep.from.table,
              'target': dep.to.table,
              'labelProperty':dep.constraint_name
            }
          })
        });
      } else if (props.type === graphTypes.userDependencies && userDependencies && userDependencies.length > 0) {
        
        objectsList.forEach(obj => {
          if (userDependencies.find(elem => elem.name === obj.object_name || elem.refName === obj.object_name)) {
            tempNodes.push({
              'id': obj.object_name,
              'symbolType': defineSymbolType(obj),
            });
          }
        });
        setData({
          nodes: tempNodes,
          links: userDependencies.map(obj => {
            return {
              'source': obj.name,
              'target': obj.refName,
              'labelProperty': obj.depType
            }
          })
        })
      }
    }
  }, [objectsList, tableDependencies, props]);

  return (
    console.log(data) &&
    loadingDep ? <div>LOADING DEPENDENCIES ... </div> :
    errorDep ? <div>ERROR AT LOADING DEPENDENCIES: ERROR: {errorDep.data.errorNum} STATUS: {errorDep.status}</div> :
    <Graph
      id="graph-id" // id is mandatory
      data={data}
      config={myConfig}
      onClickNode={onClickNode}
      onClickLink={onClickLink}
      />
  );
}