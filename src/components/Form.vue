<template>
<my-header :cartItemCount="cartItemCount">
  <div>
    <div v-for="product in sortedProducts">
      <div class="row">
        <div class="col">
          <figure>
            <img class="img-thumbnail product" :src="product.image" />
          </figure>
        </div>
        <div class="col">
          <h1 v-text="product.title"></h1>
          <p v-html="product.description"></p>
          <div class="rating">
            <span
              v-bind:class="{ 'rating-active': checkRating(n, product) }"
              v-for="n in 5"
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
            {{ product.availableInventory - cartCount(product.id) }} left!</span
          >
          <span v-else>Plenty left!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from './Header';
export default {
    name:'Form',
    props: ['cartItemCount'],
    data(){
        return{
            states:{
                    FA: 'Faerun',
                    ZA:'Zakhara',
                    KA:'Kara-tur',
                    LA:'Laerakond'
            },
            order: {
                    firstName: "",
                    lastName: "",
                    address: "",
                    city: "",
                    state: "",
                    zip: "",
                    gift: 'Do not send as a gift',
                    method: "Home Address",
                    sendGift:'Send as a gift',
                    dontSendGift: 'Do not send as a gift',
                    business: 'Business Address',
                    home: 'Home Address'
            },
        }
    },
    components:{
        MyHeader,
    },
    methods:{
        submitForm(){
            alert('submitted')
        },
        

    }
};
</script>
<style scoped></style>
