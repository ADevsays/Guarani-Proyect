import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function getAllContact(token:string){
    const allContactURL = `${url}/contacts/get/all`;
    try {
        const result = await fetch(allContactURL, {
            method: 'GET', 
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
        });
        return result;
    } catch (error) {
       manageError(error);
    }
};