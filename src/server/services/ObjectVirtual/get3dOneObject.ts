import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function get3dOneObject(id:string){
    const createObjVUrl = `${url}/virtualReality/get/${id}/`;
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