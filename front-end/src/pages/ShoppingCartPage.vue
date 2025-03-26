<template>
  <h1>Shopping Cart</h1>
  <div v-if="cartItems.length > 0">
    <ShoppingCartList :products="cartItems" @remove-from-cart="removeFromCart($event)"></ShoppingCartList>
  </div>
  <div v-else>You currently have no items in cart.</div>
</template>

<script>
import  ShoppingCartList from '@/components/ShoppingCartList.vue';
import axios from 'axios';
// import { cartItems } from '@/temp-data';

export default {
  name: "ShoppingCartPage",
  props: ['user'],
  components: { ShoppingCartList },
  data() {
    return {
      cartItems: [],
    }
  },
  
  watch: {
    async user(oldValue, newUserValue) {
      if (newUserValue) {
        const response = await axios.get(`/api/users/${newUserValue.uid}/cart`);
        const cartItems = response.data;
        this.cartItems = cartItems;
      }
    }
  },
  
  created() {
    this.fetchCartItemsOnCreated();
  },
  
  methods: {
    async removeFromCart(id) {
      try {
        const response = await axios.delete(`/api/users/${this.user.uid}/cart/${id}`);
  
        if (response.status === 200) {
          this.cartItems = response.data;
        }
      } catch (error) {
        console.error("Error removing product:", error.response?.data || error.message);
        alert("Failed to remove product. Please try again.");
      }
    },
    
    async fetchCartItemsOnCreated() {
      if (this.user) {
        const response = await axios.get(`/api/users/${this.user.uid}/cart`);
        const cartItems = response.data;
        this.cartItems = cartItems;
      }
    }
  }
}
</script>