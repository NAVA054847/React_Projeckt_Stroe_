import {produce} from 'immer'

export const mystore={
    listCust:[],
    currentCustomer:null,
}




export const datacustreducer=produce((state,action)=>{
 switch(action.type){
// case "ADD_USER":{state.listCust.push(action.payload);}
// break;

case "GETCUST": {
     if (action.payload) {
        state.currentCustomer = action.payload; 
    } else {
        state.currentCustomer = null;
    }
}
break;
case "ADDCUST":{state.listCust.push(action.payload);}

default:
break;
}
},mystore)