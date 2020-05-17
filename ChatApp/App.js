/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { } from 'react-native';


import { GiftedChat } from 'react-native-gifted-chat'
import io from 'socket.io-client/dist/socket.io'

class App extends Component {

  state = {
    messages: [],
    user: {
      _id: "",
    }
  }

  constructor(props) {
    super(props);
    this.socket = io("http://localhost:3001", {  });
    this.socket.emit("ready");

    this.socket.on("get client id", (clientID) => {
      // alert(clientID)
      this.setState({
        user: {
          _id: clientID
        }
      })
    })


    this.socket.on("listen message", (messages) => {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))

    })

  }


  onSend(messages = []) {
     this.socket.emit("send message", messages);
  }

  render() {
    return (
      <GiftedChat
       messages={this.state.messages}
       onSend={messages => this.onSend(messages)}
       user={this.state.user}
     />
    );
  }
}



export default App;
