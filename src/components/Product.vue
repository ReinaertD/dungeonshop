<template>
  <div>
    <my-header></my-header>
    <h1>This is the id {{ $route.params.id }}</h1>
    <div class="row">
      <div class="col">
        <figure>
          <img class="img-thumbnail product" :src="product.image" />
        </figure>
      </div>
      <div class="col description">
        <h1>{{ product.title }}</h1>
        <p v-html="product.description"></p>
        <p class="price">{{ product.price || formatPrice }}</p>
      </div>
    </div>
    <button class="btn btn-info" @click="edit">Edit product</button>
    <router-view></router-view>
  </div>
</template>
<script>
import MyHeader from "./Header";

export default {
  components: { MyHeader },
  data() {
    return {
      product: "",
    };
  },
  methods: {
    edit() {
      this.$router.push({ name: "Edit" });
    },
  },
  created: function() {
    /*global axios*/
    axios.get("/static/products.json").then((response) => {
      this.product = response.data.products.filter(
        (data) => data.id == this.$route.params.id
      )[0];
      this.product.image = "/" + this.product.image;
    });
  },
  filters: {
    formatPrice: function(price) {
      if (!parseInt(price)) {
        return "";
      }
      if (price > 99999) {
        let priceString = (price / 100).toFixed(2);
        let priceArray = priceString.split("").reverse();
        let index = 3;
        while (priceArray.length > index + 3) {
          priceArray.splice(index + 3, 0, ",");
          index += 4;
        }
        return "€" + priceArray.reverse().join("");
      } else {
        return "€" + (price / 100).toFixed(2);
      }
    },
  },
};
</script>
<style scoped></style>
