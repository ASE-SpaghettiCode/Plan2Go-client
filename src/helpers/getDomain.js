/**
 * This helper function returns the current domain of the API.
 * If the environment is production, the production Heroku URL will be returned.
 * Otherwise, the link localhost:8080 will be returned (Spring server default port).
 * @returns {string}
 */
export const getDomain = () => {
    return 'http://localhost:8081';
};

// export const getWebsocketDomain = () => {
//     return 'ws://localhost:8081';
    // return devUrl;
// }