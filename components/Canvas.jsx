import { Stage, Layer, Line, Rect, Circle, Transformer, Group } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import { addShape, updateLastShape, setShapes } from '@/features/drawingSlice'
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { setTool, setSelectedId } from '@/features/toolSlice';


export default function Canvas() {
    const dispatch = useDispatch();
    const shapes = useSelector((state) => state.drawing.shapes);
    const selectedTool = useSelector((state) => state.tool.selectedTool);
    const currentColor = useSelector((state) => state.tool.color);
    const selectedId = useSelector((state) => state.tool.selectedId);

    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState(null);
    const [currentId, setCurrentId] = useState(null);
    const transformerRef = useRef();

    useEffect(() => {
        const saved = localStorage.getItem('shapes');
        if (saved) dispatch(setShapes(JSON.parse(saved)));
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('shapes', JSON.stringify(shapes));
    }, [shapes]);

    useEffect(() => {
        const stage = transformerRef.current?.getStage();
        const selectedNode = stage?.findOne(`#${selectedId}`);
        if (selectedNode) {
            transformerRef.current.nodes([selectedNode]);
            transformerRef.current.getLayer().batchDraw();
        } else {
            transformerRef.current.nodes([]);
        }
    }, [selectedId, shapes]);

    const handleMouseDown = (e) => {
        const stage = e.target.getStage();
        const pos = stage.getPointerPosition();
        setStartPos(pos);
        setIsDrawing(true);
        const id = uuidv4();
        setCurrentId(id);

        let shape;
        switch (selectedTool) {
            case 'draw':
                shape = { id, type: 'line', points: [pos.x, pos.y], stroke: 'black', strokeWidth: 2 };
                break;
            case 'rect':
                shape = { id, type: 'rect', x: pos.x, y: pos.y, width: 0, height: 0, stroke: 'black', fill: currentColor };
                break;
            case 'circle':
                shape = { id, type: 'circle', x: pos.x, y: pos.y, radius: 0, stroke: 'black', fill: currentColor };
                break;
            case 'diamond':
                shape = { id, type: 'diamond', x: pos.x, y: pos.y, width: 0, height: 0, stroke: 'black', fill: currentColor };
                break;
        }

        if (shape) dispatch(addShape(shape));
    };

    const handleMouseMove = (e) => {
        if (!isDrawing || !startPos || !currentId) return;
        const stage = e.target.getStage();
        const pos = stage.getPointerPosition();
        const dx = pos.x - startPos.x;
        const dy = pos.y - startPos.y;

        let updateProps = {};

        switch (selectedTool) {
            case 'draw':
                const shape = shapes.find(s => s.id === currentId);
                if (shape) {
                    const newPoints = [...shape.points, pos.x, pos.y];
                    updateProps = { props: { points: newPoints } };
                }
                break;
            case 'rect':
            case 'diamond':
                updateProps = { props: { width: dx, height: dy } };
                break;
            case 'circle':
                updateProps = { props: { radius: Math.sqrt(dx * dx + dy * dy) } };
                break;
        }

        if (updateProps.props) {
            dispatch(updateLastShape({ id: currentId, ...updateProps }));
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
        setStartPos(null);
        setCurrentId(null);
        dispatch(setTool('select'));
    };

    const renderDiamond = (shape) => {
        const { x, y, width, height, stroke, fill } = shape;

        const points = [
            width / 2, 0,
            width, height / 2,
            width / 2, height,
            0, height / 2,
        ];

        return (
            <Group
                id={shape.id}
                key={shape.id}
                x={x}
                y={y}
                draggable
                onClick={() => {
                    dispatch(setSelectedId(shape.id));
                }}
                onDragEnd={(e) => {
                    dispatch(updateLastShape({ id: shape.id, props: { x: e.target.x(), y: e.target.y() } }));
                }}
                onTransformEnd={(e) => {
                    const node = e.target;
                    const newWidth = width * node.scaleX();
                    const newHeight = height * node.scaleY();

                    node.scaleX(1);
                    node.scaleY(1);

                    dispatch(updateLastShape({
                        id: shape.id,
                        props: {
                            x: node.x(),
                            y: node.y(),
                            width: newWidth,
                            height: newHeight,
                        },
                    }));
                }}
            >
                <Line
                    points={points}
                    closed
                    stroke={stroke}
                    fill={fill}
                />
            </Group>
        );
    };

    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            style={{ background: '#fff' }}
        >
            <Layer>
                {shapes.map((shape) => {
                    switch (shape.type) {
                        case 'line':
                            return <Line
                                id={shape.id}
                                draggable
                                onClick={() => dispatch(setSelectedId(shape.id))}
                                onDragEnd={(e) => {
                                    dispatch(updateLastShape({ id: shape.id, props: { x: e.target.x(), y: e.target.y() } }));
                                }
                                }
                                onTransformEnd={(e) => {
                                    const node = e.target;
                                    const radius = (node.width() * node.scaleX()) / 2;
                                    node.scaleX(1);
                                    node.scaleY(1);
                                    dispatch(updateLastShape({
                                        id: shape.id,
                                        props: {
                                            x: node.x(),
                                            y: node.y(),
                                            radius,
                                        },
                                    }));
                                }} key={shape.id} {...shape} />;
                        case 'rect':
                            return (
                                <Rect
                                    id={shape.id}
                                    key={shape.id}
                                    {...shape}
                                    draggable
                                    onClick={() => {
                                        dispatch(setSelectedId(shape.id));
                                    }}
                                    onDragEnd={(e) => { dispatch(updateLastShape({ id: shape.id, props: { x: e.target.x(), y: e.target.y() } })); }

                                    }
                                    onTransformEnd={(e) => {
                                        const node = e.target;
                                        const width = node.width() * node.scaleX();
                                        const height = node.height() * node.scaleY();
                                        node.scaleX(1);
                                        node.scaleY(1);
                                        dispatch(updateLastShape({
                                            id: shape.id,
                                            props: {
                                                x: node.x(),
                                                y: node.y(),
                                                width,
                                                height,
                                            },
                                        }));
                                    }}
                                />
                            );
                        case 'circle':
                            return (
                                <Circle
                                    id={shape.id}
                                    key={shape.id}
                                    {...shape}
                                    draggable
                                    onClick={() => {
                                        dispatch(setSelectedId(shape.id));
                                    }}
                                    onDragEnd={(e) => {
                                        dispatch(updateLastShape({ id: shape.id, props: { x: e.target.x(), y: e.target.y() } }));
                                    }
                                    }
                                    onTransformEnd={(e) => {
                                        const node = e.target;
                                        const radius = (node.width() * node.scaleX()) / 2;
                                        node.scaleX(1);
                                        node.scaleY(1);
                                        dispatch(updateLastShape({
                                            id: shape.id,
                                            props: {
                                                x: node.x(),
                                                y: node.y(),
                                                radius,
                                            },
                                        }));
                                    }}
                                />
                            );
                        case 'diamond':
                            return renderDiamond(shape);
                        default:
                            return null;
                    }
                })}
                <Transformer
                    ref={transformerRef}
                    rotateEnabled={false}
                />
            </Layer>
        </Stage>
    );
}
