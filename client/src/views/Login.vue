<template>
    <div class="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
        <div id="wrapper">
            <div class="container">
                <div class="row login-wrapper">
                    <div class="col-md-6 col-md-offset-3">
                        <div class="logo logo-center">
                            <img src="logo.png" alt="">
                        </div>

                        <div v-if="option === 'login'" class="panel panel-login">
                            <div class="panel-heading">
                                <div class="row">
                                    <div @click="goToLogin" class="col-xs-6 font-bold text-aqua-700">Login </div>
                                    <div @click="goToRegister" class="col-xs-6">Register </div>
                                </div>
                                <hr>
                            </div>
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <form id="login-form" action="#" method="post" role="form"
                                            style="display: block;">

                                            <div class="flex justify-between">
                                                <div>
                                                    <input class="" type="radio" id="one" value="email"
                                                        v-model="optionLogin">
                                                    <label class="ml-4 text-aqua-700 font-medium" for="one"> Login
                                                        with Email</label>
                                                </div>
                                                <br>
                                                <div>
                                                    <input type="radio" id="two" value="mobile" v-model="optionLogin">
                                                    <label class="ml-4 text-aqua-700 font-medium" for="two"> Login
                                                        with Mobile</label>
                                                </div>
                                                <br>
                                            </div>

                                            <div v-if="optionLogin === 'email'" class="form-group">
                                                <input v-model="emailLog" type="text" name="email" id="email"
                                                    tabindex="1" class="form-control" placeholder="Email" value="">
                                            </div>

                                            <div v-if="optionLogin === 'mobile'" class="form-group">
                                                <input v-model="mobileLog" type="text" name="mobile" id="mobile"
                                                    tabindex="1" class="form-control" placeholder="Mobile" value="">
                                            </div>

                                            <div class="form-group">
                                                <input v-model="passwordLog" type="password" name="password"
                                                    id="password" tabindex="2" class="form-control"
                                                    placeholder="Password">
                                            </div>

                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <button type="submit" @click.prevent="login"
                                                            class="w-full h-20 mx-auto text-white bg-aqua-700 hover:bg-aqua-800">Login
                                                            Account</button>
                                                    </div>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="option === 'register'" class="panel panel-login">
                            <div class="panel-heading">
                                <div class="row">
                                    <div @click="goToLogin" class="col-xs-6 ">Login </div>
                                    <div @click="goToRegister" class="col-xs-6 font-bold text-aqua-700">Register </div>
                                </div>
                                <hr>
                            </div>
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <form id="register-form" role="form">

                                            <div class="flex justify-between">
                                                <div>
                                                    <input class="" type="radio" id="one" value="email"
                                                        v-model="optionRegister">
                                                    <label class="ml-4 text-aqua-700 font-medium" for="one"> Register
                                                        with Email</label>
                                                </div>
                                                <br>
                                                <div>
                                                    <input type="radio" id="two" value="mobile"
                                                        v-model="optionRegister">
                                                    <label class="ml-4 text-aqua-700 font-medium" for="two"> Register
                                                        with Mobile</label>
                                                </div>
                                                <br>
                                            </div>

                                            <div class="form-group mt-4">
                                                <input v-model="firstNameReg" type="text" tabindex="1"
                                                    class="form-control" placeholder="First name">
                                            </div>
                                            <div class="form-group">
                                                <input v-model="lastNameReg" type="text" n tabindex="1"
                                                    class="form-control" placeholder="Last name">
                                            </div>
                                            <div class="form-group">
                                                <input v-model="emailReg" type="email" name="email" id="email"
                                                    tabindex="1" class="form-control"
                                                    :placeholder="placeholderRegisterEmail" required="true">
                                            </div>
                                            <div class="form-group">
                                                <input v-model="mobileReg" type="mobile" name="mobile" id="mobile"
                                                    tabindex="1" class="form-control"
                                                    :placeholder="placeholderRegisterMobile" value="">
                                            </div>
                                            <div class="form-group">
                                                <input v-model="passwordReg" type="password" name="password"
                                                    id="password" tabindex="2" class="form-control"
                                                    placeholder="Password">
                                            </div>
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <button type="submit" @click.prevent="register"
                                                            class="w-full h-20 mx-auto text-white bg-aqua-700 hover:bg-aqua-800">Register
                                                            an
                                                            Account</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GoogleSignInButton from 'vue-google-signin-button-directive'

    export default {
        name: 'Login',
        components: {},
        data() {
            return {
                option: 'login',
                optionLogin: 'email',
                optionRegister: 'email',
                emailLog: "",
                passwordLog: "",
                emailReg: "",
                mobileReg: "",
                passwordReg: "",
                firstNameReg: "",
                lastNameReg: "",
            }
        },
        directives: {
            GoogleSignInButton
        },
        computed: {
            errors() {
                return this.$store.state.errors
            },
            placeholderRegisterEmail() {
                if (this.optionRegister === 'email') return 'Email (required)'
                if (this.optionRegister === 'mobile') return 'Email (optional)'
            },
            placeholderRegisterMobile() {
                if (this.optionRegister === 'email') return 'Mobile number (optional)'
                if (this.optionRegister === 'mobile') return 'Mobile number (required)'
            }
        },
        methods: {
            goToLogin() {
                this.option = 'login'
            },
            goToRegister() {
                this.option = 'register'
            },
            login() {
                this.$store.dispatch('login', {
                    email: this.emailLog,
                    password: this.passwordLog
                })
            },
            register() {
                if (this.optionRegister === 'email') {
                    this.$store.dispatch('registerEmail', {
                        firstName: this.firstNameReg,
                        lastName: this.lastNameReg,
                        email: this.emailReg,
                        mobile: this.mobileReg,
                        password: this.passwordReg
                    })
                }

                if (this.optionRegister === 'mobile') {
                    console.log('sini');
                    this.$store.dispatch('registerMobile', {
                        firstName: this.firstNameReg,
                        lastName: this.lastNameReg,
                        email: this.emailReg,
                        mobile: this.mobileReg,
                        password: this.passwordReg
                    })
                }
            },
            login() {
                if (this.optionLogin === 'email') {
                    console.log('masuk siniiii');
                    this.$store.dispatch('loginEmail', {
                        email: this.emailLog,
                        password: this.passwordLog
                    })
                }

                if (this.optionLogin === 'mobile') {
                    this.$store.dispatch('loginMobile', {
                        mobile: this.mobileLog,
                        password: this.passwordLog
                    })
                }
            },
            OnGoogleAuthSuccess(idToken) {
                this.$store.dispatch('googleSignInAction', idToken)
            },
            OnGoogleAuthFail(error) {
                console.log(error)
            },
            clearSelection() {
                this.option = 'login'
                this.emailLog = ""
                this.passwordLog = ""
                this.emailReg = ""
                this.mobileReg = ""
                this.passwordReg = ""
                this.firstNameReg = ""
                this.lastNameReg = ""
            }
        },
        created() {
            this.$store.commit('SET_ERROR', '')
            this.clearSelection()
        }
    }
</script>