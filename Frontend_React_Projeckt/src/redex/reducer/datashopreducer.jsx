import {produce} from 'immer'


export const mystore={
listshop:[
]
}



export const datashopreducer=produce((state,action)=>{
 switch(action.type){
case "ADDSHOP":{state.listshop.push(action.payload);}
break

case "GETSHOPBYCUST": { state.listshop = action.payload;}


break;

default:
break;
}
},mystore)
