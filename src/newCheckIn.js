import React, { Component } from 'react';

class NewCheckIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            checkInText: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleSubmit(this.state.checkInText);

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Add new checkin:</h2>
                <input className="input-field" type="text" onChange={(event) => this.setState({ checkInText: event.target.value })} />
                {/* <select>
                    {this.props.goals.map(goal => {
                        return <option value={goal.goalid}> {goal.goalname} </option>
                    })}
                </select> */}
            </form>
        )
    }
    
}
    

export default NewCheckIn;