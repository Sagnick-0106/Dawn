import React, { Component } from 'react';
import "./circleBar.css";

class CircleBar extends Component {
     
    render() { 
        return (
            <div className="circleBar">
                <div className="circleBanner">
                    <div className="circleTitle">Circle</div>
                </div>
                {Object.entries(this.props.chords).map(([key, chord])=>
                    <div className={"chord " + chord.status} 
                        onClick={() => this.props.handleActiveChord(chord.id)}
                        key={ key }>
                        <span className="chordIcon"></span>
                        <span>{ chord.name }</span>
                    </div>
                )}
            </div>
        );
    }
}
 
export default CircleBar;