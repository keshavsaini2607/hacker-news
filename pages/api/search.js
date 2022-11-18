import axios from 'axios';

export const searchAPI = async(query) => {
    try {
        const result = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
        return result.data.hits;
    } catch (error) {
        console.log(error);
    }
}