import axiosInstance from "@/api/AxiosInstance";

const TodoService = () => {

    const getTodos = async () => {
        const {data} = await axiosInstance.get("/todos")
        return data;
    }


    return {
        getTodos
    }
}

export default TodoService;