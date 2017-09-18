import React from 'react';
import {B} from 'b_';
import './styles';
import EditorSideItem from '../editor_side_item';
import EditorDropzone from '../editor_dropzone';
import EditorDragzone from '../editor_dragzone';

const bx = B({ isFullModifier: false }).with('editor');

export default ({
    endpoints,
    editing,
    editingImage,
    items,
    editImage,
    addItem,
    changeItemPosition,
    changeItem,
    removeItem,
}) => (
    <div className={bx('container')}>
        { editing
            ?
                <div className={bx('editor')}>
                    <div className={bx('main')}>
                        <EditorDragzone
                            imageUrl={editingImage.preview}
                            items={items.filter(item => !!item)}
                            handlerSize={30}
                            onChangeItemPosition={changeItemPosition}
                        />
                    </div>
                    <div className={bx('side')}>
                        {
                            items.filter(item => !!item).map((item, index) => (
                                <EditorSideItem
                                    key={index}
                                    {...item}
                                    number={index + 1}
                                    onChange={values => changeItem(item, values)}
                                    onRemove={() => removeItem(item)}
                                />
                            ))
                        }
                        <button type="button" onClick={addItem}>Add Item</button>
                    </div>
                </div>
            :
                <div className={bx('dropzone')}>
                    <EditorDropzone
                        onDrop={acceptedFiles => editImage(endpoints.upload, acceptedFiles[0])}
                    />
                </div>
        }
    </div>
);
