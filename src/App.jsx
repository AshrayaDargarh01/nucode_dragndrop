import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';

import Sidebar from './Sidebar';
import { MarkerType } from 'reactflow';
import UpdatedSidebar from './UpdatedSidebar';
import './index.css';
import { clearFlowData, getFlowData, setFlowData } from './utils';
import NormalDatatypesNode from './components/solidity/NormalDatatypesNode';
import ArrayDataTypesNode from './components/solidity/ArrayDataTypesNode';
const initialNodes = [
  // {
  //   id: '1',
  //   type: 'input',
  //   data: { label: 'input node' },
  //   position: { x: 250, y: 5 },
  // },
  // getFlowData()?.nodes
];
// const initialEdges = getFlowData()?.edges;

let id = 0;
// const getId = () => `dndnode_${id++}`;
const getId = () => `${uuidv4()}`;
const nodeTypes={
  normalDataTypes:NormalDatatypesNode,
  arrayDataTypes:ArrayDataTypesNode
}
const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [countNormalDataTypes, setCountNormalDataTypes] = useState(0);
  // console.log('Count Normal Data Types', countNormalDataTypes);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';

  }, []);
  const nodesRef = useRef(nodes);
  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);
  
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      // const type = event.dataTransfer.getData('application/reactflow');
      // const data = event.dataTransfer.getData('application/reactflow');
      // const data = JSON.parse(dataString);
      const typeString = event.dataTransfer.getData('application/reactflow');
      const type = JSON.parse(typeString);
      console.log('type from Side Bar', type);

      // console.log('type from Side Bar', data);
      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }
       // Check if a node of the same type already exists
      //  if (type?.type === 'normalDataTypes' && nodes.some(node => node.data.customData.type === 'normalDataTypes')) {

      //   alert('Only one node of type "normalDataTypes" is allowed.');
      //   return;
      // }

        //  Working->Check if a node of type 'normalDataTypes' already exists 
        //  if (type?.type === 'normalDataTypes' && nodesRef.current.some(node => node.data.customData.type === 'normalDataTypes')) {
        //   alert('Only one node of type "normalDataTypes" is allowed.');
        //   return;
        // }
    
      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type: type?.type,
        position,
        data: { label:  `Data Type is:${type?.type}`,customData: type},
        style: { background: '#fff', border: '1px solid black', borderRadius: 15, fontSize: 12, display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', },
        extend: type?.extent,
        parentId: type?.parentId,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      };
      // setNodes((nds) => nds.concat(newNode));
      setNodes((nds) => [...nds, newNode]);
     
      // const newNodes = [...nodes, newNode];
      // setNodes(newNodes);
      console.log('newNode', newNode);
      console.log('ALl Nodes', nodes);
    },
    [reactFlowInstance],
  );
  const nodeColor = (node) => {
    switch (node.type) {
      case 'input':
        return '#6ede87';
      case 'output':
        return '#6865A5';
      default:
        return '#ff0072';
    }
  };
  useEffect(()=>{
    console.log('Nodes',nodes);
    if (nodes.length > 0) {
      const dynamicJson = nodes.reduce((acc, node) => {
        const { datatype } = node.data.customData;
        if (!acc[datatype]) {
          acc[datatype] = [];
        }
        acc[datatype].push(node);
        return acc;
      }, {});
  
      console.log('Dynamic JSON', dynamicJson);
    }
    
  },[nodes])
  useEffect(()=>{
    console.log('Edges',edges);
  },[edges])
  function handleSaveFlow() {
    // if(!nodes.length)
    //    alert('Please add some nodes to save the flow');
    
    setFlowData({nodes,edges});
    // alert('Flow Saved Successfully');
  }
  useEffect(()=>{
    if(nodes.length>0)
      handleSaveFlow()
  },[nodes,handleSaveFlow])
  function handleClearFlow() {
    if(confirm('Are you sure you want to clear the flow?'))
      {
        setEdges([]);
        setNodes([]);
        clearFlowData([]);
      }
    
  }
  useEffect(()=>{
    console.log('Get Flow Data',getFlowData())
    if(getFlowData()?.nodes)
      {
        console.log('Get Nodes Flow Data',getFlowData().nodes)
        setNodes(getFlowData().nodes);
      }
    if(getFlowData()?.edges)
      {
        console.log('Get Edges Flow Data',getFlowData().edges)
        setEdges(getFlowData().edges);
      }
  },[setNodes,setEdges])
  const  defaultEdgeOptions = { animated:true }
  return (
    <div className="dndflow">
      <ReactFlowProvider >
      {/* <Sidebar /> */}
      <UpdatedSidebar/>
        <div  style={{ width: '100vw', height: '100vh' }} className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            defaultEdgeOptions={defaultEdgeOptions}
            onDragOver={onDragOver}
            fitView
            nodeTypes={nodeTypes}
          >
            <Controls />
            <MiniMap  nodeColor={nodeColor} nodeStrokeWidth={3} zoomable 
        pannable
        />
        <Background variant="dots"
        //  gap={12} 
         size={1} 
         />
        <Panel position="top-left">
          <button
          style={{
            padding: '10px',
            background: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={handleSaveFlow}
          >
            Save Flow
          </button>
          <button
          style={{
            padding: '10px',
            background: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            
            cursor: 'pointer',
          
          }}
          onClick={handleClearFlow}
          >
            Clear Flow
          </button>
          </Panel>

          </ReactFlow>
        </div>
      
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;