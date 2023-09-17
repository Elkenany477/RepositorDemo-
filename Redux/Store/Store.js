import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import DataRepositoryReducer from '../Reducer/DataRepositoryReducer'
import ModelReducer from '../Reducer/ModelReducer';


const RootReducer = combineReducers({
    Reposity: DataRepositoryReducer,
})



export const store = createStore(
    RootReducer,
    applyMiddleware(thunk)
);
