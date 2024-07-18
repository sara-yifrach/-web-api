import axios from "axios";

export const logInByUserNameAndPassword = async (name, password) => {
    try {
        const user = {
            "name": name,
            "password": password
        }
        localStorage.setItem("CostumerName",name)
        const response = await axios.post('https://localhost:7031/Costumer/post/login',user)
        return response

    }
    catch (err) {
        alert(err)
        return null;
    }
}

// export const fetchId = async (name) =>
// {
//     try {
//         console.log(name);
//         const res = await axios.get(`https://localhost:7031/Costumer/getIdByName/${name}`);
//         console.log(res.data);
//         return res.data
//     }

//     catch (err) {
//         throw new Error("status Code is:" + err);
//     }
// }


