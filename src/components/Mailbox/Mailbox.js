import React from 'react'
import '../../styles/Mailbox.css';
import {List} from 'antd';
import {Header} from "antd/es/layout/layout";
import Item from "antd/es/list/Item";
import {api} from "../../helpers/api";

function Mailbox(props){

    const getNotificationItem = (notification) => {
        const { actorName, targetType, method, context } = notification;

        switch (method) {
            case 'like':
                return (
                    <div className="notificationItem">
                        <a>{actorName}</a> likes your <a>{targetType}</a>
                    </div>
                );
            case 'comment':
                return (
                    <div className="notificationItem">
                        <a>{actorName}</a> comments on your <a>{targetType}</a>: {context}
                    </div>
                );
            case 'follow':
                return (
                    <div className="notificationItem">
                        <a>{actorName}</a> follows you
                    </div>
                );
            default:
                return (
                    <div className="notificationItem">
                        <a>{context}</a>
                    </div>
                );
        }
    };


    const notificationsList = props.notifications.map((notification)=>
        <div>
            {getNotificationItem(notification)}
        </div>
    );

    return (
        <div className="overlay">
            <div className="mailbox">
                <List className="mailbox-inner"
                      header={<h5>Notifications</h5>}
                      bordered
                      dataSource={notificationsList}
                      renderItem={(item) => <List.Item>{item}</List.Item>}
                />

                <div className="close-btn">
                    <button onClick={props.deleteAll}>Delete All</button>
                </div>
                <div className="close-btn">
                    <button onClick={()=>props.setMailbox(false)}>close</button>
                </div>

            </div>
        </div>
    )
}


export default Mailbox;
