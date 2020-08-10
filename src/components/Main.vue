<template>
  <div>
    <my-header :cartItmeCount="cartItemCount"></my-header>
    <main>
      <div v-for="product in sortedProducts" v-bind:key="product.id">
        <div class="row">
          <div class="col">
            <figure>
              <img class="img-thumbnail product" :src="product.image" />
            </figure>
          </div>
          <div class="col description">
            <h1 v-text="product.title"></h1>
            <p v-html="product.description"></p>
            <div class="rating">
              <span
                v-bind:class="{ 'rating-active': checkRating(n, product) }"
                v-for="n in 5"
                v-bind:key="n"
                >☆</span
              >
            </div>
            <p class="price">
              {{ product.price | formatPrice }}
            </p>
            <button
              class="btn btn-primary"
              @click="addToCart(product)"
              v-if="canAddToCart(product)"
            >
              Add to Cart
            </button>
            <button class="btn btn-warning" v-else disabled="true">
              Add to Cart
            </button>
            <span
              class="alert alert-danger"
              v-if="product.availableInventory - cartCount(product.id) === 0"
              >Stock is currently empty!</span
            >
            <span
              class="alert alert-warning"
              v-else-if="product.availableInventory - cartCount(product.id) < 5"
              >Only
              {{
                product.availableInventory - cartCount(product.id)
              }}
              left!</span
            >
            <span v-else>Plenty left!</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import MyHeader from "./Header";

var APP_LOG_LIFECYCLE_EVENTS = true;

export default {
  name: "imain",
  components: {
    MyHeader,
  },
  data() {
    return {
      products: {},
      cart: [],
    };
  },
  methods: {
    addToCart(aProduct) {
      this.cart.push(aProduct.id);
    },
    showCheckout() {
      this.showProduct = this.showProduct ? false : true;
    },
    submitForm() {
      console.log(this.order);
      alert("Submitted");
    },
    checkRating(n, myProduct) {
      return myProduct.rating - n >= 0;
    },
    canAddToCart(aProduct) {
      return aProduct.availableInventory > this.cartCount(aProduct.id);
    },
    cartCount(id) {
      let count = 0;
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === id) {
          count++;
        }
      }
      return count;
    },
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
  beforeCreate: () => {
    if (APP_LOG_LIFECYCLE_EVENTS) {
      console.log("beforeCreate");
    }
  },
  created: function() {
    // eslint-disable-next-line no-undef
    axios
      .get("/static/products.json")
      .then((response) => {
        this.products = response.data.products;
        console.log(this.products);
      })
      .catch((error) => console.log(error));
  },
  beforeMount: () => {
    if (APP_LOG_LIFECYCLE_EVENTS) {
      console.log("beforeMount");
    }
  },
  mounted: () => {
    if (APP_LOG_LIFECYCLE_EVENTS) {
      console.log("mounted");
    }
  },
  beforeUpdate: () => {
    if (APP_LOG_LIFECYCLE_EVENTS) {
      console.log("beforeUpdate");
    }
  },
  updated: () => {
    if (APP_LOG_LIFECYCLE_EVENTS) {
      console.log("updated");
    }
  },
  beforeDestroy: () => {
    if (APP_LOG_LIFECYCLE_EVENTS) {
      console.log("beforeDestroy");
    }
  },
  destroyed: () => {
    if (APP_LOG_LIFECYCLE_EVENTS) {
      console.log("destroyed");
    }
  },
};
</script>

<style scoped></style>
