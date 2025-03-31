<template>
  <div class="nav-bar">
    <router-link to="/products" class="products-link">
      <div class="logo-wrap">
        <img :src="logo">
      </div>
    </router-link>
    <div class="nav-buttons-wrap">
      <button @click="signOut" v-if="user">Sign Out</button>
      <router-link to="/cart">
        <button>Shopping cart</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/logo-hexagon.svg';
import { getAuth, signOut } from 'firebase/auth';

export default {
  name: "NavBar",
  props: ['user'],
  data() {
    return {
      logo,
    }
  },
  methods: {
    async signOut() {
      const auth = getAuth();
      await signOut(auth);
      this.$router.push('/products');
    }
  }
}
</script>

<style>
.nav-bar {
  border-bottom: 1px solid #ddd;
  height: 75px;
  width: 100%;
  background: linear-gradient(45deg, #4f5f05, #e1eab9);
}

.logo-wrap {
  width: 120px;
  height: 120px;
}

.nav-buttons-wrap {
  display: flex;
  column-gap: 1rem;
  position: absolute;
  right: 16px;
  top: 16px;
}

.nav-buttons-wrap {
  position: absolute;
  right: 16px;
  top: 16px;
}

.products-link {
  text-align: center;
  display: block;
  color: black;
  font-size: 22px;
  left: 32px;
  position: absolute;
  top: 16px;
  text-decoration: none;
}

.products-link h1 {
  margin: 0;
}

.cart-link {
  position: absolute;
  right: 16px;
  top: 16px;
}

@media (max-width: 1024px) {
  .nav-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
  }

  .logo-wrap {
    width: 50px;
    height: 50px;
  }

  .nav-buttons-wrap {
    position: relative;
    right: unset;
    top: unset;
  }

  .products-link,
  .cart-link {
    position: relative;
    right: unset;
    top: unset;
    left: unset;
  }
}
</style>