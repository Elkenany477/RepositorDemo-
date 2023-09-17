import axios from "axios";
import ConstData from "./Constants"
import { fetchDataRequest, fetchDataSuccess, fetchDataError } from "./Action";

const API_URL = "https://api.github.com/search/repositories?q=created"

export const Fetch_Data_Repository = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: ConstData.Load
        });
        axios.get(API_URL).then((response) => {
            dispatch({
                type: ConstData.Load_Sucesss,
                paload: response.data
            })
            resolve(response)
        }).catch((error) => {
            dispatch({
                type: ConstData.Load_error,
                wrong: error
            })
            reject(error);
        })
    })
}

export const ShowModel = () => (dispatch) => {
    return dispatch({
        type: ConstData.ShowModel,
        ModelOpen: true
    })

}

export const HideModel = () => (dispatch) => {
    return dispatch({
        type: ConstData.HideModel,
        ModelClose: false
    })

}





