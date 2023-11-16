import checkRepeat from "./checkRepeat";

export default function countOfRepeats(id: string, array:  any[]) {
    const thereAreRepeat = {
        state: false,
        count: 0
    };
    const oneRepeatElement = array.filter(product => product.id == id);
    if (checkRepeat(oneRepeatElement)) {
        thereAreRepeat.state = true;
        thereAreRepeat.count = oneRepeatElement?.length ?? 0;
        return thereAreRepeat;
    }
    return thereAreRepeat;
}
