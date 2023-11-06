export default function checkIsID(path:string){
    const regex = /id/;
    return regex.test(path);
}