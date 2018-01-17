import React from 'react';
import styles from '../css/ActiveUsersBox.css';

export default class ActiveUsersBox extends React.Component{


    render(){
        return (<div id="ActiveUsersBox" className={styles.activeUsersBox}>
                    <div className={styles.activeUsersBoxHeader}>
                        {"Users online"}
                    </div>
                    {Object.values(this.props.users)}
                </div>);
    }
}