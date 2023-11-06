import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function postComment(commentData:{description:string}, token:string, id:string){
    const createVR = `${url}/digitalObject/post/${id}/comment/`;
    try {
        const result = await fetch(createVR, {
            method: 'POST', 
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(commentData)
        });
        return result;
    } catch (error) {
       manageError(error);
    }
};