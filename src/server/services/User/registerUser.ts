import {url} from '../../url.ts';
import { manageError } from '../../../helpers/manageError.ts';

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
        manageError(error);
    }
   
}
