import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function getAllSuggestions(){
    const getAllSuggestionsURL = `${url}/suggestion/get/all/`;
    try {
        const result = await fetch(getAllSuggestionsURL, {
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