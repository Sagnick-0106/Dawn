import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SideBar from '../sideBar/sideBar';
import CircleBar from '../circleBar/circleBar';
import Material from '../material/material';
import { activateCircle, sendMessage } from '../../services/Circle';
import { selectAllCircles, selectActiveChordId } from '../../store/selectors/circle';
import { selectUserMetadata } from '../../store/selectors/user';

import './dashboard.css';

const Dashboard = (props) => {

  const circleInit = () => {
    if (!props.allCircles.length) {
      return;
    }
    activateCircle(props.allCircles[0]);
  }

  const onInsertMessage = (newMessageText) => {
    const newMessage = {
      _id: Date.now(),
      description: newMessageText,
      chordId: props.activeChordId,
      createdBy: props.userMetadata._id
    };
    sendMessage(newMessage);
  }

  useEffect(() => {
    circleInit();
  }, []);
  
  return (
    <div className="dashboard">
      <SideBar />
      <CircleBar />
      <Material insertChat={onInsertMessage} />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  allCircles: selectAllCircles,
  userMetadata: selectUserMetadata,
  activeChordId: selectActiveChordId,
});
export default connect(mapStateToProps)(Dashboard);
