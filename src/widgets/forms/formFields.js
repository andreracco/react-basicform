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

    const changeHandler = (event, id) => {
        const newState = props.formData;
        newState[id].value = event.target.value;

        props.change(newState);
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
                        onChange={
                            (event) => changeHandler(event, data.id)
                        }
                    />
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