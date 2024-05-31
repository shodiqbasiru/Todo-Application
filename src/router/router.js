import {createRouter, createWebHistory} from "vue-router";
import TodoPage from "@/pages/TodoPage.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import HomePage from "@/pages/HomePage.vue";

const routes = [
    {
        path: "/",
        name: "MainLayout",
        component: MainLayout,
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