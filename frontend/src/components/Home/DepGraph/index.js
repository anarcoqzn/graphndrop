import React,{ useEffect, useState } from 'react';
import { Graph } from 'react-d3-graph';
import { useDispatch, useSelector } from 'react-redux';
import { selectObject, cleanSelectObject, cleanOperationResult } from '../../../services/actions/objectActions';

export default function DepGraph({ objectsList, userDependencies, tableDependencies, setSelectedDepObject }) {
  
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
      gravity: -60*(window.innerHeight/window.innerWidth)*data.nodes.length % window.innerWidth,
    },
  };
  const onClickNode = function (nodeId) {
    const obj = objectsList.find(elem => elem.object_name === nodeId);
    setSelectedDepObject({});
    if (selectedObject && selectedObject.object_name && selectedObject.object_name === obj.object_name)
      dispatch(cleanSelectObject());
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
        return 'diamond';
      default:
        return 'circle';
    }
  }

  useEffect(() => {
    if (selectedObject && selectedObject.object_name)
      data.nodes.forEach(elem => (elem.id === selectedObject.object_name) ?
        elem.strokeColor = 'black' : elem.strokeColor='');
  }, [selectedObject, data.nodes]);

  useEffect(() => {
    dispatch(cleanSelectObject());
    dispatch(cleanOperationResult());
    if (objectsList && objectsList.length > 0 && tableDependencies && tableDependencies.length > 0 && userDependencies && userDependencies.length > 0) {
      setData({ nodes: [], links: [] });
      const tempNodes = [];
      const tempLinks = [];

      objectsList.forEach(obj => {
        if (tableDependencies.find(elem => (obj.object_name === elem.from.table) ||
                                    (obj.object_name === elem.to.table)) ||
          userDependencies.find(elem => (obj.object_name === elem.name || obj.object_name === elem.refName))) {  
            tempNodes.push({
              'id': obj.object_name,
              'symbolType': defineSymbolType(obj),
              'color': obj.status === "VALID" ? "darkseagreen" : "lightcoral"
            })
          }
        });

      tableDependencies.forEach(dep => {
        tempLinks.push({
          'source': dep.from.table,
          'target': dep.to.table,
          'labelProperty': dep.constraint_name
        })
      });

      userDependencies.forEach(elem => {
        tempLinks.push({
          'source': elem.name,
          'target': elem.refName,
          'labelProperty': elem.depType
        })
      });

      setData({
        nodes: tempNodes,
        links: tempLinks
      });
    }
  }, [objectsList, tableDependencies, userDependencies, dispatch]);

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