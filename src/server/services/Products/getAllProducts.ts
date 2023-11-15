import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function getAllProducts(){
    const getAllProductsURL = `${url}/products/get/all/`;
    try {
        const result = await fetch(getAllProductsURL, {
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