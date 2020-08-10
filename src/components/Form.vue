<template>
  <div>
    <my-header :cartItemCount="cartItemCount"></my-header>
    <div class="container">
      <form>
        <div class="alert alert-primary">Checkout</div>
        <div class="row">
          <div class="col-md-6">
            <div class="col">
              <strong>First Name:</strong>
            </div>
            <div class="col">
              <input v-model.trim="order.firstName" class="form-control" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="col">
              <strong>Last Name:</strong>
            </div>
            <div class="col">
              <input v-model.trim="order.lastName" class="form-control" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="col"><strong> Address:</strong></div>
            <div class="col">
              <input v-model.trim="order.address" class="form-control" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="col"><strong>City:</strong></div>
            <div class="col">
              <input v-model.trim="order.city" class="form-control" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <strong>State:</strong>
            <select v-model="order.state" class="form-control">
              <option disabled value="">State</option>
              <option
                v-for="(state, key) in states"
                v-bind:key="state.id"
                v-bind:value="state"
              >
                {{ key }}
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <strong>Zip / Postal Code:</strong>
            <input
              v-model.number="order.zip"
              type="number"
              class="form-control"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="col">
              <input
                type="radio"
                id="home"
                v-bind:value="order.home"
                v-model="order.method"
              />
              <label for="home">Home</label>
              <input
                type="radio"
                id="business"
                v-bind:value="order.business"
                v-model="order.method"
              />
              <label for="business">Business</label>
            </div>
          </div>
          <div class="col-md-6">
            <div class="col">
              <input
                type="checkbox"
                id="gift"
                value="true"
                v-bind:true-value="order.sendGift"
                v-bind:false-value="order.dontSendGift"
                v-model="order.gift"
              />
              <label for="gift">Ship as gift?</label>
            </div>
          </div>
        </div>
        <div class="">
          <pre>
                  First Name : {{ order.firstName }}
                  Last Name : {{ order.lastName }}
                  Address : {{ order.address }}
                  City : {{ order.city }}
                  State : {{ order.state }}
                  Zip : {{ order.zip }}
                  Gift : {{ order.gift }}
                  Method : {{ order.method }}
              </pre
          >
        </div>
        <div class="form-group">
          <div class="col">
            <button type="submit" class="btn btn-primary" @click="submitForm">
              Place your order
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import MyHeader from "./Header";
export default {
  name: "Form",
  props: ["cartItemCount"],
  data() {
    return {
      states: {
        FA: "Faerun",
        ZA: "Zakhara",
        KA: "Kara-tur",
        LA: "Laerakond",
      },
      order: {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        gift: "Do not send as a gift",
        method: "Home Address",
        sendGift: "Send as a gift",
        dontSendGift: "Do not send as a gift",
        business: "Business Address",
        home: "Home Address",
      },
    };
  },
  components: {
    MyHeader,
  },
  methods: {
    submitForm() {
      alert("submitted");
    },
  },
};
</script>
<style scoped></style>
