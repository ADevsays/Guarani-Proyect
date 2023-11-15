import {defineStore} from 'pinia';

export const useAllNews = defineStore('news', {
    state: ()=> ({
        news: [] as NewData[]
    }),
    actions:{
        setNews(news: NewData[]){
            this.news = news;
        },
        getNews(){
            return this.news;
        },
        addNew(newUser: NewData){
            this.news.unshift(newUser);
        },
        deleteNew(id:string){
            this.news = this.news.filter(newUser=> String(newUser.id) != id);
        },
        updateNew(newUser: NewData){
            const newsUpdate = this?.news?.map((newNew)=>{
                if(newNew.id == newUser.id) {
                    return newUser;
                };
                return newNew;
            })
            this.news = newsUpdate  as NewData[];
        }
    }
});