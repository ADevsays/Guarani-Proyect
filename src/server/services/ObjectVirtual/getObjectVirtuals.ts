import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function getObjectVirtual(id?:string | string[]){
    const allObjectVirtual = `digitalObject/get/all/`;
    const oneObjectVirtual = `digitalObject/get/${id}/`;
    const createObjVUrl = `${url}/${id ? oneObjectVirtual : allObjectVirtual}`;
    try {
        const result = await fetch(createObjVUrl, {
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
}