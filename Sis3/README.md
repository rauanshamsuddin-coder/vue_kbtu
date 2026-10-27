# ShopVue

Multi-page Vue 3 app that loads a product catalogue from the public [DummyJSON](https://dummyjson.com) API with axios.

## Run
```bash
npm install
npm run dev
```
Demo login: `emilys` / `emilyspass`.

## Features
- Pages: Home, Products, Product details (`/products/:id`), Login, Profile, 404
- Header and navbar on every page
- Auth with Pinia + localStorage, route guards (`/profile` is protected)
- Lazy-loaded routes, dynamic routing
- Loading and error states with a retry button
- CRUD with axios: GET, POST, PUT, DELETE (search, category filter, pagination)

## Note
DummyJSON simulates writes: the server does not store changes, so the UI updates its local list after each operation.

## Stack
Vue 3, Vue Router 4, Pinia, Axios, Vite
