import {defineStore} from 'pinia';

export const useAllHistories = defineStore('histories', {
    state: ()=> ({
        histories: [] as History[]
    }),
    actions:{
        setHistories(histories: History[]){
            this.histories = histories;
        },
        getHistories(){
            return this.histories;
        },
        addHistory(HistoryUser: History){
            this.histories.unshift(HistoryUser);
        },
        deleteHistory(id:string){
            this.histories = this.histories.filter(HistoryUser=> String(HistoryUser.id) != id);
        },
        updateHistory(HistoryUser: History){
            const historiesUpdate = this?.histories?.map((HistoryHistory)=>{
                if(HistoryHistory.id == HistoryUser.id) {
                    return HistoryUser;
                };
                return HistoryHistory;
            })
            this.histories = historiesUpdate  as History[];
        },
        getOneHistory(id:string):History{
            return this.histories.find(history=> history.id == id) as History;
        }
    }
});