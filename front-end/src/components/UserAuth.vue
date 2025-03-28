<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">E-Mail</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <p v-if="!formIsValid">
        Please enter a valid email.
      </p>
      <button>Submit</button>
    </form>
  </base-card>
</template>

<script>
import BaseCard from "./UI/BaseCard.vue";

export default {
  components: {
    BaseCard,
  },
  emits: ['submitForm'],
  data() {
    return {
      email: '',
      formIsValid: true,
    };
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@')
      ) {
        this.formIsValid = false;
        return;
      }

      this.$emit('submitForm', this.email);
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: .5rem;
  border-radius: 0.5rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
