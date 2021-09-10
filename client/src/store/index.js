import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

const axiosInstance = axios.create({ baseURL: 'https://academyster.herokuapp.com' })
//const axiosInstance = axios.create({ baseURL: 'http://localhost:3000' })

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: [],
    errors: [],
    categories: [],
    products: [],
    productDetail: [],
    productDetailTopics: [],
    topic: [],
    carts: [],
    promo: [],
    voucher: [],
    trxHeads: [],
    trxHeadFull: [],
    trxDetails: [],
    quote: [],
  },
  mutations: {
    SET_CURRENT_USER(state, payload) {
      state.currentUser = payload
    },
    SET_ERROR(state, payload) {
      state.errors = payload
    },
    SET_CATEGORY(state, payload) {
      state.categories = payload
    },
    SET_PRODUCT(state, payload) {
      state.products = payload
    },
    SET_PRODUCT_DETAIL(state, payload) {
      state.productDetail = payload
    },
    SET_PRODUCT_TOPIC(state, payload) {
      state.productDetailTopics = payload
    },
    SET_TOPIC(state, payload) {
      state.topic = payload
    },
    SET_CART(state, payload) {
      state.carts = payload
    },
    SET_PROMO(state, payload) {
      state.promo = payload
    },
    SET_VOUCHER(state, payload) {
      state.voucher = payload
    },
    SET_TRANSACTION_HEAD(state, payload) {
      state.trxHeads = payload
    },
    SET_TRANSACTION_HEAD_FULL(state, payload) {
      state.trxHeadFull = payload
    },
    SET_TRANSACTION_DETAIL(state, payload) {
      state.trxDetails = payload
    },
    SET_QUOTE(state, payload) {
      state.quote = payload
    },
  },
  actions: {
    registerEmail(context, payload) {
      axiosInstance({
        method: 'POST',
        url: '/register/email',
        data: {
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          mobile: payload.mobile,
          password: payload.password
        }
      })
        .then(result => {
          Vue.swal("Successfully registered");
          context.commit('SET_ERROR', '')
          router.push('/login')
        })
        .catch(err => {
          Vue.swal(err.response.data.error.message);
          console.log(err.response.data);
          context.commit('SET_ERROR', err.response.data.error)
        })
    },
    registerMobile(context, payload) {
      axiosInstance({
        method: 'POST',
        url: '/register/mobile',
        data: {
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          mobile: payload.mobile,
          password: payload.password
        }
      })
        .then(result => {
          Vue.swal("Successfully registered");
          context.commit('SET_ERROR', '')
          router.push('/login')
        })
        .catch(err => {
          Vue.swal(err.response.data.error.message);
          console.log(err.response.data);
          context.commit('SET_ERROR', err.response.data.error)
        })
    },
    loginEmail(context, payload) {
      axiosInstance({
        method: 'POST',
        url: '/login/email',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(result => {
          localStorage.access_token = result.data.access_token
          context.commit('SET_CURRENT_USER', result.data.result)
          router.push('/')
        })
        .catch(err => {
          console.log(err.response.data.error);
          context.commit('SET_ERROR', err.response.data.error)
        })
    },
    loginMobile(context, payload) {
      axiosInstance({
        method: 'POST',
        url: '/login/mobile',
        data: {
          mobile: payload.mobile,
          password: payload.password
        }
      })
        .then(result => {
          localStorage.access_token = result.data.access_token
          context.commit('SET_CURRENT_USER', result.data.result)
          router.push('/')
        })
        .catch(err => {
          console.log(err.response.data.error);
          context.commit('SET_ERROR', err.response.data.error)
        })
    },
    googleSignIn(context, idToken) {
      axiosInstance({
        method: 'POST',
        url: "/login/google",
        data: {
          idToken
        }
      })
        .then(result => {
          localStorage.access_token = result.data.access_token
          localStorage.firstName = result.data.result.firstName
          context.commit('SET_CURRENT_USER', result.data.result)
          router.push('/')
        })
        .catch(err => {
          console.log(err);
        })
    },
    getProduct(context, payload) {
      axiosInstance({
        method: 'POST',
        url: '/products',
        data: {
          limit: payload.limit
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          context.commit('SET_PRODUCT', result.data.result)
        })
        .catch(err => {
          console.log(err.response.data.error);
        })
    },
    searchProduct(context, payload) {
      axiosInstance({
        method: 'GET',
        url: '/products/search/' + payload.inputSearch,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          context.commit('SET_PRODUCT', result.data.result)
        })
        .catch(err => {
          console.log(err.response.data.error);
        })
    },
    getProductDetail(context, payload) {

      axiosInstance({
        method: 'GET',
        url: '/products/' + payload.productId,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          context.commit('SET_PRODUCT_DETAIL', result.data.result[0])

          axiosInstance({
            method: 'GET',
            url: '/products/topic/' + payload.productId,
            headers: {
              access_token: localStorage.access_token
            }
          })
            .then(result => {
              context.commit('SET_PRODUCT_TOPIC', result.data.result)
              router.push('/course-detail/' + payload.productId)
            })
            .catch(err => {
              console.log(err.response.data.error);
            })

        })
        .catch(err => {
          console.log(err.response.data.error);
        })
    },
    getTopicDetail(context, payload) {
      return axiosInstance({
        method: 'POST',
        url: '/topics',
        data: {
          productId: payload.productId,
          sequence: payload.sequence
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    saveWatched(context, payload) {
      axiosInstance({
        method: 'POST',
        url: '/saveWatched',
        data: {
          productId: payload.productId,
          productDetailId: payload.productDetailId,
          watched: payload.watched
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          context.dispatch('getTopicDetail', { productId: payload.productId, sequence: payload.sequence })
          // context.commit('SET_WATCHED', result.data.result)
        })
        .catch(err => {
          console.log(err.response.data.error);
        })
    },
    addToCart(context, payload) {
      axiosInstance({
        method: 'POST',
        url: '/cart/add/' + payload.productId,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          Swal.fire(result.data.message)
          context.dispatch('getProduct', { limit: 'all' })
          context.dispatch('getCart')
        })
        .catch(err => {
          Swal.fire(err.response.data.error.message)
          console.log(err.response.data.error);
        })
    },
    deleteFromCart(context, payload) {
      axiosInstance({
        method: 'POST',
        url: '/cart/delete/' + payload,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          context.dispatch('getCart')
        })
        .catch(err => {
          console.log(err.response.data.error);
        })
    },
    getCart(context, payload) {
      axiosInstance({
        method: 'GET',
        url: '/cart',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          context.commit('SET_CART', result.data.result)
        })
        .catch(err => {
          console.log(err.response.data.error);
        })
    },
    getPromo(context, payload) {
      axiosInstance({
        method: 'GET',
        url: '/promotions/code/' + payload,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          if (result.data.result.length === 0) {
            Swal.fire('Kode coupon tidak ditemukan/sudah tidak berlaku')
          }
          context.commit('SET_PROMO', result.data.result)
        })
        .catch(err => {
          console.log(err.response.data.error);
        })
    },
    getVoucher(context, payload) {
      axiosInstance({
        method: 'GET',
        url: '/vouchers/code/' + payload,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          if (result.data.result.length === 0) {
            Swal.fire('Kode voucher tidak ditemukan/sudah tidak berlaku')
          }
          context.commit('SET_VOUCHER', result.data.result)
        })
        .catch(err => {
          console.log(err.response.data.error);
        })
    },
    usePromotion(context, payload) {
      axiosInstance({
        method: 'PATCH',
        url: '/promotions/' + payload.promotionCode,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => { })
        .catch(err => {
          console.log(err.response.data.error);
        })
    },
    redeemVoucher(context, payload) {
      axiosInstance({
        method: 'PATCH',
        url: '/vouchers/' + payload.voucherCode,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => { })
        .catch(err => {
          console.log(err.response.data.error);
        })
    },
    createTrxHead(context, payload) {
      return axiosInstance({
        method: 'POST',
        url: '/checkout/header',
        data: {
          userId: payload.userId,
          customerName: payload.customerName,
          subTotal: payload.subTotal,
          promoId: payload.promoId,
          promoCode: payload.promoCode,
          promoAmount: payload.promoAmount,
          promoAmountUsed: payload.promoAmountUsed,
          voucherId: payload.voucherId,
          voucherCode: payload.voucherCode,
          voucherAmount: payload.voucherAmount,
          voucherAmountUsed: payload.voucherAmountUsed,
          total: payload.total,
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    createTrxDetail(context, payload) {
      return axiosInstance({
        method: 'POST',
        url: '/checkout/detail',
        data: {
          trxHeadId: payload.trxHeadId,
          productName: payload.productName,
          finalPrice: payload.finalPrice
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    deleteCartAfterCheckout(context, payload) {
      return axiosInstance({
        method: 'DELETE',
        url: '/checkout/deleteCartAfterCheckout/' + payload.userId,
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    createEnrollment(context, payload) {
      return axiosInstance({
        method: 'POST',
        url: '/checkout/enroll',
        data: {
          productId: payload.productId
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    getTrxHead(context, payload) {
      axiosInstance({
        method: 'GET',
        url: '/transactions/head',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          context.commit('SET_TRANSACTION_HEAD', result.data.result)
        })
        .catch(err => {
          console.log(err.response.data.error);
        })
    },
    getTrxHeadById(context, payload) {
      axiosInstance({
        method: 'GET',
        url: '/transactions/head/' + payload.trxHeadId,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          context.commit('SET_TRANSACTION_HEAD_FULL', result.data.result)
        })
        .catch(err => {
          console.log(err.response.data.error);
        })
    },
    getTrxDetail(context, payload) {
      axiosInstance({
        method: 'GET',
        url: '/transactions/detail/' + payload.trxHeadId,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          context.commit('SET_TRANSACTION_DETAIL', result.data.result)
        })
        .catch(err => {
          console.log(err.response.data.error);
        })
    },
    getQuote(context, payload) {
      axiosInstance({
        method: 'GET',
        url: 'https://goquotes-api.herokuapp.com/api/v1/random?count=1',
      })
        .then(result => {
          context.commit('SET_QUOTE', result.data.quotes[0])
        })
        .catch(err => {
          console.log(err.response.data.error);
        })
    },
  }
})
