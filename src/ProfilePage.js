import React, { Component } from 'react';
import { connect } from 'react-redux';
// import CreateGoalPage from './CreateGoalPage';
import { Link } from 'react-router-dom';
import NewCheckIn from './newCheckIn';

class ProfilePage extends Component  {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            userName: '',
            image: '',
            profileImage: false,
            quote: '',
            goals: [],
            recentCheckIns: [],
            recentGoals: [],
            writingCheckIn: false,
            writingGoal: false
        }
    }

    componentDidMount = async() => {
        let fetchData = await fetch('http://localhost:5000/getCheckins')
        let data = await fetchData.json();
            // console.log(data)
            this.setState({ recentCheckIns: data })
        let fetchData2 = await fetch('http://localhost:5000/getGoals')    
        let data2 = await fetchData2.json();
            // console.log(data2)
            this.setState({ recentGoals: data2 })
        
    }

    handleSubmit = () => {
        let url = 'http://localhost:5000/goals';
        let post = {
            method: 'POST',
            body: JSON.stringify({
                userid: this.state.user.userid,
                title: this.state.title,
                description: this.state.description,
                deadline: this.state.deadline
            })

        };

        fetch(url, post)
        // .then(data => console.log(data))
    }

    saveRenderCheckins = () => {
        if(this.state.recentCheckIns.length > 0) {
            return this.state.recentCheckIns.map((checkin, i) => {
            return <li className="profile-goal" key={i}>{ checkin.description }</li>
        })
        }
    }

    saveRenderGoals = () => {
        if(this.state.recentGoals.length > 0) {
            return this.state.recentGoals.map((goal, i) => {
            return <li className="profile-goal" key={i}>{ goal.goalname }</li>
        })
        }
    }



    render (){
        
        return (
            <div>
                <img alt="profile-img" src={this.state.image} />
                <h4>Upload your photo:</h4>
                <input type="file" onChange={(event) => {
                    let file = event.target.files[0];
                    let url = URL.createObjectURL(file);
                    // console.log(file) 
                    this.setState({ image: url }) }} />
                {/* {console.log(this.state.image)} */}
               
                <h3>My personal goals</h3>
                <div>
                    <Link to='/main/create-goal'><i className="fas fa-plus-circle fa-2x"></i></Link>
                </div>
                {/* List of goals */}
                {this.saveRenderGoals()}
                {/* My recest checkins '+'(Add) button on the same line */}
                <h3>My recent checkins</h3>   
                {/* List of checkins */}
                {this.saveRenderCheckins()}
                <i className="fas fa-plus-circle fa-2x" onClick={() => this.setState({ writingCheckIn: !this.state.writingCheckIn })}></i>
                {this.state.writingCheckIn ? <NewCheckIn handleSubmit={(text) => this.setState({ recentCheckIns: [{description: text}, ...this.state.recentCheckIns], writingCheckIn: false })} /> : null }
            </div>
        )
    }
    
}

export default connect(
    state => ({ user: state.user})
)(ProfilePage);