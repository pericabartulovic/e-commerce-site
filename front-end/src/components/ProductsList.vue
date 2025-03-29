<template>
  <div class="grid-wrap">
    <div class="product-item" v-for="product in products" :key="product.id">
      <img :src="product.imageUrl">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ product.price }}</p>
      <!-- <router-link :to="'/products/' + product.id"> -->
      <router-link :to="productItemLink(product.id)">
        <button>View Details</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

defineProps(['products']);
const productItemLink = computed(() => (id) => `/products/${id}`);
</script>

<style>
.product-item {
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 2px 5px #888;
  display: flex;
  flex-direction: column;
  margin-bottom: 2%;
  padding: 20px;
  position: relative;
  width: 32%;
}

@media (max-width: 800px) {
  .product-item {
    width: 100%;
  }
}

.product-name {
  margin-bottom: 0;
}

.product-item img {
  height: 200px;
  width: 200px;
}

.product-item a {
  width: 100%;
}

.product-item button {
  width: 100%;
}

.product-container {
  align-content: 'center';
  border-bottom: 1px solid #ddd;
  display: flex;
  padding: 16px;
  width: 100%;
}

.product-image {
  flex: 1;
  height: 100px;
  max-width: 100px;
}
</style>