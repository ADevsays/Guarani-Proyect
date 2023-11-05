import {url} from '../../url.ts';
import { serverErrors } from '../../../consts/errors.ts';

const configFetchRegister = {
    method: 'POST', 
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

export async function registerUser(userData: DataToRegister, role?:RoleString){
    const registerUrl = `${url}/user/post/register/${role ? role + '/' : ''}`;
    try {
        const result = await fetch(registerUrl, {
            ...configFetchRegister,
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
