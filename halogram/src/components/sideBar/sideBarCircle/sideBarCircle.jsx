import React, { Component } from 'react';
import "./sideBarCircle.css";

class SideBarCircle extends Component {
    render() { 
        return (
            <div className={"sideBar-circle-component " + this.props.circle.status} 
            onClick={() => this.props.onActivate(this.props.circle.id)}>
                <div className="sideBar-circle"></div>
            </div>
        );
    }
}
 
export default SideBarCircle;
