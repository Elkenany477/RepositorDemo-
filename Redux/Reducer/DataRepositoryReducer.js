import ConstData from "../Action/Constants";

const intialState = {
    RepoData: [],
    isloading: false,
    error: null
}


const DataRepositoryReducer = (state = intialState, action) => {
    switch (action.type) {
        case ConstData.Load:
            return {
                ...state,
                isloading: true,
                error: null,
            };
        case ConstData.Load_Sucesss:
            return {
                ...state,
                RepoData: action.paload.items,
                isloading: false
            };
        case ConstData.Load_error:
            return {
                ...state,
                isloading: false,
                RepoData: [],
                isError: action.wrong
            };
        default:
            return state;
    }

}


export default DataRepositoryReducer;