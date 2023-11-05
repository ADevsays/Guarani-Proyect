import { serverErrors } from "../../../consts/errors";
import { url } from "../../url";

export async function editUser(userData: DataToEdit, token:string){
    const editUserUrl = `${url}/user/put/`;
    try {
        const result = fetch(editUserUrl, {
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData)
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