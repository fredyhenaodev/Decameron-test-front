import { ApiClient } from './config';

const client = new ApiClient();

const hotel = 'hotel/';
const room = 'room/';

export default {
    hotel: {
        async getHotels() {
            const response = await client.get(`${hotel}index`);
            return response;
        },
        async setDeleteHotel(item) {
            const response = await client.delete(`${hotel}delete/${item}`)
            return response;
        }, 
        async setCreateHotel(item) {
            const response = await client.post(`${hotel}store`, item);
            return response;
        },
        async setUpdateHotel(item) {
            const response = await client.put(`${hotel}update/${item.id}`, item)
            return response;
        },
        async getHotel(item) {
            const response = await client.get(`${hotel}show/${item}`)
            return response;
        },
        async setCreateRoom(item) {
            const response = await client.post(`${hotel}room/store`, item)
            return response;
        }
    },
    room: {
        async getRooms () {
            const response = await client.get(`${room}index`);
            return response;
        },
        async getAccommodations (item) {
            const response = await client.get(`${room}accommodations/${item}`);
            return response;
        }
    }
}