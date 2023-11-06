import { serverErrors } from "../consts/errors";

export function manageError(error: unknown){
    if (error instanceof TypeError && error.message === "Failed to fetch") {
        console.error(serverErrors.conectionError);
    } else {
        console.error("Error en la solicitud:", error);
    }
}