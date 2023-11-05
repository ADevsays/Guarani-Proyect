import { serverErrors } from "../../../consts/errors";
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
        if (error instanceof TypeError && error.message === "Failed to fetch") {
            console.error(serverErrors.conectionError);
        } else {
            console.error("Error en la solicitud:", error);
        }
    }
};