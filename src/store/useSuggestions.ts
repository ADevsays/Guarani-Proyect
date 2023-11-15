import {defineStore} from 'pinia';

export const useSuggestions = defineStore('suggestions', {
    state: ()=> ({
        suggestions: [] as Suggestion[]
    }),
    actions:{
        setSuggestions(suggestions: Suggestion[]){
            this.suggestions = suggestions;
        },
        getSuggestions(){
            return this.suggestions;
        },
        addSuggestion(newSuggestion: Suggestion){
            this.suggestions.unshift(newSuggestion);
        },
        deleteSuggestion(id:string){
            this.suggestions = this.suggestions.filter(suggestionUser=> String(suggestionUser.id) != id);
        },
        getOneSuggestion(id:string):Suggestion{
            return this.suggestions.find(suggestion=> suggestion.id == id) as Suggestion;
        }
    }
});