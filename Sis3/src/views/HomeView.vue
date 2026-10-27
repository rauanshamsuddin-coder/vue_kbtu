<script setup>
import { ref, onMounted } from 'vue'
import { getProducts } from '@/api/products'
import ProductCard from '@/components/ProductCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const items = ref([])
const loading = ref(false)
const error = ref(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    const { data } = await getProducts({ limit: 4, sortBy: 'rating', order: 'desc' })
    items.value = data.products
  } catch (e) {
    error.value = e.userMessage
  } finally {
    loading.value = false
  }
}
onMounted(load)
</script>

<template>
  <section class="hero">
    <h1>Everyday goods, picked by rating</h1>
    <p class="muted">Browse the catalogue, open any product for details, and sign in to manage the list.</p>
    <router-link to="/products" class="btn">Browse all products</router-link>
  </section>
  <h2>Top rated</h2>
  <LoadingSpinner v-if="loading" />
  <ErrorMessage v-else-if="error" :message="error" @retry="load" />
  <div v-else class="grid">
    <ProductCard v-for="p in items" :key="p.id" :product="p" />
  </div>
</template>

<style scoped>
.hero { padding: 2rem 0; }
.hero h1 { font-size: 2.2rem; max-width: 18ch; }
.hero p { max-width: 55ch; }
</style>
