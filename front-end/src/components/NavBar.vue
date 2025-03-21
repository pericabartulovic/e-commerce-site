<template>
  <div class="nav-bar">
    <router-link to="/products" class="products-link">
      <div class="logo-wrap">
        <img :src="logo" @click="displayImage()">
      </div>
    </router-link>
    <router-link to="/cart" class="cart-link">
      <button>Shopping cart</button>
    </router-link>
  </div>
</template>

<script>
import logo from '@/assets/logo-hexagon.svg';

export default {
  name: "NavBar",
  data() {
    return {
      logo,
    }
  },
  methods: {
    displayImage() {
      console.log(this.logo);

    }
  }
}
</script>