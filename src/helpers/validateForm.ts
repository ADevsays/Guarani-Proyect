export function validateForm(data:object){
    const values = Object.values(data);
    return values.every(value=> value);
}