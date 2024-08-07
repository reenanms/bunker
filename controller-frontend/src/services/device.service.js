import restService from './rest.service';

const service = {
    async getAllDevices(token) {
        return await restService.get('/device', token);
    },
    async getDevice(token, id) {
        return await restService.get(`/device/${id}`, token);
    },
    async getDeviceData(token, id) {
        return await restService.get(`/device/${id}/data`, token);
    },
    async getDeviceTokens(token, id) {
        return await restService.get(`/device/${id}/token`, token);
    },
    async createDevice(token, name, deviceModelId) {
        let data = {
            name,
            deviceModelId
        };

        return await restService.post('/device', data, token);
    },
    async updateDevice(token, id, name, deviceModelId) {
        let data = {
            name,
            deviceModelId
        };

        return await restService.put(`/device/${id}`, data, token);
    },
    async deleteDevice(token, id) {
        return await restService.delete(`/device/${id}`, token);
    }
};

export default service;
