<script setup>
import { reactive } from 'vue'

const props = defineProps({ product: { type: Object, default: null }, saving: Boolean })
const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  title: props.product?.title ?? '',
  price: props.product?.price ?? 0,
  category: props.product?.category ?? '',
  description: props.product?.description ?? '',
})
</script>

<template>
  <div class="backdrop" @click.self="emit('cancel')">
    <div class="dialog" role="dialog" aria-modal="true">
      <h2>{{ product ? 'Edit product' : 'New product' }}</h2>
      <label>Title <input v-model.trim="form.title" required /></label>
      <label>Price (USD) <input v-model.number="form.price" type="number" min="0" step="0.01" /></label>
      <label>Category <input v-model.trim="form.category" /></label>
      <label>Description <textarea v-model.trim="form.description" rows="3" /></label>
      <div class="row">
        <button class="btn ghost" @click="emit('cancel')">Cancel</button>
        <button class="btn" :disabled="!form.title || saving" @click="emit('submit', { ...form })">
          {{ saving ? 'Saving…' : product ? 'Save changes' : 'Create product' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.backdrop { position: fixed; inset: 0; background: rgba(20, 35, 46, .55); display: grid; place-items: center; padding: 1rem; z-index: 40; }
.dialog { background: #fff; padding: 1.5rem; border-radius: 10px; width: 100%; max-width: 440px; }
.row { display: flex; justify-content: flex-end; gap: .5rem; }
</style>
