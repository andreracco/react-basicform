import React from 'react';

const FormFields = (props) => {

    const renderFields = () => {
        const formArray = [];

        for(let elementName in props.formData) {
            formArray.push({
                id: elementName,
                setting: props.formData[elementName]
            })
        }

        return formArray.map( (item, i) => {
            return (
                <div key={i} className="form_element">
                    {renderTemplate(item)}
                </div>
            )
        })
    }

    const showLabel = (show, label) => {
        return show ? 
            <label>{label}</label>
            : null
    }

    const changeHandler = (event, id, blur) => {
        const newState = props.formData;
        newState[id].value = event.target.value;

        if (blur) {
            let validData = validate(newState[id]);
            newState[id].valid = validData[0];
            newState[id].validationMessage = validData[1];
        }

        newState[id].touched = blur;

        props.change(newState);
    }

    const validate = (element) => {
        
        let error = [true, ''];

        if (element.validation.minLen) {
            const valid = element.value.length > element.validation.minLen;
            const message = `${ !valid ? 'Must be greater than ' + element.validation.minLen  : ''}`;

            error = !valid ? [valid, message] : error
        }

        if (element.validation.required) {
            const valid = element.value.trim() !== '';
            const message = `${ !valid ? 'This field is required' : ''}`

            error = !valid ? [valid, message] : error
        }

        return error;
    }

    const showValidation = (data) => {
        let errorMessage = null;

        if (data.validation && !data.valid) {
            errorMessage = (
                <div className="label_error">
                    {data.validationMessage}
                </div>
            )
        }

        return errorMessage;
    }

    const renderTemplate = (data) => {

        let value = data.setting;
        let formTemplate = null;

        switch(value.element) {
        case('input'):
            formTemplate = (
                <div>
                    {showLabel(value.label, value.labelText)}
                    <input {...value.config} 
                        value={value.value}
                        onBlur={
                            (event) => changeHandler(event, data.id, true)
                        }
                        onChange={
                            (event) => changeHandler(event, data.id, false)
                        }
                    />
                    {showValidation(value)}
                </div>
            )
            break;
        case('textarea'):
            formTemplate = (
                <div>
                    {showLabel(value.label, value.labelText)}
                    <textarea {...value.config}
                        value={value.value}
                        onChange={
                            (event) => changeHandler(event, data.id)
                        }
                    />
                    
                </div>
            )
            break;
        case('select'):
            formTemplate = (
                <div>
                    {showLabel(value.label, value.labelText)}
                    <select name={value.name} 
                        value={value.value}
                        onChange={
                            (event) => changeHandler(event, data.id)
                        }
                    >
                        { value.config.options.map( (item,i) => (
                            <option key={i} value={item.val}>
                                {item.text}
                            </option>
                        )) }
                    </select>
                </div>
            )
            break;
        default:
            formTemplate = null
        }

        return formTemplate;

    }

    return (
        <div>
            {renderFields()}
        </div>
    );
};

export default FormFields;