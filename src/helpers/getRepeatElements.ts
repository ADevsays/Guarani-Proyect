export default function getRepeatElements(array: any[]){
    const uniqueElements = [];
    const seenIds = new Set();
  
    for (const item of array) {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        uniqueElements.push(item);
      }
    }
  
    return uniqueElements;
}