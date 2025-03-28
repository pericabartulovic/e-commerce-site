<template>
  <div v-if="product">
    <div class="img-wrap">
      <img :src="product.imageUrl" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">{{ product.price }}</h3>
      <button v-if="user" @click="addToCart" :class="{ 'grey-button': isInCart, 'add-to-cart': !isInCart }"
        :disabled="isInCart">
        {{ isInCart ? 'Already in Cart' : 'Add to Cart' }}
      </button>
      <button v-else class="sign-in" @click="toggleForm">Sign in to add to cart</button>
      <base-dialog :show="isOpen" :title="title" @close="toggleForm">
        <base-spinner v-if="isLoading"></base-spinner>
        <user-auth @submitForm="singIn" @close="toggleForm" v-if="!isSignedFromEmailLink"></user-auth>
      </base-dialog>
    </div>
  </div>
  <div v-else>
    <not-found-page />
  </div>
</template>

<script>
import axios from 'axios';
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import BaseDialog from "@/components/UI/BaseDialog.vue"
import BaseSpinner from "@/components/UI/BaseSpinner.vue";
import UserAuth from '@/components/UserAuth.vue';
import NotFoundPage from './NotFoundPage.vue';
// import { cartItems } from '@/temp-data';
// import { products } from '@/temp-data';

export default {
  name: "ProductDetailPage",
  props: ['user'],
  components: { UserAuth, NotFoundPage, BaseSpinner, BaseDialog },
  data() {
    return {
      product: {},
      cartItems: [],
      isOpen: false,
      isLoading: false,
      isSuccess: false,
      isSignedFromEmailLink: false,
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

    async fetchCartItems() {
      if (this.user) {
        const response = await axios.get(`/api/users/${this.user.uid}/cart`);
        console.log(response);

        const cartItems = response.data;
        this.cartItems = cartItems;
      }
    },

    async singIn(email) {
      this.isLoading = true;
      const auth = getAuth();
      const actionCodeSettings = {
        url: `http://localhost:8080/products/${this.$route.params.productId}`, //local 
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      this.isLoading = false;
      this.isSuccess = true;
      setTimeout(() => {
        this.isOpen = false;
      }, 5000);
    },

    async isSignedInWithEmailLink() {
      const auth = getAuth();
      if (isSignInWithEmailLink(auth, window.location.href)) {
        const email = window.localStorage.getItem('emailForSignIn')
        if (email) {
          try {
            await signInWithEmailLink(auth, email, window.location.href);
            this.isOpen = true;
            this.isSignedFromEmailLink = true;

            setTimeout(() => {
              this.isSignedFromEmailLink = false;
              this.isOpen = false;
            }, 3000);

            window.localStorage.removeItem('emailForSignIn');
          } catch (error) {
            console.error("Error signing in:", error);
          }
        } else {
          console.error("No email provided.");
        }
      }
    },
    toggleForm() {
      this.isOpen = !this.isOpen;
    }
  },

  computed: {
    isInCart() {
      return this.cartItems.some(item => item.id === this.$route.params.productId);
    },
    title() {
      switch (true) {
        case this.isLoading:
          return 'Authenticating...';
        case this.isSuccess:
          return 'A login link was sent to the email you provided.';
        case this.isSignedFromEmailLink:
          return 'Successfully signed in!';
        default:
          return 'Enter your e-mail';
      }
    }
  }
}
</script>