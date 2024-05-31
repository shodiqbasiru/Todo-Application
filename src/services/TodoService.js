import axiosInstance from "@/api/AxiosInstance";

const TodoService = () => {
    const getTodos = async () => {
        const response = await axiosInstance.get("/todos")
        return response.data;
    }

    return {
        getTodos
    }
}

export default TodoService;