import restService from './rest.service';

const service = {
    async getAllDeviceModels(token) {
        return await restService.get('/deviceModel', token);
    },
    async getDeviceModel(token, id) {
        return await restService.get(`/deviceModel/${id}`, token);
    },
    async createDeviceModel(token, name, description, schemaName) {
        let data = {
            name,
            description,
            schemaName
        };

        return await restService.post('/deviceModel', data, token);
    },
    async updateDeviceModel(token, id, name, description, schemaName) {
        let data = {
            name,
            description,
            schemaName
        };

        return await restService.put(`/deviceModel/${id}`, data, token);
    },
    async deleteDeviceModel(token, id) {
        return await restService.delete(`/deviceModel/${id}`, token);
    }
};

export default service;
