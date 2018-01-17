import React from 'react';
import styles from "../css/LoginBox.css"
export default class LoginBox extends React.Component{
    

        submitLoginForm(e){
            e.preventDefault();
            let userName=document.getElementById("userNameInput").value;
            this.props.login(userName);
        
        }

    render(){
     
        if(this.props.isLoggedIn==false){
            
            return( 
                <div className={styles.loginBox}>
                        {"Login in order to join chat"}
                        <form onSubmit={(e)=>{this.submitLoginForm(e)}}>
                        
                            <input type="text" id="userNameInput" className={styles.userNameInput} autoComplete="off" maxLength="10" required/>

                            <input type="submit" value="Login" id="loginButton" className={styles.loginButton}/>
                            
                    </form>
                    
                    </div>
            );
        }
        else{
            return(
                <div className={styles.loginBox}>
                    <p> You are now logged in as: {this.props.userName}</p>
                    <button id="logoutButton" type="button" className={styles.loginButton} 
                    onClick={
                        ()=>{
                            this.props.logout();
                        }
                    }>
                    Logout
                    
                    
                     </button>
                </div>
            );
    }

    }


}