import axios from "axios";

export const fetchPurchases = async (id) => {
    try {
        const response = await axios.get(`https://localhost:7031/Purchase/getById/${id}`);
        console.log(response.data);
        return response.data
    }

    catch (err) {
        throw new Error("status Code is:" + err);
    }
}

export const fetchCardsForCurrentPurchase = async (id) => {
    try {
        const response = await axios.get(`https://localhost:7031/Purchase/GetCardsByPId/${id}`);
        console.log(response.data);
        return response.data
    }

    catch (err) {
        throw new Error("status Code is:" + err);
    }
}
export const AddCardToCart = async (id) => {
    try {
        var card = {

            giftId: id,
            purchaseId: localStorage.getItem("purchaseId")
        }
        const response = await axios.post(`https://localhost:7031/Card/Add`, card).then((res) => {
            console.log(res.data);
            return res.data

        })

    }

    catch (err) {
        throw new Error("status Code is:" + err);
    }
}

export const fetchDeleteCard = async (id) => {
    try {
        const response = await axios.delete(`https://localhost:7031/Card/delete/${id}`)
        console.log(response.data);
        return response.data
    }
    catch (err) {
        throw new Error("Status code is:", + err)
    }
}
