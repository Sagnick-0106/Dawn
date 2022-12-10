import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid'; 
import "./material.css";
import { selectActiveChordId, selectMessagesOfActiveChord } from '../../store/selectors/circle';
import { selectUserMetadata } from '../../store/selectors/user';
import { sendMessage } from '../../services/Circle';
import { CREATED_BY_SELF } from '../../utils/constants';

const Material = (props) => {
    const [newMessage, setNewMessage] = useState('');
    const [chatForm, setChatForm] = useState('');

    const onChatSubmit = (event) => {
        event.preventDefault();
        sendMessage({
            tempId: uuidv4(),
            description: newMessage,
            chordId: props.activeChordId,
            createdBy: CREATED_BY_SELF
        });
        chatForm.reset();
    }

    const messageParty = (message) => {
        return ([props.userMetadata?._id, CREATED_BY_SELF].includes(message.createdBy) ? 'self' : 'other');
    }

    return (
        <div className="material">
            <div className="materialHistory">
                <div className="chatHistory">
                    <div className="chatBox">
                        {!!props.messagesOfActiveChord?.length && props.messagesOfActiveChord.map(chat =>
                            <div className={`chatElement ${messageParty(chat)}`} key={chat._id || chat.tempId}>
                                <div className="chatUser"></div>
                                <p>{chat.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="materialInput">
                <form className="materialAdd"
                    ref={setChatForm} onSubmit={onChatSubmit}>
                    <input
                        onChange={e => setNewMessage(e.target.value)}
                        className="materialPlaceholder"
                        type="text"
                        placeholder="Message #General" />
                </form>
                <div className="inputButton"
                    onClick={onChatSubmit}></div>
            </div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    userMetadata: selectUserMetadata,
    activeChordId: selectActiveChordId,
    messagesOfActiveChord: selectMessagesOfActiveChord
});
export default connect(mapStateToProps)(Material);

