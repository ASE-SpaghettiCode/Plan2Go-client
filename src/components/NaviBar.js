import '../styles/NaviBar.css'
import React, { useState } from 'react';

import { PlusCircleOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';
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
                            <a href={`/landing`}>
                                Post
                            </a>
                        ),
                        key: 'post',
                        href: `/home`,
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
        label: (
            <a href={`/landing`}>
                Following
            </a>
        ),
        key: 'following',
        icon: <TeamOutlined />,
    },
    {
        label: 'Setting',
        key: 'setting',
        icon: <SettingOutlined />,
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
        // window.location.href = items.find((item) => item.key === e.key)?.href;
        // window.location.href = `/home`;
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default NaviBar;