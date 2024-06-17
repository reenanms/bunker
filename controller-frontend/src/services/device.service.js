import restService from './rest.service';

const service = {
    async getAllDevices(token) {
        return await restService.get('/device', token);
    },
    async getDevice(token, id) {
        return await restService.get(`/device/${id}`, token);
    },
    async createDevice(token, id, deviceModelId) {
        let data = {
            id,
            deviceModelId
        };

        return await restService.post('/device', data, token);
    },
    async updateDevice(token, id, deviceModelId) {
        let data = {
            deviceModelId
        };

        return await restService.put(`/device/${id}`, data, token);
    },
    async deleteDevice(token, id) {
        return await restService.delete(`/device/${id}`, token);
    }
};

export default service;
