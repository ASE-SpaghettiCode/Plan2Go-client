import React, {useEffect} from 'react';
import {BookOutlined, DownOutlined, UserOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Button, Dropdown, Select, Space} from 'antd';
import {useState} from "react";
import {api, api_note, handleError} from "../helpers/api";
import {object} from "prop-types";
import {set} from "@cloudinary/url-gen/actions/variable";

const SearchBox: React.FC = () => {
    const [current, setCurrent] = useState('User');
    const [requestServer, setRequestServer] = useState(api);
    const [userSearchTerm, setUserSearchTerm] =useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [options, setOptions] = useState([])
    async function fetchResults() {
        if (current === 'User') {
            try {
                const response = await api.get('/users/');
                const results = response.data.map(d => ({label: d.username, value: d.userId}))
                setOptions(results)
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        } else {
            try {
                const response = await api_note.get('/notes/');
                console.log(response.data)
            } catch (error) {
                console.error(`Something went wrong while fetching the notes: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the notes! See the console for details.");
            }
        }
    }
    fetchResults();

    const handleSelection = (value: string) => {
        window.location.href = `/users/` + value;
    }
    async function doClickUser() {
        setCurrent('User');
        setRequestServer(api);
        fetchResults();
    }

    async function doClickNote() {
        setCurrent('Note');
        setRequestServer(api_note);
        fetchResults();
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
                <Select
                    listHeight={160}
                    showSearch
                    placeholder="search user"
                    optionFilterProp="children"
                    onSelect={handleSelection}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={options}
                    style={{width: 200}}
                />
            </div>
        </div>
    )
};

export default SearchBox;