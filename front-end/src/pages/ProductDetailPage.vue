<template>
  <div v-if="product">
    <div class="img-wrap">
      <img :src="product.imageUrl" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">{{ product.price }}</h3>
      <button v-if="user" @click="addToCart" :class="{ 'grey-button': isInCart, 'add-to-cart': !isInCart}" :disabled="isInCart">
        {{ isInCart ? 'Already in Cart' : 'Add to Cart' }}
      </button>
      <button v-else class="sign-in" @click="singIn">Sign in to add to cart</button>
    </div>
  </div>
  <div v-else>
    <not-found-page />
  </div>
</template>

<script>
import axios from 'axios';
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import NotFoundPage from './NotFoundPage.vue';
// import { cartItems } from '@/temp-data';
// import { products } from '@/temp-data';

export default {
  name: "ProductDetailPage",
  props: ['user'],
  components: { NotFoundPage },
  data() {
    return {
      product: {},
      cartItems: [],
    }
  },

  created() {
    this.isSignedInWithEmailLink();
    this.fetchProduct();
    this.fetchCartItems();
  },
  
  watch: {
    async user(newUserValue) {
      if (newUserValue) {
        const response = await axios.get(`/api/users/${newUserValue.uid}/cart`);        
        const cartItems = response.data;
        this.cartItems = cartItems;
      }
    }
  },

  methods: {
    async addToCart() {
      const id = this.$route.params.productId;
      await axios.post(`/api/users/${this.user.uid}/cart`, { id });
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
      if (this.user) {        
        const response = await axios.get(`/api/users/${this.user.uid}/cart`);
        console.log(response);
        
        const cartItems = response.data;
        this.cartItems = cartItems;
      }
    },
    
    async singIn() {
      const email = prompt('Enter your email to sign in...');
      const auth = getAuth();
      const actionCodeSettings = {
        url: `http://localhost:8080/products/${this.$route.params.productId}`, //local 
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      alert('A login link was sent to the email you provided');
      window.localStorage.setItem('emailForSignIn', email);
    },
    
    async isSignedInWithEmailLink() {
      const auth = getAuth();
      if (isSignInWithEmailLink(auth, window.location.href)) {
        const email = window.localStorage.getItem('emailForSignIn')
        await signInWithEmailLink(auth, email, window.location.href);
        alert('Successfully signed in!');
        window.localStorage.removeItem('emailForSignIn');
      }
    } 
  },

  computed: {
    isInCart() {
      console.log(this.cartItems.some(item => item.id === this.$route.params.productId));
      
      return this.cartItems.some(item => item.id === this.$route.params.productId);
    }
  }
}
</script>