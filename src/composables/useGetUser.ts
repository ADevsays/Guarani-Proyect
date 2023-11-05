import { onMounted, ref, watch } from "vue";
import { useSessionUser } from "../store/userSession";

export default function useGetUser() {
    const userStore = useSessionUser();
    const user = ref({} as User);
    onMounted(() => {
        user.value = userStore.getUser();
    });
    watch(
        () => userStore.user,
        () => user.value = userStore.getUser()
    );
    return {user};
}