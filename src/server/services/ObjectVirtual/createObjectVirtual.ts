import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function createObjectVirtual(postData: DataToPostObjV, token:string){
    const createObjVUrl = `${url}/digitalObject/post/`;
    try {
        const result = await fetch(createObjVUrl, {
            method: 'POST', 
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(postData)
        });
        return result;
    } catch (error) {
       manageError(error);
    }
};