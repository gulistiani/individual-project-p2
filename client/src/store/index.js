import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

//const axiosInstance = axios.create({ baseURL: 'https://kanban-gulis.herokuapp.com/' })
const axiosInstance = axios.create({ baseURL: 'http://localhost:3000' })

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: [],
    errors: [],
    categories: [],
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
      console.log('lalalla');
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
    fetchCategory(context) {
      axiosInstance({
        method: 'GET',
        url: '/categories',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          context.commit('SET_CATEGORY', result.data.result)
        })
        .catch(err => {
          console.log(err.response.data.error);
          console.log(err);
        })
    },
    googleSignIn(context, idToken) {
      axiosInstance({
        method: 'POST',
        url: "/login_google",
        data: {
          idToken
        }
      })
        .then(result => {
          localStorage.access_token = result.data.access_token
          localStorage.firstName = result.data.result.firstName
          localStorage.personalWorkspaceName = result.data.result.personalWorkspaceName
          localStorage.teamWorkspaceName = result.data.result.teamWorkspaceName
          context.commit('SET_CURRENT_USER', result.data.result)
          router.push('/')
        })
        .catch(err => {
          console.log(err);
        })
    },
    getCourse(context, idToken) {
      console.log('get course');
      // axiosInstance({
      //   method: 'POST',
      //   url: "/login_google",
      //   data: {
      //     idToken
      //   }
      // })
      //   .then(result => {
      //     localStorage.access_token = result.data.access_token
      //     localStorage.firstName = result.data.result.firstName
      //     localStorage.personalWorkspaceName = result.data.result.personalWorkspaceName
      //     localStorage.teamWorkspaceName = result.data.result.teamWorkspaceName
      //     context.commit('SET_CURRENT_USER', result.data.result)
      //     router.push('/')
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   })
    },
  }
})
