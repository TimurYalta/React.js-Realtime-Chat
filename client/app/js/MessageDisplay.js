import React from 'react';
import styles from '../css/MessageDisplay.css';

export default class MessageDisplay extends React.Component{


render(){
    return(
    <div className={styles.messageDisplay} id="messageDisplayDiv">
        <table className={styles.messageTable}>
            <tbody id="MessageDisplay">
            {this.props.messages}
            </tbody>

            </table>
        <div id="MessageDisplayStatus"></div>
    </div>
    );

}


}