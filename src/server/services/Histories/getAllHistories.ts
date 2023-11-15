import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function getAllHistories(){
    const allHistoriesUrl = `${url}/histories/get/all`;
    try {
        const result = await fetch(allHistoriesUrl, {
            method: 'GET', 
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return result;
    } catch (error) {
       manageError(error);
    }
};