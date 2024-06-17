import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

function getConfig(token) {
    if (!token)
        return undefined;

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
}

const service = {
    async post(route, data, token) {
        const endpoint = `${apiUrl}${route}`;
        const config = getConfig(token);
        const res = await axios.post(endpoint, data, config);
        return res.data;
    },
    async put(route, data, token) {
        const endpoint = `${apiUrl}${route}`;
        const config = getConfig(token);
        const res = await axios.put(endpoint, data, config);
        return res.data;
    },
    async get(route, token) {
        const endpoint = `${apiUrl}${route}`;
        const config = getConfig(token);
        const res = await axios.get(endpoint, config);
        return res.data;
    },
    async delete(route, token) {
        const endpoint = `${apiUrl}${route}`;
        const config = getConfig(token);
        const res = await axios.delete(endpoint, config);
        return res.data;
    }
};

export default service;
