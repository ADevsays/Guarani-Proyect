import {defineStore} from 'pinia';

export const useAllUsers = defineStore('allUsers', {
    state: ()=> ({
        users:[] as User[]
    }),
    actions:{
        setUsers(users: User[]){
            this.users = users;
        },
        getUsers(){
            return this.users;
        },
        getOneUser(id:string){
            return this.users.find(user=> {
                if(user)
                    return user.id == id
            });
        }
    }
});