import React from 'react';
import styles from '../css/SendMessageBox.css';

export default class SendMessageBox extends React.Component{

    clearReceiver(){
        
        document.getElementById("receiverUsername").innerHTML="";
        document.getElementById("receiverDiv").style.display="none";
    }
    submitForm(e){
        e.preventDefault();
        let messageInput=document.getElementById("messageInput").value;
        if(messageInput.length==0){
            document.getElementById("messageInput").focus();
            return;
        }
        let receiverUsername=document.getElementById("receiverUsername").innerHTML;
        this.props.sendMessage(receiverUsername,messageInput);
        this.clearReceiver();
    }


    render(){
       return( <div className={styles.sendMessageBox}>
       <form onSubmit={(e)=>{this.submitForm(e);}}>
            <input type="text" id="messageInput" className={styles.messageInput} autoComplete="off"/>
            <input type="submit" value="Send" className={styles.sendMessageButton}/><br/>

        </form>
            <div id="receiverDiv" className={styles.receiverDiv} style={{display:"none"}}>
            {"Receiver: "}
            <span id="receiverUsername" className={styles.receiverUsername}></span>
            <button onClick={()=>this.clearReceiver()} className={styles.clearReceiverButton}>X</button>
            </div>
        </div>);
    }
}
