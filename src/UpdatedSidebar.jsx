import React from 'react';

export default () => {
  const [selectedOptions, setSelectedOptions] = React.useState('datatypes');
//   const [selectedSubOptions, setSelectedSubOptions] = React.useState('single');
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow',JSON.stringify(nodeType) );
    event.dataTransfer.effectAllowed = 'move';
  };
  function handleChangeOptions(event) {
    console.log(`event.target.value`, event.target.value)
    setSelectedOptions(event.target.value);
  }
//   function handleChangeSubOptions(event) {
//     console.log(`Sub Option event.target.value`, event.target.value)
//     setSelectedSubOptions(event.target.value);
//   }
  console.log(`selectedOptions`, selectedOptions)
//   console.log(`selectedSubOptions`, selectedSubOptions)
  return (
    <aside>
      {/* Selecting Data Types */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
       
      }}>
      <div>
      <input
        type="radio"
        id="datatypes"
        name="options"
        value="datatypes"
        checked={selectedOptions === "datatypes"}
        onChange={handleChangeOptions}
      />
      <label htmlFor="datatypes">Data Types</label>

      </div>

      <div>
      <input
        type="radio"
        id="functions"
        name="options"
        value="functions"
        checked={selectedOptions === "functions"}
        onChange={handleChangeOptions}
      />
      <label htmlFor="functions">Functions</label>
        </div>      

      </div>
   
      {selectedOptions==='datatypes'&&<> <div
        className="dndnode input"
        onDragStart={(event) =>
          onDragStart(event, {
            type: "normalDataTypes",
            datatype: ['drop-down','33'],
            options: ["array"],
          })
        }
        draggable
      >
        Normal Datatypes
      </div>
      {/* <div
        className="dndnode"
        onDragStart={(event) =>
          onDragStart(event, {
            type: "input",
            datatype: "object",
            options: { key: "", value: "" },
          })
        }
        draggable
      >
        Object
      </div> */}
      <div
        className="dndnode output"
        onDragStart={(event) =>
          onDragStart(event, {
            type: "default",
            datatype: "array",
            options: [1, 2, 3, 4],
          })
        }
        draggable
      >
        Struct
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) =>
          onDragStart(event, {
            type: "output",
            datatype: "array",
            options: [1, 2, 3, 4],
          })
        }
        draggable
      >
        Enum
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) =>
          onDragStart(event, {
            type: "",
            datatype: "array",
            options: [1, 2, 3, 4],
          })
        }
        draggable
      >
        Mapping
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) =>
          onDragStart(event, {
            type: "",
            datatype: "array",
            options: [1, 2, 3, 4],
          })
        }
        draggable
      >
        Array
      </div>
      
      </>
}

 {/* If selected Object datatypes */}
 
    </aside>
  );
};
