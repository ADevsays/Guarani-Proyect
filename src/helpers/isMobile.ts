export default function isMobile(width:string) {
    return window.matchMedia(`(max-width: ${width})`).matches;
}
