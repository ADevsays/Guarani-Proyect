import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function deleteHistory(token:string, id:string){
    const deleteHistoryURL = `${url}/histories/delete/${id}/`;
    try {
        const result = await fetch(deleteHistoryURL, {
            method: 'DELETE', 
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        return result;
    } catch (error) {
       manageError(error);
    }
};