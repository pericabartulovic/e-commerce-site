<template>
  <nav-bar />
  <div class="page-wrap">
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    NavBar
  }
}
</script>
