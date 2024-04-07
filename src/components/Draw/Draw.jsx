import React, { useState } from 'react';
import Canvas from "../Canvas/Canvas";
import { useParams } from "react-router-dom";

const Drawing = () => {
    const [color, setColor] = useState('black');
    const [selectedTool, setSelectedTool] = useState('black');
    const [lineWidth,setlineWidth] = useState(15)
    const changeColor = (e) => {
        setColor(e.target.id);
        setSelectedTool(e.target.id);
    }

    function handleLineChange (e){
      setlineWidth(e.target.value)
    }
    const params = useParams();

    return (
        <div className="container">
            <h1 className="mt-3">Drawing App</h1>
            <div className="row">
                <div className="col-3 bg-light p-3">
                    <div className="d-flex flex-column">
                        <button
                            onClick={changeColor}
                            id="black"
                            className={`btn btn-dark mt-1 ${selectedTool === 'black' ? 'border border-dark' : ''}`}
                        >
                            Black
                        </button>
                        <button
                            onClick={changeColor}
                            id="blue"
                            className={`btn btn-primary mt-1 ${selectedTool === 'blue' ? 'border border-dark' : ''}`}
                        >
                            Blue
                        </button>
                        <button
                            onClick={changeColor}
                            id="red"
                            className={`btn btn-danger mt-1 ${selectedTool === 'red' ? 'border border-dark' : ''}`}
                        >
                            Red
                        </button>
                        <div className="mt-3">
                            <img
                                onClick={changeColor}
                                id="black"
                                src="https://img.icons8.com/color/96/paint.png"
                                className={`mr-3 ${selectedTool === 'black' ? 'border border-dark' : ''}`}
                                width="48"
                                height="48"
                                alt="paint"
                            />
                            <img
                                onClick={changeColor}
                                id="white"
                                src="https://img.icons8.com/color/96/000000/eraser-tool.png"
                                className={`mx-4 ${selectedTool === 'white' ? 'border border-dark' : ''}`}
                                width="48"
                                height="48"
                                alt="eraser"
                            />
                        </div>
                      <div className={'mt-4 d-100'}>
                        <label className={'fw-bold'}>Enter line width</label>
                        <br/>
                        <input onChange={handleLineChange} value={lineWidth}/>
                      </div>
                    </div>
                </div>
              <div style={{backgroundColor: 'white'}} className="col-9">
                <Canvas color={color} id={params.id} lineWidth={lineWidth} />
                </div>
            </div>
        </div>
    );
};

export default Drawing;
