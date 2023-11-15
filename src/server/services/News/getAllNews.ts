import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function getAllNews(){
    const getAllNewsUrl = `${url}/news/get/all`;
    try {
        const result = await fetch(getAllNewsUrl, {
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