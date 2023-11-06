import {url} from '../../url.ts';
import { manageError } from '../../../helpers/manageError.ts';

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
        manageError(error);
    }
   
}
