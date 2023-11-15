import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function deleteProduct(token:string, id:string){
    const deleteProductUrl = `${url}/products/delete/${id}/`;
    try {
        const result = await fetch(deleteProductUrl, {
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