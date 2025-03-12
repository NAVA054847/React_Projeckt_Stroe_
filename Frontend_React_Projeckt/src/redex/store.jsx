
import {combineReducers, createStore} from 'redux'; 
import { datacategoryreducer, dataCategoryReducer } from "./reducer/datacategoryreducer";
import { datagamereducer, dataGameReducer } from "./reducer/datagamereducer";
import{ datacartreducer } from './reducer/datacartreducer';
import{datacustreducer} from './reducer/datacustreducer';
import { datashopreducer } from './reducer/datashopreducer';


const reducer=combineReducers({datacategoryreducer,datagamereducer,datacartreducer,datacustreducer,datashopreducer});





export const store=createStore(reducer)
window.store=store