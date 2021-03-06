import React, {Component} from 'react';
import {B} from 'b_';
import './styles';
import EditorDragItem from '../editor_drag_item';

const bx = B({ isFullModifier: false }).with('editor_dragzone');

export default class extends Component {
    state = {
        k: null,
        imageWidth: 0,
        imageHeight: 0,
        containerWidth: 0,
        containerHeight: 0,
        containerBounds: null,
    };

    componentDidMount() {
        const {
            onChangeImageDimmension,
        } = this.props;
        const image = new Image();
        image.onload = () => {
            onChangeImageDimmension({
                width: image.width,
                height: image.height,
            });
            this.setState(
                    state => ({
                    ...state,
                    imageWidth: image.width,
                    imageHeight: image.height,
                })
            );
        };
        image.src = this.props.imageUrl;
    }

    render(
        {
            imageUrl,
            items,
            handlerSize,
            onChangeItemPosition,
            onChangeK,
        },
        {
            k,
            imageWidth,
            imageHeight,
            containerBounds,
            containerWidth,
            containerHeight,
        }
    ) {
        return (
            <div
                className={bx('container')}
                style={{
                    backgroundImage: imageUrl ? `url(${imageUrl})`: null,
                }}
                ref={el => this._refreshContainerDimensions(el)}
            >
                { k
                    ?
                        items.map(
                            (item, index) => (
                                <EditorDragItem
                                    {...item}
                                    number={index + 1}
                                    bounds={containerBounds}
                                    defaultPosition={
                                        {
                                            x: !item.x && containerWidth > 0 ? containerWidth / 2: item.x * k,
                                            y: !item.y && containerHeight > 0 ? containerHeight / 2: item.y * k,
                                        }
                                    }
                                    onChangePosition={
                                        ({x, y}) => onChangeItemPosition(
                                            item,
                                            {
                                                x: Math.ceil(x / k),
                                                y: Math.ceil(y / k),
                                            }
                                        )
                                    }
                                />
                            )
                        )
                    :
                        null
                }
            </div>
        );
    }

    _refreshContainerDimensions = containerEl => {
        if (containerEl) {
            const {
                handlerSize,
            } = this.props;
            const {
                imageWidth,
                imageHeight,
                containerBounds,
            } = this.state;
            const containerWidth = containerEl.clientWidth;
            const k = containerWidth / imageWidth;
            if (k) {
                const containerHeight = Math.ceil(imageHeight * k);
                containerEl.style.height = containerHeight + 'px';
                if (!containerBounds) {
                    this.setState(
                        state => ({
                            ...state,
                            k,
                            containerWidth,
                            containerHeight,
                            containerBounds: {
                                left: 0,
                                top: 0,
                                right: containerWidth - handlerSize,
                                bottom: containerHeight - handlerSize,
                            },
                        })
                    );
                }
            }
        }
    };
};
