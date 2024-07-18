

export const fetchCategory = async () => {
    try {
        const url = `https://localhost:7031/Category/get`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data
    }

    catch (err) {
        throw new Error("status Code is:" + err);
    }
}