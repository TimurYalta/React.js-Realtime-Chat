import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import LoginBox from './LoginBox';
import MessageDisplay from './MessageDisplay';
import Message from './Message';
import SendMessageBox from './SendMessageBox';
import UserLink from './UserLink';
import ActiveUsersBox from './ActiveUsersBox';
import io from "socket.io-client";
import {
    relative
} from 'path';

import styles from '../css/App.css';

const socket = io('http://localhost:3000/');

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.putMessage = this.putMessage.bind(this);
        this.state = {
            isLoggedIn: false,
            messages: [],
            messageNumber: 0,
            userName: "",
            users: {}
        };

    }
    /**
     *  Setting listeners for the events
     */
    componentDidMount() {
        socket.on("connected", () => {
            console.log("You have been connected to the chat");
        });

        socket.on("disconnect", () => {
            console.log("disconnected");
            this.setState({
                isLoggedIn: false,
                userName: "",
                users: {}
            });
        });

        socket.on("users", (users) => {
            let currentUsersArray = [];
            users.forEach(element => {

                let user = < UserLink UserName = {
                    element
                }
                clickPerson = {
                    this.clickPerson
                }
                />
                currentUsersArray[element] = user;
            });
            this.setState({
                users: currentUsersArray
            });
        });

        socket.on("messages", (messages) => {
            messages.forEach(element => {
                this.putMessage(element);
            });

        });

        socket.on("msg", (msg) => {
            this.putMessage(msg);

        });

        socket.on('login', (msg) => {

            if (msg.res == "success") {
                this.setState({
                    isLoggedIn: true,
                    userName: msg.value
                });
                console.log(`logged in as ${msg.value}`);
            } else {
                alert(`Sorry the login ${msg.value} already exists. Try another one!`);
                console.log(`login unsuccessful`);
            }
        });

        socket.on("logout", (msg) => {
            this.setState({
                isLoggedIn: false,
                userName: ""
            });
            console.log("Logged out");
        });
    }


    putMessage(message) {

        let messageElement = < Message sender = {
            message.sender
        }
        receiver = {
            message.receiver
        }
        message = {
            message.message
        }
        status = {
            message.status
        }
        key = {
            this.state.messageNumber + 1
        }
        />;
        let curState = this.state.messages;
        curState.push(messageElement);
        this.setState({
            messages: curState,
            messageNumber: this.state.messageNumber + 1
        });
        var div = document.getElementById("messageDisplayDiv");
        div.scrollTop = div.scrollHeight - div.clientHeight;
    }

    sendMessage(receiverUsername, text) {
        let userName = this.state.userName;
        let MessageObject = {
            sender: userName,
            receiver: receiverUsername,
            message: text
        };

        socket.emit('message', MessageObject);
        document.getElementById("messageInput").value = "";
    }

    login(value) {
        if (value.length == 0) {
            return false;
        } else {
            socket.emit('login', value);
        }
    }

    logout() {
        socket.emit('logout', this.state.userName);
    }



    render() {
        return (<div className={styles.appContainer}> 
        
                    < Header / >

                    <div className={styles.messageDiv}>
                         <MessageDisplay messages={this.state.messages}/ >
                        {this.state.isLoggedIn?<SendMessageBox sendMessage={this.sendMessage}/>:null}
                    </div>
            
                    <div className={styles.sideBar}>
                        <LoginBox login = {this.login} logout = {this.logout} userName={this.state.userName} isLoggedIn={this.state.isLoggedIn}/> 
                        <ActiveUsersBox users={this.state.users}/>
                    </div>
            
                </div>
            );

    }


}
