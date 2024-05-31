import {computed} from "vue";
import TodoService from "@/services/TodoService";
import Swal from "sweetalert2";
import {todoStore} from "@/store/todoStore";

const useTodos = () => {
    const todoService = TodoService();
    const {state} = todoStore;

    const getTodos = async () => {
        if (state.isFetched) return;

        const data = await todoService.getTodos();
        state.todos.push(...data);

        state.isFetched = true;
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!state.title) {
            await Swal.fire({
                title: 'Error',
                text: 'Title is required',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }
        if (state.currentTodo.id) {
            const updatedTodo = {
                id: state.currentTodo.id,
                title: state.title,
                completed: state.completed
            };
            await Swal.fire({
                title: 'Success',
                text: 'Todo updated successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            });

            const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
            state.todos[index] = updatedTodo;
            state.form.formTitle = 'Create a new Todo';
            state.form.button = 'Add Todo';

        } else {
            const todo = {
                id: state.todos.length + 1,
                title: state.title,
                completed: state.completed
            };
            await Swal.fire({
                title: 'Success',
                text: 'Todo created successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            state.todos.unshift(todo);

        }
        state.title = '';
        state.currentTodo = {id: 0, title: '', completed: false};
    }

    const deleteTodo = async (id) => {
        await Swal.fire({
            title: 'Success',
            text: 'Todo deleted successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
        state.todos = state.todos.filter(todo => todo.id !== id);

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
            console.log(state.isFetched, 'if search')
            const lowerCaseSearch = state.search.toLowerCase();
            state.todos = state.todos.filter(todo => {
                const lowerCaseTitle = todo.title.toLowerCase();
                return lowerCaseTitle.includes(lowerCaseSearch);
            });
        } else {
            state.isFetched = false;
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