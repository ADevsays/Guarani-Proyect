import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function postSuggestion(newData:DataToSuggestion, token:string){
    const suggestionURL = `${url}/suggestion/post/`;
    try {
        const result = await fetch(suggestionURL, {
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