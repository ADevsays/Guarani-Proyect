import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function create3dObject(formData:any, token:string){
    const createVR = `${url}/virtualReality/post/`;
    try {
        const result = await fetch(createVR, {
            method: 'POST', 
            headers:{
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        return result;
    } catch (error) {
       manageError(error); 
    }
};