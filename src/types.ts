type RoleString = 'admin' | 'editor' | '';
type HTMLRef = null | HTMLElement;

type User = {
    id: string;
    user_name: string;
    last_name: string;
    email: string;
    is_admin: boolean;
    token: string;
    rol: RoleString;
} | null;

interface DataToRegister {
    user_name: string,
    last_name: string,
    email: string,
    password: string
};

interface DataToLogin {
    email: string,
    password: string
};

interface DataToEdit {
    email?: string,
    user_name?: string,
    last_name?: string
};

interface DataToPostObjV {
    title: string,
    description: string,
    place: string,
    format: string,
    tag: string,
    url: string
};

interface ObjectVirtual {
    id: string,
    user: string,
    start_date: string,
    title: string,
    description: string,
    place: string,
    format: string,
    tag: string,
    url: string,
    img?: File | null | string,
    image?: string | undefined
}

interface VirtualReality extends ObjectVirtual {
    url: never,
    [key: string]: any
}

interface Comment {
    id: number,
    user: number,
    description: string,
    digital_object: number,
    start_date: string
}

interface DataToNew {
    title: string,
    url: string,
    description: string
}

interface NewData {
    description: string,
    id: string,
    start_date: string,
    title: string,
    url: string,
    user: string,
    [key: string]: any
}

interface DataToHistory {
    title: string,
    url: string,
    description: string,
    format: string,
    tag: string,
    [key: string]: any
}

interface History extends DataToHistory {
    id: string,
    user: string,
    start_date: string
}

interface DataToProduct {
    title: string,
    description: string,
    price: number,
    url: string,
    [key: string]: any
}

interface Product extends DataToProduct {
    id: string
}

interface Cart {
    products: Product[],
    totalPrice: number
}

interface Search {
    products: Product[],
    news: NewData[],
    publications: ObjectVirtual[],
    histories: History[]
}

type SearchData =
  | (NewData & { type: 'news' })
  | (Product & { type: 'products' })
  | (ObjectVirtual & { type: 'publications' })
  | (History & { type: 'histories' });

interface TypesOfSearchSubtitle {
    products: 'Productos',
    news: 'Noticias',
    publications: 'Publicaciones',
    histories: 'Historias'
}
interface SearchTypes {
    products: Product;
    news: NewData;
    publications: ObjectVirtual;
    histories: History;
}

interface DataToContact {
    name: string,
    lastname: string,
    email: string,
    web: string,
    matter: string,
    message: string,
    consultation: string,
    [key: string]: string
};

interface Contact extends DataToContact{
    id: string
}

interface DataToSuggestion{
    description:string
}

interface Suggestion extends DataToSuggestion{
    id:string
}

interface ItemProductToSendPaypal{
    name: string;
    description: string;
    unit_amount: {
        value: string;
        currency_code: string;
    };
    quantity: string;
}[]