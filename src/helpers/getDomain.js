/**
 * This helper function returns the current domain of the API.
 * If the environment is production, the production Heroku URL will be returned.
 * Otherwise, the link localhost:8080 will be returned (Spring server default port).
 * @returns {string}
 */
export const getDomain = (serverName) => {
    if (serverName === "user"){
        return 'http://localhost:8081';
    }else if (serverName === "note"){
        return 'http://localhost:8082';
    }else if (serverName === "post"){
        return 'http://localhost:8083';
    }
};

// export const getWebsocketDomain = () => {
//     return 'ws://localhost:8081';
    // return devUrl;
// }