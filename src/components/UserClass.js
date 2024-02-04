import React from "react";
// its a class based componenet

class UserClass extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            count1: 1,
            count2: 2
        }
    }
   
    render(){
        const {name, location, stat} = this.props;
        return (
            <div className="user-card">
                <h2>{name}</h2>
                <h2>{location}</h2>
                <h2>{stat}</h2>
                <h2>{this.state.count1}</h2>
            </div>
        )
    }
}

export default UserClass;