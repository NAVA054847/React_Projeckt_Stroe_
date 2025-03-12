//import { type } from "@testing-library/user-event/dist/type";
import userEvent from '@testing-library/user-event';



export const additemtocart = (item) => {
    alert("נוסף בהצלחה")
    return { type: "ADDTOCART", payload: item };
}

export const setcurrentuser=(item)=>{
    // alert( "hello to: "+item.name+"your pass is: "+item.pass)
    return {type:"SETCURRENTUSER",payload:item}
}


export const dellitem=(item)=>{
    return {type:"DELLITEM",payload:item}
}



export const editsumcartmore=(item)=>{
return {type:"EDITSUMCARTMORE",payload:item}
}

export const editsumcartless=(item)=>{
    return {type:"EDITSUMCARTLESS",payload:item}
}


////////////////////////////////////////////////////////////
export const onloadcatregory=(data)=>{
    return {type:"ONLOADCATEGORY",payload:data}
}

export const add_Category = (item) => {
    alert("הקטגוריה נוסף בהצלחה")
    debugger
    return { type: "ADD_CATEGORY", payload: item };
}

export const dellcategory=(item)=>{
    return {type:"DELLCATEGORY",payload:item}
}

export const onloadgame=(item)=>{
    return {type:"ONLOADGAME",payload:item}
}
export const addgame = (item) => {
    alert("המשחק נוסף בהצלחה")
    return { type: "ADDGAME", payload: item };
}

export const dellgame=(item)=>{
    alert("נמחק")
    return {type:"DELLGAME",payload:item}
}

export const getcust=(item)=>{
    return {type:"GETCUST",payload:item}
}
export const addcust=(item)=>{
    return {type:"ADDCUST",payload:item}
}
export const addshop=(item)=>{
    return {type:"ADDSHOP",payload:item}
}
export const getshopsbycust=(item)=>{
    return {type:"GETSHOPBYCUST",payload:item}
}
// export const updatefcategory=(item)=>{
// return{type:"UPDATEFCATEGORY",payload:item}
// }

export const update_category=(item)=>{
    debugger
    return {type:"UPDATE_CATEGORY",   payload:  item }
    
}
export const set_listCategory=(item)=>{
    return {type:"SET_LISTCATEGORY",payload:item}
}
export const update_game = (item) => {
    return { type: "UPDATE_GAME", payload: item,};
};
export const getGbyCategoryId=(item)=>{
    return {type:"GETBYCATEGORYID",payload:item}
}



