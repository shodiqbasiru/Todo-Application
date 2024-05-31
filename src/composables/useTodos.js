import {computed, reactive} from "vue";
import TodoService from "@/services/TodoService";
import Swal from "sweetalert2";

const state = reactive({
    todos: [],
    currentPage: 1,
    itemsPerPage: 10,
    title: '',
    completed: false,
    currentTodo:{},
    form: {
        formTitle: 'Create a new Todo',
        button: 'Add Todo'
    },
    search: '',
    filteredTodos: [],
});

const useTodos = () => {
    const todoService = TodoService();

    const getTodos = async () => {
        const data = await todoService.getTodos();
        state.todos.push(...data);
        state.filteredTodos = [...state.todos]; // Update filteredTodos when todos is updated
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (state.currentTodo.id) {
            const updatedTodo = {
                id: state.currentTodo.id,
                title: state.title,
                completed: state.completed
            };
            await todoService.updateTodo(updatedTodo.id, updatedTodo);
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
            const newTodo = await todoService.createTodo(todo);
            state.todos.unshift(newTodo);
            await Swal.fire({
                title: 'Success',
                text: 'Todo created successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        }
        state.title = '';
        state.currentTodo = { id: 0, title: '', completed: false };
    }

    const deleteTodo = async (id) => {
        await todoService.deleteTodo(id);
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
    }

    const searchTodo = () => {
        state.filteredTodos = state.todos.filter(todo => todo.title.toLowerCase().includes(state.search.toLowerCase()));
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
        return state.filteredTodos.slice(start, end);
    });

    const totalPages= computed(() => {
        return Math.ceil(state.filteredTodos.length / state.itemsPerPage);
    });

    return {
        data: state,
        computed: { dataPage, uncompletedTodos, completedTodos,totalPages },
        methods: {
            getTodos,
            onSubmit,
            onPageChanged,
            deleteTodo,
            handleCompleted ,
            setCurrentTodo,
            searchTodo
        }
    }
}

export default useTodos;