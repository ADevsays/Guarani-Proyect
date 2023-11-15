import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function postContact(newData:DataToContact, token:string){
    const contactURL = `${url}/contacts/post/`;
    try {
        const result = await fetch(contactURL, {
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