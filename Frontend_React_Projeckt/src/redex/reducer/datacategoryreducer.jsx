import { produce } from 'immer'


export const mystore = {
     listCategory: []
}



export const datacategoryreducer = produce((state, action) => {
     switch (action.type) {
          case "ADD_CATEGORY": { state.listCategory.push(action.payload); }
               break;
          case "DELLCATEGORY": { state.listCategory = state.listCategory.filter(x => x._id !== action.payload); }
               break;
          case "ONLOADCATEGORY": state.listCategory = action.payload
               break;
               
          case "UPDATEFCATEGORY": {
               let index = state.listCategory.findIndex(x => x._id === action.payload._id)
               state.listCategory[index].isActive = !state.listCategory[index].isActive
          }
               break;
          case "SET_LISTCATEGORY": {
               debugger
               return { ...state, listCategory: action.payload, };
          }
               break;

          case "UPDATE_CATEGORY": {
               const index = state.listCategory.findIndex((u) => u._id === action.payload._id);
               if (index !== -1) {
                    return {
                         ...state,
                         listCategory: state.listCategory.map((item, i) =>
                              i === index ? action.payload : item
                         ),
                    };
               }
               return state;
          }

               break;

          default:
               break;
     }
}, mystore)
