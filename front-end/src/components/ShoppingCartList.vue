<template>
    <div class="product-container" v-for="product in products" :key="product.id">
      <img :src="product.imageUrl" class="product-image">
      <div class="details-wrap">
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }}</p>
      </div>
      <button @click="$emit('remove-from-cart', product.id)" class="remove-button">Remove from Cart</button>
    </div>
    <button class="checkout-button">Proceed to Checkout</button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps(['products']);
defineEmits(["remove-from-cart"]);
</script>