<template>
  <h1>Products</h1>
  <products-list :products="products"></products-list>
</template>

<script>
import { products } from '@/temp-data';
import ProductsList from '@/components/ProductsList.vue'
export default {
  name: "ProductsPage",
  components: { ProductsList },
  data() {
    return {
      products,
    }
  },
}
</script>