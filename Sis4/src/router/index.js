import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'dashboard', meta: { title: 'Dashboard' }, component: () => import('../views/DashboardView.vue') },
  { path: '/students', name: 'students', meta: { title: 'Students' }, component: () => import('../views/StudentsView.vue') },
  { path: '/courses', name: 'courses', meta: { title: 'Courses' }, component: () => import('../views/CoursesView.vue') },
  { path: '/assignments', name: 'assignments', meta: { title: 'Assignments' }, component: () => import('../views/AssignmentsView.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', meta: { title: 'Not found' }, component: () => import('../views/NotFoundView.vue') }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
