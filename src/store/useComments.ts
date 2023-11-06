import {defineStore} from 'pinia';

export const useComments = defineStore('comments', {
    state: ()=> ({
        comments: [] as Comment[]
    }),
    actions:{
        setComments(comments: Comment[]){
            this.comments = comments;
        },
        getComments(){
            return this.comments;
        },
        addNewComment(comment: Comment){
            this.comments.push(comment);
        }
    }
});