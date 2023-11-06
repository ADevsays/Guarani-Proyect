
export default function useSEO(title: string, description: string) {
    if (title) {
        document.title = title;
    }
    if(description){
        const metaDescription = document.querySelector('meta[name="description"]');
        metaDescription?.setAttribute('content', description);
    }
}