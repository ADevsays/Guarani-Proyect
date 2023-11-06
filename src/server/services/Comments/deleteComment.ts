import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function deleteComment(token:string, id:string){
    const createVR = `${url}/digitalObject/delete/comment/${id}/`;
    try {
        const result = await fetch(createVR, {
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