<template>
  <div>
    <my-header :cartItemCount="cartItemCount"></my-header>
    <main>
      <div v-for="product in sortedProducts" v-bind:key="product.id">
        <div class="row">
          <div class="col">
            <figure>
              <img class="img-thumbnail product" :src="product.image" />
            </figure>
          </div>
          <div class="col description">
            <router-link
              tag="h1"
              :to="{ name: 'Id', params: { id: product.id } }"
              >{{ product.title }}</router-link
            >
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
            <transition mode="out-in" name="bounce">
              <span
                class="inventory-message"
                v-if="product.availableInventory - cartCount(product.id) === 0"
                key="0"
                >Stock is currently empty!</span
              >
              <span
                class="inventory-message"
                v-else-if="
                  product.availableInventory - cartCount(product.id) < 5
                "
                key=""
                >Only
                {{ product.availableInventory - cartCount(product.id) }}
                left!</span
              >
              <span class="inventory-message" v-else key="">Plenty left!</span>
            </transition>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import MyHeader from "./Header";

function compare(a, b) {
  if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
  if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
  return 0;
}

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
  computed: {
    cartItemCount() {
      return this.cart.length || "";
    },
    sortedProducts() {
      let productsArray = [];
      if (this.products.length > 0) {
        productsArray = this.products.slice(0);
      }
      return productsArray.sort(compare);
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
  created: function() {
    /*global axios*/
    console.log("starting request");
    axios
      .get("/static/products.json")
      .then((response) => {
        this.products = response.data.products;
        console.log(this.products);
      })
      .catch((error) => console.log(error));
    console.log("end axios request");
  },
};
</script>

<style scoped>
.bounce-enter-active {
  animation: shake 0.72s cubic-bezier(0.37, 0.07, 0.19, 0.97) both;
}
@keyframes shake {
  10%,
  90% {
    color: red;
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
