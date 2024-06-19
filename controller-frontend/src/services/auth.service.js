import restService from './rest.service';


const StorageItems = {
    token: "auth"
}

const service = {
    async authenticate(username, password) {
        let data = {
            username,
            password
        };

        return await restService.post('/auth', data);
    },

    async authenticateRefresh(token) {
        return await restService.put('/auth/refresh', null, token);
    },

    async authenticateDevice(token, deviceId) {
        return await restService.post(`/auth/${deviceId}`, null, token);
    },

    setAuthData(data) {
        localStorage.setItem(StorageItems.token, data.token);
    },
    
    getToken() {
        let data = localStorage.getItem(StorageItems.token);
        return data
    },

    cleanAuth() {
        localStorage.removeItem(StorageItems.token);
    }
}

export default service;
