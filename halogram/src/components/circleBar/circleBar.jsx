import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import "./circleBar.css";
import { selectActiveChordId, selectChordsOfActiveCircle } from '../../store/selectors/circle';
import { activateChord } from '../../services/Circle';

const CircleBar = (props) => { 
    const chordStatus = (chordId) => {
        return (chordId === props.activeChordId) ? 'active' : 'inactive';
    }

    return (
        <div className="circleBar">
            <div className="circleBanner">
                <div className="circleTitle">Circle</div>
            </div>
            {!!props.allChordsOfActiveCircle?.length && props.allChordsOfActiveCircle.map((chord) =>
                <div className={`chord ${chordStatus(chord._id)}`} 
                    onClick={() => activateChord(chord)}
                    key={chord._id}>
                    <span className="chordIcon"></span>
                    <span>{ chord.name }</span>
                </div>
            )}
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    activeChordId: selectActiveChordId,
    allChordsOfActiveCircle: selectChordsOfActiveCircle
});
export default connect(mapStateToProps)(CircleBar);
