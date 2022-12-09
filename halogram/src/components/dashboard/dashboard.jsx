import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SideBar from '../sideBar/sideBar';
import CircleBar from '../circleBar/circleBar';
import Material from '../material/material';
import io from 'socket.io-client';
import { activateCircle, insertMessage } from '../../services/circle';
import { selectAllCircles, selectActiveCircleId, selectActiveChordId } from '../../store/selectors/circle';
import { selectUserMetadata } from '../../store/selectors/user';

import './dashboard.css';

const socket = io(`http://${window.location.hostname}:8100`);
const joinedChords = [];

const Dashboard = (props) => {

  const circleInit = () => {
    if (!props.allCircles.length) {
      return;
    }
    activateCircle(props.allCircles[0]);
  }

  const onMessageReceived = (message) => {
    insertMessage(message);
  };

  const onInsertMessage = (newMessageText) => {
    const newMessage = {
      _id: Date.now(),
      description: newMessageText,
      chordId: props.activeChordId,
      createdBy: props.userMetadata._id
    };
    socket.emit('message', newMessage);
    insertMessage(newMessage);
  }

  useEffect(() => {
    circleInit();
    socket.on('message', onMessageReceived);
  }, []);

  useEffect(() => {
    if (props.activeChordId && !joinedChords.includes(props.activeChordId)) {
      socket.emit('joinChord', { chordId: props.activeChordId }, error => console.error(error));
      joinedChords.push(props.activeChordId);
    }
  }, [props.activeChordId]);
  
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
  activeCircleId: selectActiveCircleId,
  activeChordId: selectActiveChordId,
});
export default connect(mapStateToProps)(Dashboard);
