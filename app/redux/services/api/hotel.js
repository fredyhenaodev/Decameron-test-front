import { ApiClient } from './config';

const client = new ApiClient();

const hotel = 'hotel/';

export default {
    hotel: {
        async getHotels() {
            const response = await client.get(`${hotel}index`);
            return response;
        },
        async setDeleteHotel(item) {
            const response = await client.delete(`${hotel}delete/${item}`)
            return response;
        }
    }
}