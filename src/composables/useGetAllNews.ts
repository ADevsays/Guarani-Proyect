import { getAllNews } from "../server/services/News/getAllNews";
import { useAllNews } from "../store/useAllNews";

export default async function useGetAllNews(){
    const newsStore = useAllNews();
    try {
        const result = await getAllNews();
        if (!result) {
            throw new Error('El servidor no arrojó una respuesta.');
        }
        const news = await result.json();
        newsStore.setNews(news);
        return true
    } catch (error) {
        console.error(error);
    }
   
}