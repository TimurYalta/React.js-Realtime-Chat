import React from 'react';
import UserLink from './UserLink';
import styles from '../css/Message.css';
export default class Message extends React.Component{
    
    render(){
        
        if(this.props.receiver){
            return(<tr>
                <td name="sender" className={styles.sender}>{<UserLink UserName={this.props.sender}/>}</td>
                <td name="receiver" className={styles.receiver}>{<UserLink UserName={this.props.receiver}/>}</td>
                <td name="message" className={styles.message}>{this.props.message}</td>
                <td name="status" className={styles.status}>{this.props.status}</td>
            </tr>);
        }
        else{
            return(<tr>
                <td name="sender" className={styles.sender}>{<UserLink UserName={this.props.sender}/>}</td>
                <td name="message" colSpan="2" className={styles.message}>{this.props.message}</td>
                <td name="status" className={styles.status}>{this.props.status}</td>
            </tr>);
        }
    }
}