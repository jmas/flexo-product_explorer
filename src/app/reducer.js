import * as actionTypes from './action-types';

const defaultState = {
    editingImage: null,
    items: [],
};

const createItem = (item={}) => ({
    inventoryNumber: null,
    name: null,
    link: null,
    x: 0,
    y: 0,
    ...item,
});

export default (state=defaultState, action) => {
    switch (action.type) {
        case actionTypes.EDIT_IMAGE_SUCCESS:
            return {
                ...state,
                editingImage: {
                    preview: action.data.imageUrl,
                },
            };

        case actionTypes.ADD_ITEM:
            return {
                ...state,
                items: [
                    ...state.items,
                    createItem(),
                ],
            };

        case actionTypes.CHANGE_ITEM_POSITION:
            return {
                ...state,
                items: [
                    ...state.items.map(item => {
                        if (item === action.item) {
                            return {
                                ...item,
                                ...action.position,
                            };
                        }
                        return item;
                    })
                ],
            };

        case actionTypes.REMOVE_ITEM:
            return {
                ...state,
                items: [
                    ...state.items.map(item => item !== action.item ? item: null)
                ],
            };

        case actionTypes.CHANGE_ITEM:
            return {
                ...state,
                items: [
                    ...state.items.map(item => {
                        if (item === action.item) {
                            return {
                                ...item,
                                ...action.values,
                            };
                        }
                        return item;
                    })
                ],
            };

        default:
            return state;
    }
};
