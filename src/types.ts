type RoleString = 'admin' | 'editor' | '';
type HTMLRef = null | HTMLElement;

type User = {
    id:string;
    user_name:string;
    last_name:string;
    email:string;
    is_admin:boolean;
    token:string;
    rol:RoleString;
} | null;

interface DataToRegister {
    user_name:string,
    last_name: string,
    email: string,
    password: string
};

interface DataToLogin{
    email:string,
    password:string
};

interface DataToEdit{
    email?:string,
    user_name?:string,
    last_name?:string
};

interface DataToPostObjV{
    title:string,
    description: string,
    place:string, 
    format:string,
    tag:string,
    url:string
};

interface ObjectVirtual{
    id: string,
    user: string,
    start_date: string,
    title: string,
    description: string,
    place: string,
    format: string,
    tag: string,
    url: string
}

interface VirtualReality extends ObjectVirtual{
    url:never,
    img:File | null,
    [key: string]: any
}


interface Comment {
    id:number, 
    user: number,
    description:string, 
    digital_object:number, 
    start_date:string
}

