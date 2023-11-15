export function cutArray(array:any [], countMax:number){
    if(!(Array.isArray(array) && array.length >= countMax)){
        return {
            arrayCut:array, 
            array: []
        }
    }
    return {
        arrayCut: array.slice(0, countMax),
        array: array.slice(countMax)
    }
}