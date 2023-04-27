import React from 'react';
import {BookOutlined, DownOutlined, UserOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Button, Dropdown, Input, Space} from 'antd';
import {useState} from "react";
import {api, api_note} from "../helpers/api";

const SearchBox: React.FC = () => {
    const [current, setCurrent] = useState('User');
    const [requestServer, setRequestServer] = useState(api);

    const {Search} = Input;

    function doClickUser() {
        setCurrent('User');
        setRequestServer(api);
    }

    function doClickNote() {
        setCurrent('Note');
        setRequestServer(api_note);
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (<a onClick={doClickUser}> User</a>),
            icon: <UserOutlined/>
        },
        {
            key: '2',
            label: (<a onClick={doClickNote}> Note</a>),
            icon: <BookOutlined/>
        },
    ];
    return (
        <div style={{flexGrow: 1, display: 'flex', alignItems: 'center', marginTop:15}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Dropdown
                    menu={{
                        items,
                        selectable: true,
                        defaultSelectedKeys: ['1'],
                    }}
                >
                    <Button>
                        <Space>
                            {current}
                            <DownOutlined/>
                        </Space>
                    </Button>
                </Dropdown>
                <Search
                    placeholder="input search text"
                    // onSearch={onSearch}
                    style={{
                        width: 200,
                    }}
                />
            </div>
        </div>
    )
};

export default SearchBox;