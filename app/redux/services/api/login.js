import { ApiClient } from './config';

const client = new ApiClient();

const oauth = 'auth/';

export default {
    auth: {
        async getLogin(data) {
            const response = await client.post(`${oauth}login`, data);
            return response;
        }
    }
}