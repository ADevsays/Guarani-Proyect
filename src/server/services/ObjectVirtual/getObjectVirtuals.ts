import { serverErrors } from "../../../consts/errors";
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
        if (error instanceof TypeError && error.message === "Failed to fetch") {
            console.error(serverErrors.conectionError);
        } else {
            console.error("Error en la solicitud:", error);
        }
    }
}