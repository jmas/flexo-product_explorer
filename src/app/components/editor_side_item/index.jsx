import React from 'react';
import { Formik } from 'formik';
import {B} from 'b_';
import './styles';

const bx = B({ isFullModifier: false }).with('editor_side_item');

export default Formik({
    mapPropsToValues: ({
        name,
        inventoryNumber,
        link,
    }) => ({
        name,
        inventoryNumber,
        link,
    }),
    handleSubmit: (values, { props, setErrors, setSubmitting }) => {
       props.onChange(values);
    },
})(({
    // form
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    // other
    number,
    onRemove,
}) => (
    <div className={bx('container')}>
        <form onSubmit={handleSubmit}>
            <div className={bx('name')}>
                {number}
            </div>
            <div className={bx('inventory_number')}>
                <input
                    name="inventoryNumber"
                    type="text"
                    value={values.inventoryNumber}
                    placeholder="Inventory Number"
                    onChange={handleChange}
                    onBlur={handleSubmit}
                />
            </div>
            <div className={bx('name')}>
                <input
                    name="name"
                    type="text"
                    value={values.name}
                    placeholder="Name"
                    onChange={handleChange}
                    onBlur={handleSubmit}
                />
            </div>
            <div className={bx('link')}>
                <input
                    name="link"
                    type="text"
                    value={values.link}
                    placeholder="Link"
                    onChange={handleChange}
                    onBlur={handleSubmit}
                />
            </div>
            <button
                type="button"
                className={bx('remove')}
                onClick={onRemove}
            >
                Remove
            </button>
        </form>
    </div>
));
