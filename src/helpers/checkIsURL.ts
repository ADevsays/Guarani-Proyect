export function checkIsURL(inputValue:string){
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(inputValue);
}