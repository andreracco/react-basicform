import React, { Component } from 'react';
import FormFields from '../widgets/forms/formFields';

class User extends Component {

    state = {
        formData: {
            firstname: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'First Name',
                config: {
                    name: 'firstname_input',
                    type: 'text',
                    placeholder: 'Enter your first name'
                }
            },
            lastname: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'Last Name',
                config: {
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Enter your last name'
                }
            },
            message: {
                element: 'textarea',
                value: '',
                label: true,
                labelText: 'Message',
                config: {
                    name: 'message_input',
                    rows: 4,
                    cols: 36
                }
            }
        }
    };

    updateForm = (newState) => {
        this.setState({
            formData:newState
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = {};

        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value
        }

        console.table(dataToSubmit)
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.submitForm}>
                    <FormFields
                        formData={this.state.formData}
                        change={(newState) => this.updateForm(newState)}
                    />
                    <button type="submit">SUBMIT</button>
                </form>
            </div>
        )
    }
}

export default User;