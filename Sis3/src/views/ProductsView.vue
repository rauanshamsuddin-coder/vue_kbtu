<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { getProducts, searchProducts, getCategories, getByCategory, createProduct, updateProduct, deleteProduct } from '@/api/products'
import { useAuthStore } from '@/stores/auth'
import ProductCard from '@/components/ProductCard.vue'
import ProductForm from '@/components/ProductForm.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const PER_PAGE = 12
const auth = useAuthStore()

const items = ref([])
const total = ref(0)
const page = ref(1)
const query = ref('')
const category = ref('')
const categories = ref([])
const loading = ref(false)
const error = ref(null)

const showForm = ref(false)
const editing = ref(null)
const saving = ref(false)
const toast = ref(null)

const pages = computed(() => Math.max(1, Math.ceil(total.value / PER_PAGE)))

function notify(text, type = 'ok') {
  toast.value = { text, type }
  setTimeout(() => (toast.value = null), 3000)
}

// READ
async function load() {
  loading.value = true
  error.value = null
  const params = { limit: PER_PAGE, skip: (page.value - 1) * PER_PAGE }
  try {
    const req = query.value ? searchProducts(query.value, params) : category.value ? getByCategory(category.value, params) : getProducts(params)
    const { data } = await req
    items.value = data.products
    total.value = data.total
  } catch (e) {
    error.value = e.userMessage
  } finally {
    loading.value = false
  }
}

let timer
watch(query, () => {
  clearTimeout(timer)
  timer = setTimeout(() => { page.value = 1; load() }, 400)
})
watch(category, () => { query.value = ''; page.value = 1; load() })
watch(page, load)

onMounted(async () => {
  load()
  try { categories.value = (await getCategories()).data } catch { /* filter is optional */ }
})

function openCreate() { editing.value = null; showForm.value = true }
function openEdit(p) { editing.value = p; showForm.value = true }

// CREATE + UPDATE
async function save(values) {
  saving.value = true
  try {
    if (editing.value) {
      const target = editing.value
      // products created locally do not exist on the server, so only update them in the UI
      const updated = target._local ? { ...target, ...values } : { ...target, ...(await updateProduct(target.id, values)).data }
      items.value = items.value.map((p) => (p.id === target.id ? updated : p))
      notify('Product updated')
    } else {
      const { data } = await createProduct(values)
      items.value.unshift({ ...values, ...data, id: Date.now(), _local: true, thumbnail: '' })
      total.value++
      notify('Product created')
    }
    showForm.value = false
  } catch (e) {
    notify(e.userMessage, 'error')
  } finally {
    saving.value = false
  }
}

// DELETE
async function remove(p) {
  if (!confirm(`Delete "${p.title}"?`)) return
  try {
    if (!p._local) await deleteProduct(p.id)
    items.value = items.value.filter((x) => x.id !== p.id)
    total.value--
    notify('Product deleted')
  } catch (e) {
    notify(e.userMessage, 'error')
  }
}
</script>

<template>
  <div class="top">
    <h1>Products</h1>
    <button v-if="auth.isLoggedIn" class="btn" @click="openCreate">Add product</button>
    <router-link v-else to="/login" class="muted">Log in to add or edit products</router-link>
  </div>

  <div class="filters">
    <input v-model="query" type="search" placeholder="Search products" aria-label="Search products" />
    <select v-model="category" aria-label="Category">
      <option value="">All categories</option>
      <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
    </select>
  </div>

  <LoadingSpinner v-if="loading" />
  <ErrorMessage v-else-if="error" :message="error" @retry="load" />
  <p v-else-if="!items.length" class="muted">No products match your search.</p>
  <div v-else class="grid">
    <ProductCard v-for="p in items" :key="p.id" :product="p" :can-edit="auth.isLoggedIn" @edit="openEdit" @delete="remove" />
  </div>

  <div v-if="!loading && !error && pages > 1" class="pager">
    <button class="btn ghost small" :disabled="page === 1" @click="page--">Previous</button>
    <span>Page {{ page }} of {{ pages }}</span>
    <button class="btn ghost small" :disabled="page === pages" @click="page++">Next</button>
  </div>

  <ProductForm v-if="showForm" :product="editing" :saving="saving" @submit="save" @cancel="showForm = false" />
  <div v-if="toast" class="toast" :class="{ error: toast.type === 'error' }" role="status">{{ toast.text }}</div>
</template>

<style scoped>
.top { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }
.filters { display: grid; grid-template-columns: 1fr 220px; gap: .75rem; margin: 1rem 0; }
.pager { display: flex; justify-content: center; align-items: center; gap: 1rem; margin-top: 1.5rem; }
@media (max-width: 560px) { .filters { grid-template-columns: 1fr; } }
</style>
