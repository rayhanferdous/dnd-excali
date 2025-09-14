import { useDispatch, useSelector } from 'react-redux';
import { setColor } from '@/features/toolSlice';
import { updateLastShape } from '@/features/drawingSlice';

export default function ColorPicker() {
    const dispatch = useDispatch();
    const color = useSelector((state) => state.tool.color);
    const selectedId = useSelector((state) => state.tool.selectedId);
    const shapes = useSelector((state) => state.drawing.shapes);

    const handleColorChange = (e) => {
        const newColor = e.target.value;
        dispatch(setColor(newColor));

        if (selectedId) {
            const selectedShape = shapes.find((s) => s.id === selectedId);
            if (selectedShape) {
                dispatch(updateLastShape({ id: selectedId, props: { fill: newColor } }));
            }
        }
    };

    return (
        <div className=" bg-white p-2 shadow rounded">
            <label>Fill Color:</label>
            <input
                type="color"
                value={color ?? 'transparent'}
                onChange={handleColorChange}
                className="ml-2"
            />
        </div>
    );
}
