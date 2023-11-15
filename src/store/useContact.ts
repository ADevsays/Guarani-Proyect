import {defineStore} from 'pinia';

export const useContacts = defineStore('contacts', {
    state: ()=> ({
        contacts: [] as Contact[]
    }),
    actions:{
        setContacts(contacts: Contact[]){
            this.contacts = contacts;
        },
        getContacts(){
            return this.contacts;
        },
        addContact(newContact: Contact){
            this.contacts.unshift(newContact);
        },
        deleteContact(id:string){
            this.contacts = this.contacts.filter(contactUser=> String(contactUser.id) != id);
        },
        getOneContact(id:string):Contact{
            return this.contacts.find(contact=> contact.id == id) as Contact;
        }
    }
});