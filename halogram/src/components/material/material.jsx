import React, { Component } from 'react';
import "./material.css";

class Material extends Component { 

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.insertChat(this.newChat, this.chatForm);
    }

    render() { 
        return (
            <div className="material">
                <div className="materialHistory">
                    <div className="chatHistory">
                        <div className="chatBox">
                            {Object.entries(this.props.chats).map(([key, chat])=>
                                <div className={"chatElement " + chat.party} key={ key }>
                                    <div className="chatUser"></div>
                                    <p>{ chat.description }</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="materialInput">
                    <form className="materialAdd" 
                    ref={input => this.chatForm = input} onSubmit={(e) => {this.handleSubmit(e)}}>
                        <input 
                        ref={input => this.newChat = input}
                        className="materialPlaceholder" 
                        type="text" 
                        placeholder="Message #General" />
                    </form>
                    <div className="inputButton" 
                    onClick={() =>this.props.insertChat(this.newChat, this.chatForm)}></div>
                </div>
            </div>
        );
    }
}
 
export default Material;
