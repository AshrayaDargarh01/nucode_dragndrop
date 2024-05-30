import React, { useEffect } from 'react'
import { memo } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

import { SolidityDataContext } from '../../context/SolidityDataContext'
import { setSolArrayFormValues,getSolArrayFormValues } from '../../utils';

// const formInitialValues = getSolArrayFormValues()==='undefined'?[
//   { value: '' }
// ]:getSolArrayFormValues();
const ArrayDataTypesNode= ({data,id,isConnectable,selected}) => {

  const [arrayDataTypesData,setArrayDataTypesData] = React.useState([])
  const { solidityData, setSolidityData } = React.useContext(SolidityDataContext);
  const [selectedDataType, setSelectedDataType] = React.useState('constant');
  const [value, setValue] = React.useState(null);

  // const handleFormChange = (event) => {
  //   const { name, value } = event.target;
  //   if(event.target.value==='select'){
  //     return;
  //   }
  //   console.log(`name`, name, value)
  //   setArrayDataTypesData(prevData => ({ ...prevData, [name]: value }));
  // };

  useEffect(() => {
    setSolidityData(prevData => ({
      ...prevData,
      [`arrayDataTypes ${id}`]: arrayDataTypesData,
    }));
    
  }, [arrayDataTypesData, id, setSolidityData]);
 

  const [formValues, setFormValues] = React.useState([{ value: '' }]);
  // const [formValues, setFormValues] = React.useState(formInitialValues);

  const handleFormChange = (e, index) => {

    // console.log(`newFormValues`, [e.target.name], e.target.value)
    const newFormValues = [...formValues];
    newFormValues[index][e.target.name] = e.target.value;
    
    // setArrayDataTypesData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
    setFormValues(newFormValues);
  };

  // const handleAddFormValue = (e) => {
  //   e.preventDefault();
  //   // formValues.map((formValue)=>{
  //   //   if(formValue.value===''){
  //   //       alert('Please enter the value')
  //   //       return;
  //   //   }
  //   //   else{
  //   //   setFormValues([...formValues, { value: '' }]);

  //   //   }
  //   //   console.log(`formValue`, formValue.value)
  //   // })
  //   // console.log(`formValue`, valueInfo)
  //   const newArray=[];
  //   // const isValueExist 
  //   const isFormValid = formValues.every((formValue) => formValue.value !== '');
  //   console.log(`isFormValid`, isFormValid)
  //   if(!isFormValid){
  //     alert('Please enter the value')
  //     return;
  //   }
  //   const isValueExist=formValues.filter((formValue)=>newArray.includes(formValue.value))

  //   console.log(`isValueExist`, isValueExist)
  //   formValues.map((formValue)=>{
  //        newArray.push(formValue.value)
     
    
  //   })

  //   setFormValues([...formValues, { value: '' }]);
  //   setArrayDataTypesData(newArray);
  //   // formValues.map((formValue)=>{
     
  //   //   if(!newArray.includes(formValue.value)){
  //   //   newArray.push(formValue.value)
  //   //   setFormValues([...formValues, { value: '' }]);
  //   //   setArrayDataTypesData(newArray);
      
  //   // }
  //   // else{
  //   //   alert('Value already exist')
      
  //   // }
  //   // })
  //   console.log(`newArray`, newArray)

  //   console.log(`formValues`, formValues)
  //   // setArrayDataTypesData
  // };
  const handleAddFormValue = (e) => {
    e.preventDefault();
    const newArray = [];
    const isFormValid = formValues.every((formValue) => formValue.value !== '');
    console.log(`isFormValid`, isFormValid)
    if (!isFormValid) {
      alert('Please enter the value')
      return;
    }
    const newValue = formValues[formValues.length - 1].value;
    const isValueExist = formValues.some((formValue, index) => index !== formValues.length - 1 && formValue.value === newValue);
    console.log(`isValueExist`, isValueExist)
    if (isValueExist) {
      alert('Value already exists');
      return;
    }
    formValues.map((formValue) => {
      newArray.push(formValue.value)
    })
    setFormValues([...formValues, { value: '' }]);
    setArrayDataTypesData(newArray);
    console.log(`newArray`, newArray)
  };
  useEffect(()=>{
    setSolArrayFormValues([...formValues, { value: '' }])
  },[formValues])
  console.log('Solidity Data', solidityData)
  console.log(`arrayDataTypes`, arrayDataTypesData)
  console.log('Form Values', formValues)
  console.log('Json Format', JSON.stringify(arrayDataTypesData))
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
        {/* <form>
        <div>
            Element type
            <select name="datatypes" id="datatypes" required  onChange={handleFormChange}>
        
                <option value="select">Select the type</option>
                <option value="constant">Constant</option>
            </select>
        </div>
        <div>
        <div>
            Value
            <input type="text" name="value" id="value" required onChange={handleFormChange} />
        </div>
        <button type='button'>+</button>
        </div>
        
        </form> */}
         <form>
         <div>
            Element type
            <select
              name="datatype"
              required
              // value={}
              onChange={handleFormChange}
            >
              <option value="select">Select the type</option>
              <option value="constant">Constant</option>
              <option value="uint">uint</option>
              <option value="string">string</option>

            </select>
          </div>
      {formValues.map((formValue, index) => (
        <div key={index}>
       
          <div>
            Value
            <input
              type="text"
              name="value"
              
              value={formValue.value}
              onChange={(e) => handleFormChange(e, index)}
              min={1}
              required
            />
          </div>
        </div>
      ))}
      <button type="submit" onClick={handleAddFormValue}>
        +
      </button>
    </form>
        {/* <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} /> */}
    </div>
     <Handle type="source" position={Position.Right} />

    </>
  
  )
}

export default memo(ArrayDataTypesNode)