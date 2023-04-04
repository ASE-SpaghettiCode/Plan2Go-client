import axios from 'axios';
import { getDomain } from './getDomain';

export const api = axios.create({
    baseURL: getDomain("user"),
    headers: { 'Content-Type': 'application/json' }
});

export const api_note = axios.create({
    baseURL: getDomain("note"),
    headers: { 'Content-Type': 'application/json' }
});

export const api_posts = axios.create({
    baseURL: getDomain("post"),
    headers: { 'Content-Type': 'application/json' }
});

console.log(getDomain("note"))

export const handleError = error => {
    const response = error.response;

    // catch 4xx and 5xx status codes
    if (response && !!`${response.status}`.match(/^[4|5]\d{2}$/)) {
        let info = `\nrequest to: ${response.request.responseURL}`;

        if (response.data.status) {
            info += `\nstatus code: ${response.data.status}`;
            info += `\nerror: ${response.data.error}`;
            info += `\nerror message: ${response.data.message}`;
        } else {
            info += `\nstatus code: ${response.status}`;
            info += `\nerror message:\n${response.data}`;
        }

        console.log('The request was made and answered but was unsuccessful.', error.response);
        window.location.href = `/home`;
        return info;
    } else {
        if (error.message.match(/Network Error/)) {
            alert('The server cannot be reached.\nDid you start it?');
        }

        console.log('Something else happened.', error);
        return error.message;
    }
};
