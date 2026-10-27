<script setup>
defineProps({ product: { type: Object, required: true }, canEdit: Boolean })
defineEmits(['edit', 'delete'])
</script>

<template>
  <article class="card">
    <router-link :to="{ name: 'product', params: { id: product.id } }" class="img">
      <img v-if="product.thumbnail" :src="product.thumbnail" :alt="product.title" loading="lazy" />
    </router-link>
    <div class="body">
      <h3>{{ product.title }}</h3>
      <p class="muted">{{ product.category }}</p>
      <p class="price">${{ product.price }}</p>
      <div v-if="canEdit" class="actions">
        <button class="btn ghost small" @click="$emit('edit', product)">Edit</button>
        <button class="btn danger small" @click="$emit('delete', product)">Delete</button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card { background: var(--surface); border: 1px solid var(--line); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; }
.img { background: #e8eef2; display: block; aspect-ratio: 1; }
.img img { width: 100%; height: 100%; object-fit: contain; }
.body { padding: .75rem; }
.body h3 { font-size: 1.05rem; }
.body p { margin: 0 0 .25rem; }
.price { font-weight: 700; }
.actions { display: flex; gap: .5rem; margin-top: .5rem; }
</style>
