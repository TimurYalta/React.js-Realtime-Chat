import React from 'react';
import styles from '../css/UserLink.css';
export default class UserLink extends React.Component {

        clickPerson(userName) {
            document.getElementById("receiverDiv").style.display = "block";
            document.getElementById("receiverUsername").innerHTML = userName;
            document.getElementById("messageInput").focus();
        }


        render() {
            return ( < div className = {
                    styles.userLink
                }
                onClick = {
                    () => {
                        this.clickPerson(this.props.UserName)
                    }
                }> 
                {
                    this.props.UserName
                } < /div>);
            }
        }