<template>
  <div>
    <div class="navbar navbar-light">
      <div class="navbar-header">
        <h1>
          <router-link :to="{ name: 'iMain' }">{{ siteName }}</router-link>
        </h1>
      </div>
      <div class="nav navbar-right navbar-nav cart">
        <router-link
          active-class="active"
          class="btn btn-info"
          :to="{ name: 'Form' }"
        >
          <span class="fas fa-shopping-cart">{{ cartItemCount }}</span>
          Checkout
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-header",
  data() {
    return {
      siteName: "Vue.js Dungeon Supplies Store",
    };
  },
  props: ["cartItemCount"],
  methods: {
    showCheckout() {
      this.$router.push({ name: "Form" });
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
.router-link-exact-active {
}
</style>
