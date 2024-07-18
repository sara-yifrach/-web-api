import axios from "axios";

 export const getAllCardsTrueForGiftId = async (id) =>
{
    try {
        const response = await axios.get(`https://localhost:7031/Card/getForGift/${id}`);
        console.log(response.data);
        return response.data
    }   
    catch (err) {
        throw new Error("status Code is:" + err);
    }
}
export const fetchWinner = async (giftid) =>
    {
        try {
            const response = await axios.get(`https://localhost:7031/Gift/drawWinner/${giftid}`);
            console.log(response.data);
            return response.data
        }   
        catch (err) {
            throw new Error("status Code is:" + err);
        }
    }

