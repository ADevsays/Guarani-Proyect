export function saveToken(token:string, name:string){
    localStorage.setItem(name, token);
};

export function getToken(name:string){
    return localStorage.getItem(name);
};

export function deleteToken(name:string){
    localStorage.removeItem(name);
    return true;
}