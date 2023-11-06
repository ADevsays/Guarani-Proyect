import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function deleteObjectVirtual(token:string, id:string){
    const createObjVUrl = `${url}/digitalObject/delete/${id}/`;

    try {
        const result = await fetch(createObjVUrl, {
            method: 'DELETE', 
            headers:{
                'Authorization': `Bearer ${token}`
            },
        });
        return result;
    } catch (error) {
       manageError(error);
    }
};