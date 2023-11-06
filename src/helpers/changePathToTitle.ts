export function changePathToTitle(path: string) {
    if(path == '/') return 'Inicio';
    const words = path.split(/[/_-]/).map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join(' ');
}