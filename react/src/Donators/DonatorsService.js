import axios from "axios";
import { fetchGifts } from "../gifts/giftService2";
axios.interceptors.request.use(
    (config)=>{
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        if(user){
            config.headers['Authorization']=`Bearer ${user.token}`
        }
        return config;
    },
    (error)=>{return Promise.reject(error)}
)

export const fetchDonators = async () => {
    try {
    //   console.log(localStorage.getItem("user"))
        const url = `https://localhost:7031/Donator/get`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data
    }

    catch (err) {
        throw new Error("status Code is:" + err);
    }
}

export const DeleteDonator = async (id) =>
    {
        try {
            const response = await axios.delete(`https://localhost:7031/Donator/delete/${id}`);
            console.log(response.data);
            return response.data
        }   
        catch (err) {
            throw new Error("status Code is:" + err);
        }
    }


 export const fetchAddDonator = async(donator)=>{
    try {    
     await axios.post('https://localhost:7031/Donator/Add', donator).then((response)=>{debugger
         return response.data})
    }   
    catch (err) {
        throw new Error("status Code is:" + err);
    }
 }
//  export const fetchCheckEmail= async(e)=>{
//     try {

//      var res = await axios.get(`https://localhost:7031/Donator/IsValidEmail/${e}`)
//      return res.data
//     }   
//     catch (err) {
//         throw new Error("status Code is:" + err);
//     }
//  }

export const fetchEditDonator = async(id,donator)=>{
    try {    

     await axios.put("https://localhost:7031/Donator/update?id="+id, donator).then((response)=>{debugger
         return response.data})
    }   
    catch (err) {
        throw new Error("status Code is:" + err);
    }
 }

 export const GetDonatorByGift = async(giftName)=>{
    try {    
     var res = await axios.get(`https://localhost:7031/Donator/GetDonatorByGift/${giftName}`)
         return res.data
    }   
    catch (err) {
        throw new Error("status Code is:" + err);
    }
 }


