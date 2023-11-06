import {url} from '../../url.ts';
import { serverErrors } from '../../../consts/errors.ts';

export async function getAllUsers(token:string){
    const getUserUrl = `${url}/user/get/all/`;
    try{
        const result = await fetch(getUserUrl, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return result;    
    } catch(error){
        if (error instanceof TypeError && error.message === "Failed to fetch") {
            console.error(serverErrors.conectionError);
        } else {
            console.error("Error en la solicitud:", error);
        }
        return null;
    }
}