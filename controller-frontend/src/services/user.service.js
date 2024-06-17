import restService from './rest.service';

const service = {
    async getUser(token) {
        return await restService.get('/user', token);
    },
    async createUser(name, username, password) {
        let data = {
            name,
            username,
            password
        };

        return await restService.post('/user', data);
    }
};

export default service;
