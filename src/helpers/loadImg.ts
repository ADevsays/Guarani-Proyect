export default function loadImg(img:string){
    return new Promise((res, rej)=>{
        const elementImg = new Image();
        elementImg.addEventListener('load', res);
        elementImg.addEventListener('error', rej);
        elementImg.src = img;
    });
};