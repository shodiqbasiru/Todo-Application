import axiosInstance from "@/api/AxiosInstance";

const TodoService = () => {

    const getTodos = async () => {
        const {data} = await axiosInstance.get("/todos")
        return data;
    }

    const createTodo = async (todo) => {
        const {data} = await axiosInstance.post("/todos", todo)
        return data;
    }

    const updateTodo = async (id, todo) => {
        const {data} = await axiosInstance.put(`/todos/${id}`, todo)
        return data;
    }

    const deleteTodo = async (id) => {
        const {data} = await axiosInstance.delete(`/todos/${id}`)
        return data;
    }

    return {
        getTodos,
        createTodo,
        updateTodo,
        deleteTodo
    }
}

export default TodoService;