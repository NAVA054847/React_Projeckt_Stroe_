import axios from "axios";

const url="http://localhost:8080/shop"

export const addnewshop=(obj)=>{
return axios.post(`${url}/add`,obj)
}

export const getshopbyidcust=(id)=>{
return axios.get(`${url}/getbyid/${id}`)
}



// export default addnewshop;