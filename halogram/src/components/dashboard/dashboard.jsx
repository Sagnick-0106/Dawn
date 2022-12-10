import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SideBar from '../sideBar/sideBar';
import CircleBar from '../circleBar/circleBar';
import Material from '../material/material';
import { activateCircle } from '../../services/Circle';
import { selectAllCircles } from '../../store/selectors/circle';

import './dashboard.css';

const Dashboard = (props) => {


  useEffect(() => {
    activateCircle(props.allCircles[0]);
  }, []);
  
  return (
    <div className="dashboard">
      <SideBar />
      <CircleBar />
      <Material />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  allCircles: selectAllCircles,
});
export default connect(mapStateToProps)(Dashboard);
