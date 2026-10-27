<script setup>
import { ref, watch } from 'vue'
import { getProduct } from '@/api/products'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const props = defineProps({ id: { type: String, required: true } })

const product = ref(null)
const loading = ref(false)
const error = ref(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    product.value = (await getProduct(props.id)).data
  } catch (e) {
    error.value = e.response?.status === 404 ? 'This product does not exist.' : e.userMessage
  } finally {
    loading.value = false
  }
}

// reload when the :id param changes
watch(() => props.id, load, { immediate: true })
</script>

<template>
  <router-link to="/products">&larr; Back to products</router-link>
  <LoadingSpinner v-if="loading" />
  <ErrorMessage v-else-if="error" :message="error" @retry="load" />
  <article v-else-if="product" class="detail">
    <img :src="product.thumbnail" :alt="product.title" />
    <div>
      <h1>{{ product.title }}</h1>
      <p class="muted">{{ product.brand }} · {{ product.category }}</p>
      <p class="price">${{ product.price }}</p>
      <p>{{ product.description }}</p>
      <p>Rating: {{ product.rating }} / 5 · In stock: {{ product.stock }}</p>
      <h2>Reviews</h2>
      <p v-if="!product.reviews?.length" class="muted">No reviews yet.</p>
      <ul>
        <li v-for="(r, i) in product.reviews" :key="i"><strong>{{ r.reviewerName }}</strong> ({{ r.rating }}/5): {{ r.comment }}</li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.detail { display: grid; grid-template-columns: minmax(0, 360px) 1fr; gap: 2rem; margin-top: 1rem; }
.detail img { width: 100%; background: #e8eef2; border-radius: 8px; }
.price { font-size: 1.6rem; font-weight: 700; }
@media (max-width: 700px) { .detail { grid-template-columns: 1fr; } }
</style>
