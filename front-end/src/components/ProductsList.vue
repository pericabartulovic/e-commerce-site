<template>
  <div class="grid-wrap">
    <div class="product-item" v-for="(product, index) in products" :key="product.id">
      <div class="product-item__img-cont" :class="getBgClass(index)">
        <img :src="product.imageUrl">
      </div>
      <div class="product-item__details">
        <h3 class="product-name">{{ product.nae }}</h3>
        <p class="product-price">{{ product.price }}</p>
        <!-- <router-link :to="'/products/' + product.id"> -->
        <router-link :to="productItemLink(product.id)">
          <button>View Details</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

defineProps(['products']);
const productItemLink = computed(() => (id) => `/products/${id}`);

function getBgClass(index) {
  const classes = ['bg-green', 'bg-yellow', 'bg-orange'];
  return classes[index % classes.length];
}
</script>

<style>
.product-item {
  align-items: center;
  border-radius: 0.2rem;
  box-shadow: 0px 2px 5px #e9ecde;
  display: flex;
  flex-direction: column;
  margin-bottom: 2%;
  position: relative;
  width: 32%;
}

.product-item__img-cont {
  background: #c8cfac;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 1rem;
  border-radius: 0.2rem 0.2rem 0 0;
}

.bg-green {
  background: #c8cfac;
}

.bg-yellow {
  background: #7a9f96;
}

.bg-orange {
  background: #6c788a;
}

.product-item__details {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

@media (max-width: 800px) {
  .product-item {
    width: 100%;
  }
}

.product-name {
  margin-bottom: 0;
}

.product-price {
  font-weight: 500;
}

.product-item img {
  height: 220px;
  width: 220px;
  transform: translateY(20px);
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