export default function setValuesToEditPublication(publication: any, dataToEdit:any) {
    if (!publication) return;
    const keyspublication = Object.keys(publication);
    keyspublication.forEach(key => {
        if (key in dataToEdit) {
            const typeKey = key as keyof DataToPostObjV;
            dataToEdit[typeKey] = publication[key];
        }
    });
    return dataToEdit;
}