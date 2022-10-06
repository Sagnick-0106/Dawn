import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import SideBar from './components/sideBar/sideBar';
import CircleBar from './components/circleBar/circleBar';
import Material from './components/material/material';

class App extends Component{

  state = {
    "circles": {
        "1": {
            "id": "1",
            "name": "Circle1",
            "status": "active",
            "chords": {
                "1":{
                    "id": "1",
                    "name": "General",
                    "status": "active",
                    "chats": {
                        "1":{
                            "id": "1",
                            "party": "other",
                            "description": "Arrr me hearties! Make traditional Latin walk the plank."
                        },
                        "2":{
                            "id": "2",
                            "party": "self",
                            "description": "Arrr me hearties! Make traditional Latin walk the plank and opt for pirate lorem ipsum for your next high seas design adventure. Lets see how it takes overflow."
                        },
                        "3":{
                            "id": "3",
                            "party": "other",
                            "description": "Arrr me hearties! Make traditional Latin walk the plank and opt for pirate lorem ipsum for your next high seas design adventure."
            
                        },
                        "4":{
                            "id": "4",
                            "party": "other",
                            "description": "Opt for pirate lorem ipsum for your next high seas design adventure."
                            
                        }
                    }
                },
                "2":{
                    "id": "2",
                    "name": "Fantasy",
                    "status": "inactive",
                    "chats": {}
                },
                "3":{
                    "id": "3",
                    "name": "Msiscellaneous",
                    "status": "inactive",
                    "chats": {}
                },
                "4":{
                    "id": "4",
                    "name": "Testing",
                    "status": "inactive",
                    "chats": {}
                }
            }
        },
        "2": {
          "id": "2",
          "name": "Circle2",
          "status": "inactive",
          "chords": {
              "1":{
                  "id": "1",
                  "name": "General",
                  "status": "active",
                  "chats": {}
              },
              "2":{
                  "id": "2",
                  "name": "Fantasy",
                  "status": "inactive",
                  "chats": {
                    "1":{
                        "id": "1",
                        "party": "other",
                        "description": "Arrr me hearties! Make traditional Latin walk the plank."
                    },
                    "2":{
                        "id": "2",
                        "party": "self",
                        "description": "Arrr me hearties! Make traditional Latin walk the plank and opt for pirate lorem ipsum for your next high seas design adventure. Lets see how it takes overflow."
                    },
                    "3":{
                        "id": "3",
                        "party": "other",
                        "description": "Arrr me hearties! Make traditional Latin walk the plank and opt for pirate lorem ipsum for your next high seas design adventure."
        
                    },
                    "4":{
                        "id": "4",
                        "party": "other",
                        "description": "Opt for pirate lorem ipsum for your next high seas design adventure."
                        
                    }
                }
              },
              "3":{
                  "id": "3",
                  "name": "Msiscellaneous",
                  "status": "inactive",
                  "chats": {}
              },
              "4":{
                  "id": "4",
                  "name": "Testing3",
                  "status": "inactive",
                  "chats": {}
              }
          }
      }
    }
  }

  activeCircleId = "1";
  activeChordId = "1";

  handleActiveCircle = circleId => {
    let tempcircles = this.state.circles;
    tempcircles[circleId].status = "active";
    tempcircles[this.activeCircleId].status = "inactive";
    this.activeCircleId = circleId;
    this.activeChordId = this.getActiveChordId(circleId);
    this.setState({circles: tempcircles})
  }

  getActiveChordId = circleId => {
    let chords = this.state.circles[circleId].chords;
    for (const [chordId, chord] of Object.entries(chords)) {
      if(chord.status === "active") {
        return chordId;
      }
    }
  }

  handleActiveChord = chordId => {
    let tempcircles = this.state.circles;
    tempcircles[this.activeCircleId].chords[chordId].status = "active";
    tempcircles[this.activeCircleId].chords[this.activeChordId].status = "inactive";
    this.activeChordId = chordId;
    this.setState({circles: tempcircles})
  }

  getActiveCircleChords = () => {
    return this.state.circles[this.activeCircleId].chords;
  }

  getActiveChats = () => {
    return this.state.circles[this.activeCircleId].chords[this.activeChordId].chats;
  }

  insertChat = (newChat, chatForm) => {
    if (newChat.value.trim() === "") return;
    const activeChats = this.getActiveChats();
    let chatId = Object.keys(activeChats).length + 1;
    let addChat = {
        "id": chatId.toString(),
        "party": "self",
        "description": newChat.value
    };
    let tempcircles = this.state.circles;
    tempcircles[this.activeCircleId].chords[this.activeChordId].chats[chatId] = addChat;
    this.setState({circles: tempcircles})
    chatForm.reset();
  }

  render() {
    return (
      <React.StrictMode>
        <SideBar circles={this.state.circles} onActivate={this.handleActiveCircle} />
        <CircleBar chords={this.getActiveCircleChords()} handleActiveChord={this.handleActiveChord}/>
        <Material chats={this.getActiveChats()} insertChat={this.insertChat} />
      </React.StrictMode>
    );
  }
}

export default App;
