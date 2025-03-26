<template>
  <h1>Shopping Cart</h1>
  <div v-if="cartItems.length > 0">
    <ShoppingCartList :products="cartItems"></ShoppingCartList>
  </div>
  <div v-else>You currently have no items in cart.</div>
</template>

<script>
import  ShoppingCartList from '@/components/ShoppingCartList.vue';
import axios from 'axios';
// import { cartItems } from '@/temp-data';

export default {
  name: "ShoppingCartPage",
  components: { ShoppingCartList },
  data() {
    return {
      cartItems: [],
    }
  },
  
  async created() {
    const response = await axios.get('/api/users/12345/cart');
    const cartItems = response.data;
    this.cartItems = cartItems;
  }
}
</script>