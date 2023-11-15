import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function get3dAllObjects(){
    const createObjVUrl = `${url}/virtualReality/get/all/`;
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