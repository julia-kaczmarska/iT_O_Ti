import React from 'react';
import "./Form.css"

const Form = ({ fields, onSubmit, buttonText }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        onSubmit(data);
    };

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                {fields.map((field, index) => (
                    <div key={index}>
                        <label>{field.label}</label>
                        <input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            required={field.required}
                        />
                    </div>
                ))}
                <button className={"button"} type="submit">{buttonText}</button>
            </form>
        </div>
    );
};

export default Form;
