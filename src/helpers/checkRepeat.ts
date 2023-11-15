export default function checkRepeat(arr:any[]){
    const setArr = new Set([...arr]);
    return setArr.size != arr.length;
}