import {reactive} from "vue";

export const todoStore = {
    state: reactive({
        todos: [],
        currentPage: 1,
        itemsPerPage: 10,
        title: '',
        completed: false,
        currentTodo: {},
        form: {
            formTitle: 'Create a new Todo',
            button: 'Add Todo'
        },
        search: '',
        isFetched: false
    }),
}