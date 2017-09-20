import * as actionTypes from './action-types';
import * as http from './utils/http';

export const editImage = (endpoint, imageFile) => (
    dispatch => {
        dispatch({
            type: actionTypes.EDIT_IMAGE,
            imageFile,
        });
        http
        .upload(imageFile, endpoint)
        .then(
            data => dispatch({
                type: actionTypes.EDIT_IMAGE_SUCCESS,
                data,
            })
        )
        .catch(
            data => dispatch({
                type: actionTypes.EDIT_IMAGE_FAIL,
                data,
            })
        );
    }
);

export const addItem = () => ({
    type: actionTypes.ADD_ITEM,
});

export const removeItem = item => ({
    type: actionTypes.REMOVE_ITEM,
    item,
});

export const changeItemPosition = (item, position) => ({
    type: actionTypes.CHANGE_ITEM_POSITION,
    item,
    position,
});

export const changeItem = (item, values) => ({
    type: actionTypes.CHANGE_ITEM,
    item,
    values,
});

export const changeImageDimmensions = dimensions => ({
    type: actionTypes.CHANGE_IMAGE_DIMENSION,
    dimensions,
});
