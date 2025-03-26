<template>
  <div v-if="product">
    <div class="img-wrap">
      <img :src="product.imageUrl" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">{{ product.price }}</h3>
      <button @click="addToCart" :class="{ 'grey-button': isInCart, 'add-to-cart': !isInCart }" :disabled="isInCart">
        {{ isInCart ? 'Already in Cart' : 'Add to Cart' }}
      </button>
    </div>
  </div>
  <div v-else>
    <not-found-page />
  </div>
</template>

<script>
import axios from 'axios';
import NotFoundPage from './NotFoundPage.vue';
// import { cartItems } from '@/temp-data';
// import { products } from '@/temp-data';

export default {
  name: "ProductDetailPage",
  components: { NotFoundPage },
  data() {
    return {
      product: {},
      cartItems: [],
    }
  },

  async created() {
    this.fetchProduct();
    this.fetchCartItems();
  },

  methods: {
    async addToCart() {
      const id = this.$route.params.productId;
      await axios.post('/api/users/12345/cart', { id });
      alert('Successfully added to cart!');
      this.fetchCartItems();
    },
    
    async fetchProduct() {
      const productId = this.$route.params.productId
      const response = await axios.get(`/api/products/${productId}`);
      const product = response.data;
      this.product = product;
    },
    
    async fetchCartItems () {
      const response2 = await axios.get('/api/users/12345/cart');
      const cartItems = response2.data;
      this.cartItems = cartItems;
    },
  },

  computed: {
    isInCart() {
      return this.cartItems.some(item => item.id === this.$route.params.productId);
    }
  }
}
</script>