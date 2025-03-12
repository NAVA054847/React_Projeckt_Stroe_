import {produce} from 'immer'


export const mystore={
listshop:[
]
}



export const datashopreducer=produce((state,action)=>{
 switch(action.type){
case "ADDSHOP":{state.listshop.push(action.payload);}
break
// case "GETSHOPBYCUST":{ state.listshop=state.listshop.filter(x=>x.codeCustomer===action.payload)}
case "GETSHOPBYCUST": { state.listshop = action.payload;}
///זה היה השיוני!
//ב"ה

break;

default:
break;
}
},mystore)
