
import ConstData from "./Constants";

export const fetchDataRequest = () => {
    return {
        type: ConstData.Load
    }
}

export const fetchDataSuccess = Datalist => {
    return {
        type: ConstData.Load_Sucesss,
        paylod: Datalist,
    };
}

export const fetchDataError = error => {
    return {
        type: ConstData.Load_error,
        payload: error
    }
}