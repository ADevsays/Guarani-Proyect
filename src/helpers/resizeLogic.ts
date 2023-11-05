import ViewPortMedia from '../consts/ViewPortMedia.ts';
export interface SlidesPerView{
    slidesPerView:number,
    width:string
}
export function resizeLogic(width:number){
    const result:SlidesPerView = {
        slidesPerView: 3,
        width: '75%'
    };
    if(width < ViewPortMedia.md){
        result.slidesPerView = 1;
        result.width = '100%';
    }
    else if(width < ViewPortMedia.xl){
        result.slidesPerView = 2;
        result.width = '100%';
    }
    return result;
}