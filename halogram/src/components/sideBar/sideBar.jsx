import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import "./sideBar.css"
import SideBarCircle from './sideBarCircle/sideBarCircle';
import { selectAllCircles } from '../../store/selectors/circle';

const SideBar = (props) => (
    <div className="sideBar">
        <div className="sideBar-components"></div>
        {props.allCircles && props.allCircles?.map((circle) =>
            <SideBarCircle key={circle._id} circle={circle} />
        )}
    </div>
);

const mapStateToProps = createStructuredSelector({
    allCircles: selectAllCircles
});
export default connect(mapStateToProps)(SideBar);
