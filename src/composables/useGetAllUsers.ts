import { tokenName } from "../consts/userToken";
import { getToken } from "../helpers/saveToken";
import { getAllUsers } from "../server/services/User/getAllUsers";
import { useAllUsers } from "../store/useAllUsers";
const token = getToken(tokenName);
export default function useGetAllUsers(){
    const allUsersStore = useAllUsers();
    const getUsers = async ()=>{
        if(!token) return;
        const result = await getAllUsers(token);
        if(!result)return; 
        const users = await result.json();
        allUsersStore.setUsers(users);
    }
    return {getUsers}
};