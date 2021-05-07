import React,{ useEffect, useState } from 'react';
import { Graph } from 'react-d3-graph';
import { useDispatch, useSelector } from 'react-redux';
import { getDependencies, getTables } from '../../../services/actions/tableActions';

export default function TableDepGraph(props) {
    const dispatch = useDispatch();
    const tbDependencies = useSelector(state => state.tableDependencies);
    const { loading: loadingDep, tableDependencies, error: errorDep } = tbDependencies
    const tbInfo = useSelector(state => state.tablesInfo);
    const { loading: loadingInfo, tablesInfo, error: errorInfo } = tbInfo;
  
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
  
    useEffect(() => {
      dispatch(getTables()).then(async () => {
        await dispatch(getDependencies())});
    }, [dispatch]);
  
    useEffect(() => {
      if (tablesInfo && tableDependencies && tablesInfo.length > 0 && tableDependencies.length > 0) {
        setData({ nodes: [], links: [] });
        setData({
          nodes: tablesInfo.map(table => {
            return {
              'id': table.name
            }
          }),
          links: tableDependencies.map(dep => {
            return {
              'source': dep.from.table,
              'target': dep.to.table,
              'labelProperty':dep.constraint_name
            }
          })
        });
      }
    }, [tablesInfo, tableDependencies]);
  
    return (
      loadingInfo ? <div>LOADING DATABASE INFO ...</div> :
      loadingDep ? <div>LOADING DEPENDENCIES ... </div> :
          errorDep ? <div>ERROR AT LOADING DEPENDENCIES: ERROR: {errorDep.data.errorNum} STATUS: {errorDep.status}</div> :
      errorInfo ? <div>ERROR AT LOADING DATABASE INFO: ERROR: {errorInfo.data.errorNum} STATUS: {errorInfo.status}</div> :
      <Graph
        id="graph-id" // id is mandatory
        data={data}
        config={myConfig}
        onClickNode={onClickNode}
        onClickLink={onClickLink}
        />
    );
}

