import React, { Component } from 'react';
import { Container, Form } from 'react-bootstrap';
import { createRoot } from 'react-dom/client';
import { useMutation } from '@apollo/client';
import { Stage, Layer, Line, Text, Group } from 'react-konva';
import { ADD_PIC } from '../utils/mutations'

// function to convert current canvas to image 
function downloadpic(pic, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = pic;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const Canvas = (props) => {
  const [tool, setTool] = React.useState('pen');
  const [color, setColor] = React.useState("#000000")
  const [width, setWidth] = React.useState(7)
  const [lines, setLines] = React.useState([]);
  const [flips, setFlips] = React.useState([]);
  const [canvasH, setCanvasH] = React.useState([window.innerHeight]);
  const [canvasW, setCanvasW] = React.useState([window.innerWidth]);
  const [scale, setScale] = React.useState({x: 1, y: 1})
  const [addPic, { error }] = useMutation(ADD_PIC);

  const isDrawing = React.useRef(false);
  
  const screen = {width: canvasW, height: canvasH};
  // const stageW = 1000;
  // const stageH = 1000;
  // let container = document.querySelector('#canvas-container');

  // let containerW = window.innerWidth;
  // let scaleX = containerW / stageW;
  // let containerH = window.innerHeight;
  // let scaleY = containerH / stageH;
  // let scale = {x: scaleX, y: scaleY}

  // React.useEffect(() => {
  //   // Update the document title using the browser API
  //   screen = {height: window.innerHeight, width: window.innerWidth}
  //   console.log(screen)
  // });

  // Canvas.componentDidMount = function() {
  //   screen = {height: window.innerHeight, width: window.innerWidth};
  //   console.log(screen)
  // }

  document.body.addEventListener('touchmove', function(e){ e.preventDefault(); }, { passive: false });

  //------ Mouse Events ------//

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getRelativePointerPosition();
    // let change = e.target.getStage().getRelativePointerPosition()/e.target.getStage().getPointerPosition();
    // pos.x = pos.x*scale.x
    // pos.y = pos.y*scale.y
    setLines([...lines, { tool, color, width, points: [pos.x, pos.y] }]);
    setFlips([...flips, { tool, color, width, points: [window.innerWidth-pos.x, pos.y] }])
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage()
    let stageSize = stage.getAttrs()
    // const stageW = stage.getSelfRect();
    console.log(stageSize)
    const point = stage.getRelativePointerPosition();
    // let change = e.target.getStage().getRelativePointerPosition()/e.target.getStage().getPointerPosition();
    let lastLine = lines[lines.length - 1];
    let lastFlip = flips[flips.length -1];


    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lastFlip.points = lastFlip.points.concat([window.innerWidth-point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    flips.splice(flips.length - 1, 1, lastFlip);
    // setLines(lines.push(flips))
    setLines(lines.concat());
    setFlips(flips.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    let i = lines.length - 1
    console.log("lines" + lines[i].points)
    console.log("flips" + flips[i].points)
  };

  //------ End mouse events -------//

  //------ Touch events ------//
  const handleTouchStart = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getRelativePointerPosition();
    // pos.x = pos.x*scale.x
    // pos.y = pos.y*scale.y

    setLines([...lines, { tool, color, width, points: [pos.x, pos.y] }]);
    setFlips([...flips, { tool, color, width, points: [window.innerWidth-pos.x, pos.y]}])
  };

  const handleTouchMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getRelativePointerPosition();
    let lastLine = lines[lines.length - 1];
    let lastFlip = flips[flips.length -1];


    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lastFlip.points = lastFlip.points.concat([window.innerWidth-point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    flips.splice(flips.length - 1, 1, lastFlip);
    // setLines(lines.push(flips))
    setLines(lines.concat());
    setFlips(flips.concat());
  };

  const handleTouchEnd = () => {
    isDrawing.current = false;
  };

  //------ End Touch events ------//

  const stageRef = React.useRef(null);

  const handleExport = async () => {
    const pic = stageRef.current.toDataURL();
    pic.toString();

    try {
      await addPic({variables: {pngString: pic}});
    }
    catch (err) {
      console.log(err)
    }

    // console.log(pngString);
    setLines([]);
    setFlips([]);
    // Instead of logging here we can 
    // save to database or allow downloads
    // using the generated pic
    // downloadpic(pic, 'stage.png');
  };

  const clearCanvas = () => {
    setLines([]);
    setFlips([]);
  };

  window.onresize = function() {
    // setCanvasW(window.innerWidth);
    // setCanvasH(window.innerHeight);
    // console.log(canvasW)
    let x = window.innerWidth/screen.width
    let y = window.innerHeight/screen.height
    setScale({x: (window.innerWidth/screen.width), y: (window.innerHeight/screen.height)})
    console.log("w", screen.width)
    console.log("h", screen.height)
    console.log(scale)
    let i = lines.length - 1
    console.log("lines" + lines[i].points)
    console.log("flips" + flips[i].points)
  }

  // // Adjust canvas scale function
  // function fitStageIntoParentContainer() {
  //   var container = document.querySelector('#canvas-container');
  //   var canvas = document.querySelector('#canvas')
  //   // now we need to fit stage into parent container
  //   var containerWidth = container.width;

  //   // but we also make the full scene visible
  //   // so we need to scale all objects on canvas
  //   var scale = containerWidth / 1000;

  //   canvas.width(1000 * scale);
  //   canvas.height(1000 * scale);
  //   canvas.scale({ x: scale, y: scale });
  // }

  // fitStageIntoParentContainer();
  //     // adapt the stage on any window resize
  // window.addEventListener('resize', fitStageIntoParentContainer);

  return (
    <div id='canvas-container'>
      <div>
        <p>Click and drag to draw!</p>

        {/* Clear button */}
        <button className='btn btn-danger' onClick={clearCanvas} disabled={lines.length === 0 && true}>Clear</button>
      
        {/* Save button */}
        <button className='btn btn-primary' onClick={handleExport} disabled={lines.length === 0 && true}>Save</button>

        {/* Tool Selector */}
        {/* <select
          value={tool}
          onChange={(e) => {
            setTool(e.target.value);
          }}
        >
          <option value="pen" disabled>Tool</option>
          <option value="pen">Pen</option>
          <option value="eraser">Eraser</option>
        </select> */}

        {/* Color Selector */}
        {/* <select
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
        >
          <option value="#000000" disabled>Color</option>
          <option value="black">Black</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="purple">Purple</option>
          <option value="yellow">Yellow</option>
        </select> */}

        {/* Width Selector */}
        {/* <select
          value={width}
          onChange={(e) => {
            setWidth(e.target.value);
          }}
          placeholder={"Width"}
        >
          <option value="7" disabled>Width</option>
          <option value="3">small</option>
          <option value="7">medium</option>
          <option value="14">large</option>
          <option value="20">largest</option>
        </select> */}

      {/* Width Selector Bootstrap */}
      <Form.Select
          value={width}
          onChange={(e) => {
            setWidth(e.target.value);
          }}
          aria-label="Default select example"
      >
        <option>Pen Width</option>
        <option value="3">small</option>
        <option value="7">medium</option>
        <option value="14">large</option>
        <option value="20">largest</option>
      </Form.Select>

        <Stage
          id='canvas'
          ref={stageRef}
          brightness={1}
          width={window.innerWidth}
          height={window.innerHeight}
          scale={scale}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Layer>
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke={line.color}
                  shadowColor={line.color}
                  strokeWidth={line.width}
                  tension={0.5}
                  scaleX={1}
                  opacity={line.tool === 'pen' && 0.6 || line.tool === 'eraser' && 1}
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation={
                    line.tool === 'eraser' ? 'destination-out' : 'source-over'
                  }
                />
              ))}
                {flips.map((flip, i) => (
                <Line
                  key={i}
                  points={flip.points}
                  stroke={flip.color}
                  shadowColor={flip.color}
                  strokeWidth={flip.width}
                  tension={0.5}
                  opacity={flip.tool === 'pen' && 0.6 || flip.tool === 'eraser' && 1}
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation={
                    flip.tool === 'eraser' ? 'destination-out' : 'source-over'
                  }
                />
              ))}
          </Layer>    
        </Stage>
      </div>
    </div>
  )
}

export default Canvas