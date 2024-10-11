import React from 'react';

const Form = ({ fields, onSubmit, buttonText }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <form onSubmit={handleSubmit}>
            {fields.map((field, index) => (
                <div key={index}>
                    <label>{field.label}</label>
                    <input
                        type={field.type}
                        name={field.name}
                        value={field.value}
                        placeholder={field.placeholder}
                        required={field.required}
                        onChange={field.onChange}
                    />
                </div>
            ))}
            <button type="submit">{buttonText}</button>
        </form>
    );
};

export default Form;
