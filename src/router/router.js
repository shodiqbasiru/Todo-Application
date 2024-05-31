import {createRouter, createWebHistory} from "vue-router";
import TodoPage from "@/pages/TodoPage.vue";
import HomePage from "@/pages/HomePage.vue";

const routes = [
    {
        path: "/",
        children: [
            {
                path: "",
                name: "HomePage",
                component: HomePage
            },
            {
                path: "/todo",
                name: "TodoPage",
                component: TodoPage
            }
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router