import { manageError } from "../../../helpers/manageError";
import { url } from "../../url";

export async function getOneNew(id:string){
    const getOneNew = `${url}/news/get/${id}`;
    try {
        const result = await fetch(getOneNew, {
            method: 'GET', 
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return result;
    } catch (error) {
       manageError(error);
    }
};