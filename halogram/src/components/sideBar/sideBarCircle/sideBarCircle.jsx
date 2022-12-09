import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { activateCircle } from '../../../services/circle';
import "./sideBarCircle.css";
import { selectActiveCircleId, selectAllCircles } from '../../../store/selectors/circle';

const SideBarCircle = (props) => {
    const status = (props.activeCircleId === props.circle._id)? 'active': 'inactive';
    return (
        <div className={`sideBar-circle-component ${status}`} 
            onClick={() => activateCircle(props.circle)}
        >
            <div className="sideBar-circle"></div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    activeCircleId: selectActiveCircleId,
    allCircles: selectAllCircles
});
export default connect(mapStateToProps)(SideBarCircle);

