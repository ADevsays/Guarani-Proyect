export default function checkThereAreID(path:string){
    const regex = /id/;
    return regex.test(path);
}