import React from 'react';
import { useMutation } from '@apollo/client';
import { Form } from 'react-bootstrap';
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
  const [initialW, setInitialW] = React.useState([window.innerWidth-100])
  const [initialH, setInitialH] = React.useState([(window.innerWidth-100)*(1/2)])
  const [canvasW, setCanvasW] = React.useState([window.innerWidth-100]);
  const [canvasH, setCanvasH] = React.useState([(window.innerWidth-100)*(1/2)]);
  const [canvasZ, setCanvasZ] = React.useState([0])
  const [scale, setScale] = React.useState({x: 1, y: 1})
  const [addPic, { error }] = useMutation(ADD_PIC);

  const isDrawing = React.useRef(false);

  React.useEffect(() => {

  });

  document.body.addEventListener('touchmove', function(e){ e.preventDefault(); }, { passive: false });

  //------ Mouse Events ------//

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getRelativePointerPosition();
    setLines([...lines, { tool, color, width, points: [pos.x, pos.y] }]);
    setFlips([...flips, { tool, color, width, points: [initialW-pos.x, pos.y] }])
    setCanvasZ(canvasZ+1)
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage()
    let stageSize = stage.getAttrs()
    console.log(stageSize)
    const point = stage.getRelativePointerPosition();
    let lastLine = lines[lines.length - 1];
    let lastFlip = flips[flips.length -1];


    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lastFlip.points = lastFlip.points.concat([initialW-point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    flips.splice(flips.length - 1, 1, lastFlip);
    // setLines(lines.push(flips))
    setLines(lines.concat());
    setFlips(flips.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    // let i = lines.length - 1
    // console.log("lines" + lines[i].points)
    // console.log("flips" + flips[i].points)
  };

  //------ End mouse events -------//

  //------ Touch events ------//
  const handleTouchStart = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getRelativePointerPosition();

    setLines([...lines, { tool, color, width, points: [pos.x, pos.y] }]);
    setFlips([...flips, { tool, color, width, points: [initialW-pos.x, pos.y]}])
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
    lastFlip.points = lastFlip.points.concat([initialW-point.x, point.y]);

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

  const handleExport = async (context) => {
    const pic = stageRef.current.toDataURL();
    pic.toString();
    const obj = stageRef.current.toObject();
    console.log(obj)
    // if (context.user) {
      try {
        await addPic({variables: {pngString: pic}})
          .then(setLines([]))
          .then(setFlips([]))
          .then(setCanvasZ(0))
      }
      catch (err) {
        console.log(err)
      }
  };

  const clearCanvas = () => {
    setLines([]);
    setFlips([]);
  };

  window.onresize = async function() {
    // console.log("initialH", initialH, "initialW", initialW)
    await setCanvasW(window.innerWidth-100);
    await setCanvasH(canvasW*(1/2))
    await setScale({x: (canvasW/initialW), y: (canvasH/initialH)})
    // console.log("scale", scale)
    // let i = lines.length - 1
    // console.log("lines" + lines[i].points)
    // console.log("flips" + flips[i].points)
  }

  return (
      <div className='d-flex justify-content-center'>
        <div>
        <p className='text-center mt-1'>Click and drag to draw!</p>

        {/* Clear button */}
        <button className='btn btn-danger w-50' onClick={clearCanvas} disabled={lines.length === 0 && true}>Clear</button>
      
        {/* Save button */}
        <button className='btn btn-primary w-50' onClick={handleExport} disabled={lines.length === 0 && true}>Save</button>

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
      <div className='canvas-container border border-3 rounded'>
        <Stage
          id='canvas'
          ref={stageRef}
          brightness={1}
          width={canvasW}
          height={canvasH}
          scale={scale}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Layer>
            <Group>
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke={line.color}
                  shadowColor={line.color}
                  strokeWidth={line.width}
                  tension={0.5}
                  opacity={line.tool === 'pen' && 0.6 || line.tool === 'eraser' && 1}
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation={
                    line.tool === 'eraser' ? 'destination-out' : 'source-over'
                  }
                />
              ))}
              </Group>
            </Layer>
            <Layer>
              <Group>
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
            </Group>
          </Layer>    
        </Stage>
      </div>
      </div>
    </div>
  )
}

export default Canvas