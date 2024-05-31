import {computed} from "vue";
import TodoService from "@/services/TodoService";
import Swal from "sweetalert2";
import {todoStore} from "@/store/todoStore";

const useTodos = () => {
    const todoService = TodoService();
    const {state} = todoStore;

    const getTodos = async () => {
        const data = await todoService.getTodos();
        state.todos.push(...data);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (state.currentTodo.id) {
            const updatedTodo = {
                id: state.currentTodo.id,
                title: state.title,
                completed: state.completed
            };
            const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
            state.todos[index] = updatedTodo;
            state.form.formTitle = 'Create a new Todo';
            state.form.button = 'Add Todo';
            await Swal.fire({
                title: 'Success',
                text: 'Todo updated successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        } else {
            const todo = {
                id: state.todos.length + 1,
                title: state.title,
                completed: state.completed
            };
            state.todos.unshift(todo);
            await Swal.fire({
                title: 'Success',
                text: 'Todo created successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        }
        state.title = '';
        state.currentTodo = {id: 0, title: '', completed: false};
    }

    const deleteTodo = async (id) => {
        state.todos = state.todos.filter(todo => todo.id !== id);
        await Swal.fire({
            title: 'Success',
            text: 'Todo deleted successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
    }


    const setCurrentTodo = (todo) => {
        state.form.formTitle = 'Edit Todo';
        state.form.button = 'Update Todo';

        state.currentTodo = todo;
        state.title = todo.title;
        state.completed = todo.completed;
    }

    const onPageChanged = (newPage) => {
        state.currentPage = newPage;
    };

    const handleCompleted = (id) => {
        const todo = state.todos.find(todo => todo.id === id);
        todo.completed = !todo.completed;
        if (todo.completed) {
            state.todos = state.todos.filter(todo => todo.id !== id);
            state.todos.unshift(todo);
        }
    }

    const searchTodo = async () => {
        if (state.search) {
            state.todos = state.todos.filter(todo => todo.title.toLowerCase().includes(state.search.toLowerCase()));
        } else {
            await getTodos();
        }
        state.currentPage = 1;
    }

    const uncompletedTodos = computed(() => {
        return state.todos.filter(todo => !todo.completed).slice(0, 5);
    });

    const completedTodos = computed(() => {
        return state.todos.filter(todo => todo.completed).slice(0, 5);
    });

    const dataPage = computed(() => {
        const start = (state.currentPage - 1) * state.itemsPerPage;
        const end = start + state.itemsPerPage;
        return state.todos.slice(start, end);
    });

    const totalPages = computed(() => {
        return Math.ceil(state.todos.length / state.itemsPerPage);
    });

    return {
        data: state,
        computed: {dataPage, uncompletedTodos, completedTodos, totalPages},
        methods: {
            getTodos,
            onSubmit,
            onPageChanged,
            deleteTodo,
            handleCompleted,
            setCurrentTodo,
            searchTodo
        }
    }
}

export default useTodos;