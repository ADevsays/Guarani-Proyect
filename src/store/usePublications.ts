import {defineStore} from 'pinia';

export const usePublications = defineStore('allPublications', {
    state: ()=> ({
        publications:[] as ObjectVirtual[]
    }),
    actions:{
        setAllPublications(publications: ObjectVirtual[]){
            this.publications = publications;
        },
        addPublication(newPublication:ObjectVirtual){
            this.publications.push(newPublication);
        },
        getAllPublications(){
            return this.publications;
        },
        getOnePublication(id:string){
            return this.publications.find(publication=> publication.id  == id);
        },
        updatePublications(newPublication: ObjectVirtual){
            const publicationsUpdate = this?.publications?.map((publication)=>{
                if(publication.id == newPublication.id) {
                    return newPublication;
                };
                return publication;
            })
            this.publications = publicationsUpdate  as ObjectVirtual[];
        }
    }
});