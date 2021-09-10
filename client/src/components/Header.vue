<template>
    <header class="header">
        <div class="container">
            <div class="hovermenu menu">
                <div class="pt-6 mr-10" role="navigation">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target=".navbar-collapse">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="mdi mdi-bars"></span>
                        </button>

                        <div class="pb-2 text-left">
                            <img src="/logo.png" width=100 height=50 alt="">
                        </div>

                    </div>

                    <div class="flex navbar-right pt-2">
                        <ul class="nav navbar-nav">
                            <li @click="goToHome"
                                class="py-2 px-6 text-center  rounded text-2xl text-aqua-700 hover:text-aqua-800 hover:bg-aqua">
                                Home
                            </li>
                            <li @click="goToAbout"
                                class="py-2 px-6 text-center  rounded text-2xl text-aqua-700 hover:text-aqua-800 hover:bg-aqua">
                                About </li>
                            <li @click="goToCourse"
                                class="py-2 px-6 text-center  rounded text-2xl text-aqua-700 hover:text-aqua-800 hover:bg-aqua">
                                Courses </li>
                            <li v-if="user" @click="goToMyLearning"
                                class="py-2 px-6 text-center  rounded text-2xl text-aqua-700 hover:text-aqua-800 hover:bg-aqua">
                                My Learning </li>
                            <li v-if="user" @click="goToAccount"
                                class="mr-6 py-2 px-6 text-center  rounded text-2xl text-aqua-700 hover:text-aqua-800 hover:bg-aqua">
                                Account </li>
                            <!-- <li @click="goToFAQ"
                                class="mr-6 py-2 px-6 text-center  rounded text-2xl text-aqua-700 hover:text-aqua-800 hover:bg-aqua">
                                FAQ </li> -->

                            <li @click="goToCart"
                                class="mdi mdi-cart-outline text-5xl mr-6  px-6 text-center  rounded text-2xl text-aqua-700 hover:text-aqua-800">
                            </li>
                        </ul>

                        <ul class="nav navbar-nav navbar-right pt-21mx-10">
                            <li v-if="!user" @click="goToLogin"
                                class="py-2 px-4 w-48 text-center rounded-lg text-2xl text-white bg-aqua-700 hover:bg-aqua-800">
                                <i class="mdi mdi-account-outline"></i> Login
                            </li>
                            <li v-if="user" @click="logout"
                                class="py-2 px-4 w-48 text-center rounded-lg text-2xl text-white bg-aqua-700 hover:bg-aqua-800">
                                <i class="mdi mdi-logout"></i> Logout
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: 'Header',
        components: {},
        data() {
            return {

            }
        },
        computed: {
            isLoogedIn() {
                if (localStorage.access_token) return true
                else return false
            },
            user() {
                return this.$store.state.currentUser
            },
        },
        methods: {
            goToHome() {
                this.$router.push('/')
            },
            goToAbout() {
                this.$router.push('/about')
            },
            goToCourse() {
                this.$router.push('/courses')
            },
            goToMyLearning() {
                this.$router.push('/mylearning')
            },
            goToAccount() {
                this.$router.push('/account')
            },
            goToFAQ() {
                this.$router.push('/faq')
            },
            goToCart() {
                this.$router.push('/cart')
            },
            goToLogin() {
                this.$router.push('/login')
            },
            logout() {
                Swal.fire({
                    title: 'Logout?',
                    text: "You will be missed :(",
                    showCancelButton: true,
                    confirmButtonColor: '#1b7501',
                    cancelButtonColor: '#e38a05',
                    confirmButtonText: `Yes, I'll be back`
                }).then((result) => {
                    if (result.isConfirmed === true) {
                        localStorage.clear()
                        this.$store.commit('SET_CURRENT_USER', '')
                        Swal.fire('You have signed out')
                        this.$store.dispatch('getProduct', { limit: 'all' })

                        //if (this.$route.name !== 'Home') {
                        this.$router.push('/')
                        //}
                    }
                })
            }
        },
        created() {
        }
    }
</script>