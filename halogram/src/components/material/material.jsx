import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import "./material.css";
import { selectMessagesOfActiveChord } from '../../store/selectors/circle';
import { selectUserMetadata } from '../../store/selectors/user';

const Material = (props) => {
    const [newMessage, setNewMessage] = useState('');
    const [chatForm, setChatForm] = useState('');


    const onChatSubmit = (event) => {
        event.preventDefault();
        props.insertChat(newMessage);
        chatForm.reset();
    }

    const messageParty = (message) => {
        return (message.createdBy === props.userMetadata?._id ? 'self': 'other');
    }

    return (
        <div className="material">
            <div className="materialHistory">
                <div className="chatHistory">
                    <div className="chatBox">
                        {!!props.messagesOfActiveChord?.length && props.messagesOfActiveChord.map(chat =>
                            <div className={`chatElement ${messageParty(chat)}`} key={ chat._id }>
                                <div className="chatUser"></div>
                                <p>{ chat.description }</p>
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
                onClick={() => props.insertChat(newMessage, chatForm)}></div>
            </div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    userMetadata: selectUserMetadata,
    messagesOfActiveChord: selectMessagesOfActiveChord
});
export default connect(mapStateToProps)(Material);

