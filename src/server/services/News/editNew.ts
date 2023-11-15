import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function editNew(newData:NewData, token:string, id:string){
    const editNewUrl = `${url}/news/put/${id}/`;
    try {
        const result = await fetch(editNewUrl, {
            method: 'PUT', 
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