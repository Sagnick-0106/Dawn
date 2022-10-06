import React, { Component } from 'react';
import "./sideBar.css"
import SideBarCircle from './sideBarCircle/sideBarCircle';

class SideBar extends Component {
    state = {
        circles: this.props.circles
    }

    handleActiveCircle = circleId => {
        let tempcircles = this.state.circles;
        for(let i=0; i<tempcircles.length; i++) {
            if(tempcircles[i].status === "active") {
                if(tempcircles[i].id !== circleId) {
                    tempcircles[i].status = "inactive"
                }
                else return;
            }
            else if(tempcircles[i].id === circleId) 
                tempcircles[i].status = "active";
        }
        this.setState({circles: tempcircles})

    }

    render() { 
        return (
        <div className="sideBar">
            <div className="sideBar-components"></div>
            {Object.entries(this.state.circles).map(([key, value])=>
                <SideBarCircle key={key} onActivate={this.props.onActivate} circle={value}/>
            )}
        </div>
        );
    }
}
 
export default SideBar;