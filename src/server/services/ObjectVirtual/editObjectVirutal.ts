import { serverErrors } from "../../../consts/errors";
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
        if (error instanceof TypeError && error.message === "Failed to fetch") {
            console.error(serverErrors.conectionError);
        } else {
            console.error("Error en la solicitud:", error);
        }
    }
};