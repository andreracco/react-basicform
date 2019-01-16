import React, { Component } from 'react';

class Controlled extends Component {

    state = {
        firstname: '',
        lastname: ''
    }

    handleFirstNameChange = (event) => {
        this.setState({
            firstname: event.target.value
        })
    }

    handleLastNameChange = (event) => {
        this.setState({
            lastname: event.target.value
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
    }

    render(){
        return(
            <div className="container">
                <form onSubmit={this.handleFormSubmit}>
                    <div className="form_element">
                        <label>Enter First Name</label>
                        <input
                            type="text" 
                            onChange={this.handleFirstNameChange}
                            value={this.state.firstname}
                        />
                    </div>

                    <div className="form_element">
                        <label>Enter Last Name</label>
                        <input
                            type="text"
                            onChange={this.handleLastNameChange}
                            value={this.state.lastname}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Controlled;