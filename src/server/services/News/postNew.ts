import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function postNew(newData:DataToNew, token:string){
    const createNew = `${url}/news/post/`;
    try {
        const result = await fetch(createNew, {
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