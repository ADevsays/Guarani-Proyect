import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function delete3dObject(token:string, id:string){
    const deleteUrl = `${url}/virtualReality/delete/${id}/`;
    try {
        const result = await fetch(deleteUrl, {
            method: 'DELETE', 
            headers:{
                'Authorization': `Bearer ${token}`
            },
        });
        return result;
    } catch (error) {
       manageError(error);
    }
};