import '../styles/NaviBar.css'
import React, { useState } from 'react';

import { PlusCircleOutlined, TeamOutlined, SettingOutlined, UserOutlined, CompassOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const myUserId = localStorage.getItem('id');

const items: MenuProps['items'] = [
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
                            <a href={`/landing`}>
                                Post
                            </a>
                        ),
                        key: 'follower post',
                    },
                    {
                        label: (
                            <a href={`/travel-note-creation`}>
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
                            <a href={`/landing`}>
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