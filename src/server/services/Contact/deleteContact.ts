import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function deleteContact(token:string, id:string){
    const deleteContactURL = `${url}/contacts/delete/${id}/`;
    try {
        const result = await fetch(deleteContactURL, {
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