import {defineStore} from 'pinia';

export const useSearch = defineStore('search', {
    state: ()=> ({
        allSearch: {
            products: [] as Product[],
            news: [] as NewData[],
            publications: [] as ObjectVirtual[],
            histories: [] as History[],
        },
    }),
    actions:{
        setAllSearch(newSearchData: any[], type:keyof TypesOfSearchSubtitle){
           const typeSearchData = this.setTypeSearch(newSearchData, type) as any[];
            this.allSearch[type] = typeSearchData;
        },
        setTypeSearch(newAllSearch: SearchData[], type:keyof TypesOfSearchSubtitle){
            const typeSearch = newAllSearch.map(search=>{
                search.type = type;
                return search;
            });
            return typeSearch;
        },
        getAllSearch(){
            return this.allSearch;
        },
        searchByQuery(query:string){   
            for (const key in this.allSearch) {
                const typeKey = key as keyof TypesOfSearchSubtitle;
                const array = this.allSearch[typeKey];
                const filterValues = array.filter((search) => {
                  const useQuery = query.toLowerCase();
                  if (search.tag) {
                    return search.tag.toLowerCase().includes(useQuery) || search.title.toLowerCase().includes(useQuery);
                  }
                  return search.title.toLowerCase().includes(useQuery);
                });
        
                this.allSearch[typeKey] = filterValues as any;
              }
            return this.allSearch;
        },
    }
});