import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function editObjectVirtual(postData: DataToPostObjV, token:string, id:string){
    const createObjVUrl = `${url}/digitalObject/put/${id}/`;

    try {
        const result = await fetch(createObjVUrl, {
            method: 'PUT', 
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