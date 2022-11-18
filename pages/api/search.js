import axios from 'axios';
import {Server} from './index';

export const searchAPI = async(query) => {
    try {
        const result = await Server.get(`search?query=${query}`);
        return result.data.hits;
    } catch (error) {
        console.log(error);
    }
}

export const searchById = async(postid) => {
    try {
        const result = await Server.get(`items/${postid}`);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}