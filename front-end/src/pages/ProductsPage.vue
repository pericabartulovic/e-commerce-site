<template>
  <h1>Products</h1>
  <products-list :products="products"></products-list>
</template>

<script>
import ProductsList from '@/components/ProductsList.vue';
import axios from 'axios';
// import { products } from '@/temp-data';

export default {
  name: "ProductsPage",
  components: { ProductsList },
  data() {
    return {
      products: [],
    }
  },
  async created() {
    const response = await axios.get('/api/products');
    const products = response.data;
    this.products = products;
  }
}
</script>