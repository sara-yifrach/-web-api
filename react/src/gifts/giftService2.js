import axios from "axios";

export const fetchGifts = async () => {
    try {
        const url = `https://localhost:7031/Gift/get`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data
    }

    catch (err) {
        throw new Error("status Code is:" + err);
    }
}

export const fetchAddGift = async (gift) => {

    await axios.post("https://localhost:7031/Gift/Add", gift).then((res) => {
        debugger
        return res.data
    })

}

export const fetchUpdateGift = async (id,gift) => {
    debugger
    await axios.put("https://localhost:7031/Gift/Update?id="+id, gift).then((res) => {
        debugger
        return res.data
    })
}

export const fetchDeleteGift = async (id) => {
    await axios.delete(`https://localhost:7031/Gift/delete/${id}`)
}


export const fetchSearchbyNameOfGift = async (name) => {
    try {
       const res =  await axios.get(`https://localhost:7031/Gift/getbyname/${name}`);
           console.log("giftbyname:",res.data);  
           debugger
           return res.data
        }
       
    
    catch (err) {
        throw new Error("status Code is:" + err);
    }
}
export const addNewPurchase = async () =>
    {
        try {

            var p = {
                
                    status: false,
                    costumerId: localStorage.getItem("CostumerId")               
            }
            
            console.log();
            await axios.post(`https://localhost:7031/Purchase/add`,p).then((res)=>{
                localStorage.setItem("purchaseId",res.data.id)
                console.log(res.data);
                return res.data
            })
        }
    
        catch (err) {
            throw new Error("status Code is:" + err);
        }
    }
    export const GetExistPurchase = async () =>
    {
        try {          
            var Cid = localStorage.getItem("CostumerId")
            console.log("guj",Cid);
            var p = await axios.get(`https://localhost:7031/Purchase/GetExistPurchase/${Cid}`)
                p.data ? localStorage.setItem("purchaseId",p.data.id) : addNewPurchase() 
                console.log("opsss");          
                console.log(p.data);             
                return p.data
            
        }
        catch (err) {
            throw new Error("status Code is:" + err);
        }
    }
    export const changeStatusById = async () =>
    {
        try {          
            var pid = localStorage.getItem("purchaseId")
            console.log("guj",pid);
            var p = await axios.put(`https://localhost:7031/Purchase/changeStatus/${pid}`)
                var res = p.data 
                console.log(res);                        
                return p.data           
        }
        catch (err) {
            throw new Error("status Code is:" + err);
        }
    }

    export const fetchsearchByDName = async (D) =>
        {
            try {          
                var p = await axios.get(`https://localhost:7031/Gift/getbydonatorN/${D}`)
                    var res = p.data 
                    console.log(res);                        
                    return p.data           
            }
            catch (err) {
                throw new Error("status Code is:" + err);
            }
        }

