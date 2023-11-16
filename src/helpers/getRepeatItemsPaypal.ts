export default function getRepeatItemsPaypal(array: any[]){
    const uniqueElements = [];
    const seenIds = new Set();
  
    for (const item of array) {
      if (!seenIds.has(item.description)) {
        seenIds.add(item.description);
        uniqueElements.push(item);
      }
    }
  
    return uniqueElements;
}