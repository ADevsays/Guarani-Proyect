import { usePublications } from '../store/usePublications.ts';
import { ref, onMounted, watch } from 'vue';

export default function useGetAllPublications() {
    const publicationsStore = usePublications();
    const publications = ref([] as ObjectVirtual[]);
    onMounted(() => {
        publications.value = publicationsStore.getAllPublications();
    });
    watch(
        () => publicationsStore.publications,
        () => publications.value = publicationsStore.getAllPublications()
    );
    return {publications}
}