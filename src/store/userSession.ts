import {defineStore} from 'pinia';

export const useSessionUser = defineStore('userSession', {
    state: ()=> ({
        user:null as User
    }),
    actions:{
        setUser(newUser:User){
            this.user = newUser;
        },
        getUser(){
            return this.user;
        }
    }
});