import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function postProduct(newData:DataToProduct, token:string){
    const createProductURL = `${url}/products/post/`;
    try {
        const result = await fetch(createProductURL, {
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