import React, { Component } from 'react';
import FormFields from '../widgets/forms/formFields';
import { firebaseDB } from '../firebase'

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
                },
                validation: {
                    required: true,
                    minLen: 3
                },
                valid: false,
                touched: false,
                validationMessage: ''
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
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
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
                },
                validation: {
                    required: false
                },
                valid: true
            },
            age: {
                element: 'select',
                value: '',
                label: true,
                labelText: 'Age',
                config: {
                    name: 'age_input',
                    options: [
                        {val: '1', text: '11-20'},
                        {val: '2', text: '21-30'},
                        {val: '3', text: '31-40'},
                        {val: '4', text: '40+'}
                    ]
                },
                validation: {
                    required: false
                },
                valid: true
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
        let formIsValid = true;

        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value
        }

        for (let key in this.state.formData) {
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if (formIsValid) {
            
            firebaseDB.ref('users').push(dataToSubmit)
                .then( () => {
                    console.log('user created');
                }).catch ( e => {
                    console.log(e);
                })
        }
        
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.submitForm}>
                    <FormFields
                        formData={this.state.formData}
                        onBlur={(newState) => this.updateForm(newState)}
                        change={(newState) => this.updateForm(newState)}
                    />
                    <button type="submit">SUBMIT</button>
                </form>
            </div>
        )
    }
}

export default User;