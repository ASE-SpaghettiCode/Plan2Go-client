import React from 'react'
import '../../styles/Mailbox.css';
import {List,Button} from 'antd';

function Mailbox(props){

    const getNotificationItem = (notification) => {
        const { actorId, actorName, targetType, method, context, ownerId } = notification;
        let naviUrl : String


        switch (method) {
            case 'like':
                naviUrl = (targetType !== "post") ? `/users/${ownerId}` : `/users/${ownerId}?tab=posts`
                return (
                    <div className="notificationItem">
                        <a href={`/users/${actorId}`}>{actorName}</a> likes your <a href={naviUrl}>{targetType}</a>
                    </div>
                );
            case 'comment':
                naviUrl = (targetType !== "post") ? `/users/${ownerId}` : `/users/${ownerId}?tab=posts`
                return (
                    <div className="notificationItem">
                        <a href={`/users/${actorId}`}>{actorName}</a> comments on your <a href={naviUrl}>{targetType}</a>: {context}
                    </div>
                );
            case 'follow':
                return (
                    <div className="notificationItem">
                        <a  href={`/users/${actorId}`}>{actorName}</a> follows you
                    </div>
                );
            default:
                return (
                    <div className="notificationItem" />
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
                <div className="button-panel">
                    <Button type="text" onClick={props.deleteAll}>delete all</Button>
                    <Button type="text" onClick={()=>props.setMailbox(false)}>close</Button>
                </div>
            </div>
        </div>
    )
}

export default Mailbox;
