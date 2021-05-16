import React,{ useEffect, useState } from 'react';
import { Graph } from 'react-d3-graph';
import { useDispatch, useSelector } from 'react-redux';
import { selectObject, cleanSelectObject, cleanOperationResult } from '../../../services/actions/objectActions';
import graphTypes from '../../../services/constants/graphTypeConstants';

export default function DepGraph({type, objectsList, userDependencies, tableDependencies, setSelectedDepObject}) {
  const dispatch = useDispatch();
  const { selectedObject } = useSelector(state => state.selectedObject);

  const [data, setData] = useState({nodes:[],links:[]});
  
  // the graph configuration, just override the ones you need
  const myConfig = {
    nodeHighlightBehavior: true,
    height: window.innerHeight * 0.70,
    width: window.innerWidth * 0.79,
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
      gravity: -100*(window.outerHeight/window.outerWidth) * data.nodes.length % window.innerWidth,
    },
  };
  const onClickNode = function (nodeId) {
    const obj = objectsList.find(elem => elem.object_name === nodeId);
    setSelectedDepObject({});
    if ( selectedObject && selectedObject.object_name && selectedObject.object_name === obj.object_name) dispatch(cleanSelectObject());
    else {
      dispatch(selectObject(obj));
    }
    dispatch(cleanOperationResult());
  };
  
  const onClickLink = function(source, target) {
    // window.alert(`Clicked link between ${source} and ${target}`);
  };

  const defineSymbolType = (obj) => {
    switch (obj.object_type) {
      case 'TABLE':
        return 'square';
      case 'PROCEDURE':
        return 'triangle';
      case 'TRIGGER':
        return 'cross';
      case 'VIEW':
        return 'star';
      case 'FUNCTION':
        return 'star';
      default:
        return 'wye';
    }
  }

  useEffect(() => {
    dispatch(cleanSelectObject());
    dispatch(cleanOperationResult());
    if (type && objectsList && objectsList.length > 0) {
      setData({ nodes: [], links: [] });
      const tempNodes = [];

      if (type === graphTypes.tableDependencies) {
        if (tableDependencies && tableDependencies.length > 0) {
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
                'labelProperty': dep.constraint_name
              }
            })
          });
        }
      } else if (type === graphTypes.userDependencies) {
        if (userDependencies && userDependencies.length > 0) {
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
    }
  }, [type,objectsList, tableDependencies, userDependencies, dispatch]);

  return (
    <Graph
      id="graph-id" // id is mandatory
      data={data}
      config={myConfig}
      onClickNode={onClickNode}
      onClickLink={onClickLink}
      />
  );
}