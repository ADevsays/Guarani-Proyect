import {url} from '../../url.ts';
import { serverErrors } from '../../../consts/errors.ts';

export async function loginUser(userData: DataToLogin){
    const registerUrl = `${url}/user/post/login/`;
    try {
        const result = await fetch(registerUrl, {
            method: 'POST', 
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
