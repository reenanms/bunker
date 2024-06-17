import restService from './rest.service';

const service = {
    async getAllSchemas(token) {
        return await restService.get('/schema', token);
    },
    async getSchema(token, name) {
        return await restService.get(`/schema/${name}`, token);
    },
    async createSchemaBasic(token, name, hasQuotes, regexValidator) {
        let data = {
            name,
            type: "BASIC",
            definition: {
                type: hasQuotes ? "QUOTES" : "NO_QUOTES",
                regexValidator
            }
        };

        return await restService.post('/schema', data, token);
    },
    async createSchemaArray(token, name, schema) {
        let data = {
            name,
            type: "ARRAY",
            definition: {
                schema
            }
        };

        return await restService.post('/schema', data, token);
    },
    //properties = [ {name, schema, regexValidator} ]
    async createSchemaObject(token, name, properties) {
        let data = {
            name,
            type: "OBJECT",
            definition: properties
        };

        return await restService.post('/schema', data, token);
    },
    async updateSchemaBasic(token, name, hasQuotes, regexValidator) {
        let data = {
            type: "BASIC",
            definition: {
                type: hasQuotes ? "QUOTES" : "NO_QUOTES",
                regexValidator
            }
        };

        return await restService.put(`/schema/${name}`, data, token);
    },
    async updateSchemaArray(token, name, schema) {
        let data = {
            type: "ARRAY",
            definition: {
                schema
            }
        };

        return await restService.put(`/schema/${name}`, data, token);
    },
    //properties = [ {name, schema, regexValidator} ]
    async updateSchemaObject(token, name, properties) {
        let data = {
            type: "OBJECT",
            definition: properties
        };

        return await restService.put(`/schema/${name}`, data, token);
    },
    async deleteSchema(token, name) {
        return await restService.delete(`/schema/${name}`, token);
    }
};

export default service;
