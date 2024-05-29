import React from 'react';

export default () => {
  const [selectedOptions, setSelectedOptions] = React.useState('datatypes');
  const [selectedSubOptions, setSelectedSubOptions] = React.useState('single');
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow',JSON.stringify(nodeType) );
    event.dataTransfer.effectAllowed = 'move';
  };
  function handleChangeOptions(event) {
    console.log(`event.target.value`, event.target.value)
    setSelectedOptions(event.target.value);
  }
  function handleChangeSubOptions(event) {
    console.log(`Sub Option event.target.value`, event.target.value)
    setSelectedSubOptions(event.target.value);
  }
  console.log(`selectedOptions`, selectedOptions)
  console.log(`selectedSubOptions`, selectedSubOptions)
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
      {/* Showing the suboptions for datatypes */}
      {selectedOptions === "datatypes" && 
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: '10px'
       
      }}>
      
      <div>
      <input
        type="radio"
        id="single"
        name="suboptions"
        value="single"
        checked={selectedSubOptions === "single"}
        onChange={handleChangeSubOptions}
      />
      <label htmlFor="single">Single</label>

      </div>

      <div>
      <input
        type="radio"
        id="object"
        name="suboptions"
        value="object"
        checked={selectedSubOptions === "object"}
        onChange={handleChangeSubOptions}
      />
      <label htmlFor="object">Object</label>
        </div>      

      </div>
}
      {/* <div className="description">You can drag these nodes to the pane on the right.</div> */}

      {/* If selected single datatypes */}
      {selectedOptions==='datatypes'&&selectedSubOptions==='single' &&<> <div
        className="dndnode input"
        onDragStart={(event) =>
          onDragStart(event, {
            type: "input",
            datatype: "int",
            options: ["array"],
          })
        }
        draggable
      >
        (int)
      </div>
      <div
        className="dndnode"
        onDragStart={(event) =>
          onDragStart(event, {
            type: "default",
            datatype: "object",
            options: { key: "", value: "" },
          })
        }
        draggable
      >
        (object)
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
        (array)
      </div>
      </>
}
 {/* If selected Object datatypes */}
 {selectedOptions==='datatypes'&&selectedSubOptions==='object' &&<> <div
        className="dndnode input"
        onDragStart={(event) =>
          onDragStart(event, {
            type: "input",
            datatype: "int",
            options: ["array"],
          })
        }
        draggable
      >
        (int)
      </div>
      <div
        className="dndnode"
        onDragStart={(event) =>
          onDragStart(event, {
            type: "default",
            datatype: "object",
            options: { key: "", value: "" },
          })
        }
        draggable
      >
        (object)
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
        (array)
      </div>
      </>
}
    </aside>
  );
};
