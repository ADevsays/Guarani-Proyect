import { manageError } from "../../../helpers/manageError";
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
        manageError(error);
    }
}