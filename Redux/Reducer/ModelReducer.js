import ConstData from "../Action/Constants";

const intialModel = {
    isvisable: false
}


const ModelReducer = (state = intialModel, action) => {
    switch (action.type) {
        case ConstData.ShowModel:
            return {
                ...state,
                isvisable: action.ModelOpen,
                error: null,
            };
        case ConstData.HideModel:
            return {
                ...state,
                isvisable: action.ModelClose
            };

        default:
            return state;
    }

}

export default ModelReducer;


