<template>
  <div v-if="product">
    <div class="img-wrap">
      <img :src="product.imageUrl" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">{{ product.price }}</h3>
      <button @click="addToCart" class="add-to-cart">Add to cart</button>
    </div>
  </div>
  <div v-else>
    <not-found-page />
  </div>
</template>

<script>
import axios from 'axios';
import NotFoundPage from './NotFoundPage.vue';
// import { products } from '@/temp-data';

export default {
  name: "ProductDetailPage",
  components: { NotFoundPage },
  data() {
    return {
      product: {},
    }
  },
  
  async created() {
    const productId = this.$route.params.productId
    const response = await axios.get(`/api/products/${productId}`);
    const product = response.data;
    this.product = product;
  },
  
  methods: {
    async addToCart() {
      const productId = this.$route.params.productId; 
      await axios.post('/api/users/12345/cart', {productId});
      alert('Successfully added to cart!');
    }
  }
}
</script>