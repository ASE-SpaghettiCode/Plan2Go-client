import '../styles/NaviBar.css'
import React, { useState } from 'react';

import { PlusCircleOutlined, HomeOutlined, UserOutlined, CompassOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {api, handleError} from "../helpers/api";

const myUserId = localStorage.getItem('id');

const doLogout = async () => {
    try {
        await api.put(`/users/checking/${myUserId}`);
        localStorage.clear();
    } catch (error) {
        alert(`Something went wrong during the logout: \n${handleError(error)}`);
    }
};

const items: MenuProps['items'] = [
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
                            <a href={`/landing`}
                            onClick={doLogout}>
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

const NaviBar: React.FC = () => {
    const [current, setCurrent] = useState('');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default NaviBar;