import React from 'react';
import Draggable from 'react-draggable';
import {B} from 'b_';
import './styles';

const bx = B({ isFullModifier: false }).with('editor_drag_item');

export default ({
    name,
    number,
    width,
    height,
    bounds,
    defaultPosition,
    onChangePosition,
}) => (
    <Draggable
        defaultPosition={defaultPosition}
        position={null}
        bounds={bounds}
        onStop={({}, {x, y}) => onChangePosition({x, y})}
    >
        <div className={bx('container')}>
            <div className={bx('number')}>
                {number}
            </div>
            <div className={bx('number')}>
                {name}
            </div>
        </div>
    </Draggable>
);
