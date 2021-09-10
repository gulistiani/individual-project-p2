<template>
  <div class="">

    <div id="owl-featured-2" class="owl-custom grid gap-3  mt-5 md:grid-cols-4 mx-10">

      <div v-for="(product, index) in products" class="owl-featured">
        <div class="shop-item-list entry">
          <div @click.prevent="getProductDetail(product.id)" class="">
            <img :src="product.imagePath" :alt="product.name">
            <div class="magnifier">
            </div>
          </div>
          <div class="shop-item-title clearfix">
            <h4><a @click.prevent="getProductDetail(product.id)"> {{product.name}}</a></h4>
            <p>{{product.description}}</p>
            <div class="shopmeta">
              <span v-if="product.discountedPrice" class="pull-left line-through"> Rp.
                {{ Number(product.price).toLocaleString() }}</span>
              <span v-if="product.discountedPrice" class="ml-2 pull-left font-bold"> Rp.
                {{ Number(product.discountedPrice).toLocaleString() }}</span>
              <span v-if="!product.discountedPrice" class="pull-left"> Rp.
                {{ Number(product.price).toLocaleString() }}</span>
              <div class="rating pull-right">
                <i class="mdi mdi-star"></i>
                <i class="mdi mdi-star"></i>
                <i class="mdi mdi-star"></i>
                <i class="mdi mdi-star"></i>
                <i class="mdi mdi-star"></i>
              </div>
            </div>
          </div>

          <div v-if="!product.discountedPrice && product.enrollment === 0 && product.inCart === 0 && user"
            class="shop-button clearfix" @click="addToCart(product.id)">
            <a class="btn btn-default btn-block">Rp.
              {{ Number(product.price).toLocaleString() }} BELI</a>
          </div>

          <div v-if="product.discountedPrice && product.enrollment === 0 && product.inCart === 0 && user"
            class="shop-button clearfix" @click="addToCart(product.id)">
            <a class="btn btn-default btn-block">Rp.
              {{ Number(product.discountedPrice).toLocaleString() }} BELI</a>
          </div>

          <div v-if="!product.discountedPrice && !user" class="shop-button clearfix" @click="addToCart(product.id)">
            <a class="btn btn-default btn-block">Rp.
              {{ Number(product.price).toLocaleString() }} BELI</a>
          </div>

          <div v-if="product.discountedPrice && !user" class="shop-button clearfix" @click="addToCart(product.id)">
            <a class="btn btn-default btn-block">Rp.
              {{ Number(product.discountedPrice).toLocaleString() }} BELI</a>
          </div>

          <div v-if="product.inCart === 1" disabled class="shop-button clearfix">
            <a class="btn bg-gray-400 hover:bg-gray-400 text-gray-700 hover:text-gray-700  btn-block">ADDED TO CART</a>
          </div>

          <div v-if="product.enrollment === 1 " class="shop-button clearfix">
            <a class="btn btn-primary btn-block" @click.prevent="getProductDetail(product.id)">GO TO COURSE</a>
          </div>


        </div>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'Card',
    components: {},
    data() {
      return {
      }
    },
    computed: {
      user() {
        if (localStorage.access_token) return true
        else return false
      },
      products() {
        if (this.$route.name !== 'MyLearning') {
          return this.$store.state.products
        } else {
          return this.$store.state.products.filter(function (el) { return el.enrollment === 1 });
        }
      },
    },
    methods: {
      getProductDetail(productId) {
        this.$store.dispatch('getProductDetail', { productId })
      },
      addToCart(productId) {
        if (!localStorage.access_token) {
          Swal.fire({
            title: 'Halo kak',
            text: "Untuk belanja login dulu yuks :)",
            showCancelButton: true,
            confirmButtonColor: '#1b7501',
            cancelButtonColor: '#e38a05',
            confirmButtonText: `Ok, no prob`,
            cancelButtonText: `Liat-liat dulu deh`
          }).then((result) => {
            if (result.isConfirmed === true) {
              this.$router.push('/login')
            }
          })
        } else {
          this.$store.dispatch('addToCart', { productId })
        }
      },
    },
    created() {
    }
  }
</script>