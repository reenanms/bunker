import restService from './rest.service';

const service = {
    async getDashboardConfig(token) {
        return await restService.get(`/dashboard/config`, token);
    },
    async createDashboardConfig(token, config) {
        return await restService.post('/dashboard/config', config, token);
    },
    async updateDashboardConfig(token, config) {
        return await restService.put(`/dashboard/config`, config, token);
    },
};

export default service;
