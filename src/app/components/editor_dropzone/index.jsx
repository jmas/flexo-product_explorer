import React from 'react';
import Dropzone from 'react-dropzone'
import {B} from 'b_';
import './styles';

const bx = B({ isFullModifier: false }).with('editor_dropzone');

export default ({
    onDrop,
}) => (
    <div className={bx('container')}>
        <Dropzone
            accept={'image/*'}
            multiple={false}
            onDrop={onDrop}
            className={bx('dropzone')}
        >
            <button type="button">Upload file for editing</button>
        </Dropzone>
    </div>
);
