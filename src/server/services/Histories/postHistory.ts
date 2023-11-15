import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function postHistory(newData:DataToNew, token:string){
    const historyURL = `${url}/histories/post/`;
    try {
        const result = await fetch(historyURL, {
            method: 'POST', 
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newData)
        });
        return result;
    } catch (error) {
       manageError(error);
    }
};