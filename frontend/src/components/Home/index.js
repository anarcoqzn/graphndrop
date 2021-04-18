import React, { useEffect } from 'react'
import { Graph } from 'react-d3-graph';
import { useDispatch, useSelector } from 'react-redux';
import { getDependencies } from '../../services/actions/tableActions';

export default function Home() {

  const dispatch = useDispatch();
  const tbDependencies = useSelector(state => state.tableDependencies);
  const { loading, tableDependencies, error} = tbDependencies

  const data = {
    nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }, {id: "John"}],
    links: [
      { source: "Harry", target: "Sally" },
      { source: "Harry", target: "Alice" },
      { source: "Sally", target: "John" },
      { source: "John", target: "Alice" },
      { source: "Alice", target: "Sally" },
      { source: "Harry", target: "John"}
    ],
  };
  
  // the graph configuration, just override the ones you need
  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "darkorange",
      size: 1000,
      highlightStrokeColor: "blue",
      symbolType: "square",
      fontSize: 14
    },
    link: {
      highlightColor: "lightblue",
    },
  };
  const onClickNode = function(nodeId) {
    window.alert(`Clicked node ${nodeId}`);
  };
  
  const onClickLink = function(source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };

  useEffect(() => {
    dispatch(getDependencies());
  }, [dispatch]);

  useEffect(() => {
    console.log(tableDependencies);
  }, [tableDependencies])

  return (
    loading ? <div>LOADING ... </div> :
    error ? <div>{error}</div>:
    <Graph
      id="graph-id" // id is mandatory
      data={data}
      config={myConfig}
      onClickNode={onClickNode}
      onClickLink={onClickLink}
      />
  );
}
