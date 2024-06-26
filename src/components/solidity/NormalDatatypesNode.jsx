import React, { useEffect } from 'react'
import { memo } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

import { SolidityDataContext } from '../../context/SolidityDataContext'

const NormalDatatypesNode= ({data,id,isConnectable,selected}) => {

  const [normalDataTypesData,setNormalDataTypesData] = React.useState([])
  const { solidityData, setSolidityData } = React.useContext(SolidityDataContext);
  const [selectedDataType, setSelectedDataType] = React.useState('constant');
  const [value, setValue] = React.useState(null);
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    if(event.target.value==='select'){
      return;
    }
    console.log(`name`, name, value)
    setNormalDataTypesData(prevData => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    setSolidityData(prevData => ({
      ...prevData,
      [`normalDataTypes ${id}`]: normalDataTypesData,
    }));
    
  }, [normalDataTypesData, id, setSolidityData]);
 
  console.log('Solidity Data', solidityData)
  console.log(`normalDataTypesData`, normalDataTypesData)
  console.log('Json Format', JSON.stringify(solidityData))
  return (
    <>
       
       <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />

       <Handle type="target" position={Position.Left} />
    <div 
    style={{
      // border: '1px solid #000',
      // borderRadius: '5px',
     
      padding: '20px',
    }}
    
    >
        <form>
        <div>
            Data Types
            <select name="datatypes" id="datatypes"  onChange={handleFormChange}>
                <option value="select">Select the type</option>
                <option value="constant">Constant</option>
                <option value="array">Array</option>
            </select>
        </div>
        <div>
            Value
            <input type="text" name="value" id="value" onChange={handleFormChange} />
        </div>
        </form>
        {/* <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} /> */}
    </div>
     <Handle type="source" position={Position.Right} />

    </>
  
  )
}

export default NormalDatatypesNode