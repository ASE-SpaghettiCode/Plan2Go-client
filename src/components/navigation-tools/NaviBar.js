import '../../styles/NaviBar.css'
import React, { useState,useEffect } from 'react';

import { MailOutlined, PlusCircleOutlined, HomeOutlined, UserOutlined, CompassOutlined } from '@ant-design/icons';
import { Menu, Badge, MenuProps  } from 'antd';
import { api, handleError } from "../../helpers/api";
import Mailbox from "./Mailbox"

import { useSubscription } from "react-stomp-hooks";

const myUserId = localStorage.getItem('id');

const doLogout = async () => {
    try {
        localStorage.clear();
        await api.put(`/users/checking/${myUserId}`);
    } catch (error) {
        alert(`Something went wrong during the logout: \n${handleError(error)}`);
    }
};


const NaviBar: React.FC = () => {
    // Due to an unresolved issue in a third-party library (AntD), we have disabled warnings about it.
    // see https://github.com/ant-design/ant-design/issues/26136
    const myError = console.error // copy the original function
    console.error = (msg) => { // override the original function
        if (!msg.includes("deprecated in StrictMode.")){
            myError(msg)
        }
    }

    const [current, setCurrent] = useState('');

    const [mailbox,setMailbox] = useState(false)
    const myUserId = localStorage.getItem('id');
    const [fetchTrigger, setFetchTrigger] = useState(false);
    const [notifications, setNotifications] = useState([])

    const initItems: MenuProps['items'] = (unreadNotificationNum) => [
        {
            label: (
                <a href={`/home`}>
                    Map
                </a>
            ),
            key: 'map',
            icon: <HomeOutlined />,
        },
        {
            label: 'Creation',
            key: 'creation',
            icon: <PlusCircleOutlined />,
            children: [
                {
                    type: 'group',
                    label: 'Create your',
                    children: [
                        {
                            label: (
                                <a href={`/post-creation`}>
                                    Post
                                </a>
                            ),
                            key: 'post',
                        },
                        {
                            label: (
                                <a href={`/travel-note-creation`}>
                                    Travel Note
                                </a>
                            ),
                            key: 'travelNote',
                        },
                    ],
                },
            ],
        },
        {
            label: 'Following',
            key: 'following',
            icon: <CompassOutlined />,
            children: [
                {
                    type: 'group',
                    label: 'Find my followers',
                    children: [
                        {
                            label: (
                                <a href={`/following/posts/${myUserId}`}>
                                    Post
                                </a>
                            ),
                            key: 'follower post',
                        },
                        {
                            label: (
                                <a href={`/following/travel-notes/${myUserId}`}>
                                    Travel Note
                                </a>
                            ),
                            key: 'follower travelNote',
                        },
                    ],
                },
            ],
        },
        {
            label: (
                <Badge count={unreadNotificationNum} offset={[9,-2]}>
                    <a href="#" >
                        Mailbox
                    </a>
                </Badge>
            ),
            key: 'mailbox',
            icon: <MailOutlined />,
        },
        {
            label: 'Account',
            key: 'setting',
            icon: <UserOutlined />,
            children: [
                {
                    type: 'group',
                    children: [
                        {
                            label: (
                                <a href={`/users/${myUserId}`}>
                                    My Profile
                                </a>
                            ),
                            key: 'userProfile',
                        },
                        {
                            label: (
                                <a href={`/landing`} onClick={doLogout}>
                                    Logout
                                </a>
                            ),
                            key: 'logout',
                        },
                    ],
                },
            ],
        },
    ];

    const [items, setItems] = useState(initItems(0));



    const onClick: MenuProps['onClick'] = async (e) => {
        if (e.key === 'mailbox') {
            const notificationsResponse = await api.get(`/notifications/${myUserId}`)
            setNotifications(notificationsResponse.data);
            setMailbox(!mailbox);
        }
        setCurrent(e.key);
    };

    const onDeleteAll = async () => {
        await api.delete(`/notifications/${myUserId}`);
        setItems(initItems(0))
        setNotifications([]);
    };

    useEffect(() => {
        async function fetchNotification(){
            const notificationsResponse = await api.get(`/notifications/${myUserId}`)
            setNotifications(notificationsResponse.data);


            const unreadNotificationNum = notificationsResponse.data.reduce((accumulator, notification) => {
                return accumulator + (!notification.read ? 1 : 0);
            }, 0);

            console.log("there are "+unreadNotificationNum+" unread message"); // displays the number of unread notifications

            setItems(initItems(unreadNotificationNum))
        }
        fetchNotification().then().catch((err) => console.log(err))
    },[fetchTrigger])

    useSubscription(`/mailbox/${myUserId}/fetch`, () => {
        setFetchTrigger(!fetchTrigger);
    });

    return (
        <div>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
                collapsedWidth={1000}
            />
            {(mailbox && <Mailbox setMailbox={setMailbox} notifications={notifications} deleteAll={onDeleteAll}/>)}
        </div>
    );
};

export default NaviBar;