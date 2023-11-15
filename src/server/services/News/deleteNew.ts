import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function deleteNew(token:string, id:string){
    const deleteNewUrl = `${url}/news/delete/${id}/`;
    try {
        const result = await fetch(deleteNewUrl, {
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