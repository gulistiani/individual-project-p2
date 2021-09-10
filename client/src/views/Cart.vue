<template>
    <div class="">
        <Header></Header>

        <section class="grey section">
            <div class="container">
                <div class="row">
                    <div id="content" class="col-md-12 col-sm-12 col-xs-12">
                        <div class="blog-wrapper">
                            <div class="row second-bread">
                                <div class="col-md-6 mt-6 text-left">
                                    <h1>Cart & Checkout</h1>
                                </div>
                            </div>
                        </div>
                        <div class="blog-wrapper">
                            <div class="blog-desc">
                                <div class="shop-cart">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>
                                                    Item Name
                                                </th>
                                                <th>
                                                    Item Price
                                                </th>
                                                <th>
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-if="carts !== 'Tidak ada produk di keranjang'"
                                                v-for="(cart, index) in carts" :key="cart.id">
                                                <td>
                                                    <img :src="cart.imagePath" :alt="cart.name"
                                                        class="alignleft img-thumbnail"> {{cart.productName}}
                                                </td>
                                                <td class="w-80">
                                                    <div v-if="cart.productDiscountedPrice">
                                                        <span class="line-through">
                                                            Rp. {{ Number(cart.productPrice).toLocaleString() }}
                                                        </span>
                                                        <span class="ml-4">
                                                            Rp.
                                                            {{ Number(cart.productDiscountedPrice).toLocaleString() }}
                                                        </span>
                                                    </div>

                                                    <div v-else class="">
                                                        Rp. {{ Number(cart.productPrice).toLocaleString() }}
                                                    </div>
                                                </td>
                                                <td class="text-center">
                                                    <span @click="deleteFromCart(cart.id)"
                                                        class="mdi mdi-trash-can-outline text-4xl text-red-500 hover:text-red-700 transform hover:scale-125"></span>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th colspan="5" class="text-right "> Sub Total:
                                                    <span class=" line-through">
                                                        Rp. {{ Number(totalGrossPrice).toLocaleString() }}
                                                    </span>
                                                    <span class="ml-4 font-bold">
                                                        Rp. {{ Number(totalNetPrice).toLocaleString() }}
                                                    </span>

                                                </th>
                                            </tr>
                                            <tr v-if="kodePromo">
                                                <th colspan="5" class="text-right "> Coupon:
                                                    <span class="ml-4 font-bold">
                                                        Rp. {{ Number(nilaiPromo).toLocaleString() }}
                                                    </span>

                                                </th>
                                            </tr>
                                            <tr v-if="kodeVoucher">
                                                <th colspan="5" class="text-right "> Voucher/Gift Card:
                                                    <span class="ml-4 font-bold">
                                                        Rp. {{ Number(nilaiVoucher).toLocaleString() }}
                                                    </span>

                                                </th>
                                            </tr>
                                            <tr>
                                                <th colspan="5" class="text-right "> Total:
                                                    <span class="ml-4 font-bold">
                                                        Rp. {{ Number(totalAfterVoucher).toLocaleString() }}
                                                    </span>

                                                </th>
                                            </tr>
                                        </tfoot>
                                    </table>

                                    <hr class="invis">
                                    <div class="coupon-code-wrapper">
                                        <p>
                                            <a class="btn btn-primary btn-block" role="button" data-toggle="collapse"
                                                href="#collapseExample" aria-expanded="false"
                                                aria-controls="collapseExample">
                                                Have a coupon code? Click to enter here
                                            </a>
                                        </p>
                                        <div class="collapse" id="collapseExample">
                                            <div class="well">
                                                <div class="media">
                                                    <p>Enter a coupon code if you have one.</p>
                                                    <div class="couponform">
                                                        <div>
                                                            <input v-model="inputPromo" type="text" class="form-control"
                                                                placeholder="Enter coupon code here.">

                                                            <div v-if="(kodePromo)" class="my-6 ml-1 ">
                                                                <span
                                                                    class="text-lg italic font-bold mt-10 text-green-700">Kode
                                                                    coupon {{kodePromo}} berhasil digunakan</span>
                                                            </div>

                                                            <div class="flex">
                                                                <button @click="getPromo" class="btn btn-primary">Apply
                                                                    Coupon</button>
                                                                <button @click="removePromo"
                                                                    class="ml-6 btn btn-default">Remove Coupon</button>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <hr class="invis">
                                    <div class="mt-6 coupon-code-wrapper">
                                        <p>
                                            <a class="btn bg-green-700 hover:bg-green-800  text-white hover:text-white btn-block"
                                                role="button" data-toggle="collapse" href="#collapseExample2"
                                                aria-expanded="false" aria-controls="collapseExample2">
                                                Have a voucher (gift card) ? Click to enter here
                                            </a>
                                        </p>
                                        <div class="collapse" id="collapseExample2">
                                            <div class="well">
                                                <div class="media">
                                                    <p>Enter a voucher (gift card) code if you have one.</p>
                                                    <div class="couponform">
                                                        <div>
                                                            <input v-model="inputVoucher" type="text"
                                                                class="form-control"
                                                                placeholder="Enter voucher code here.">

                                                            <div v-if="(kodeVoucher)" class="my-6 ml-1 ">
                                                                <span
                                                                    class="text-lg italic font-bold mt-10 text-green-700">Kode
                                                                    voucher {{kodeVoucher}} berhasil digunakan</span>
                                                            </div>

                                                            <div class="flex">
                                                                <button @click="getVoucher"
                                                                    class="btn btn-primary">Apply
                                                                    Voucher</button>
                                                                <button @click="removeVoucher"
                                                                    class="ml-6 btn btn-default">Remove Voucher</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex justify-center mt-10">
                                        <button @click="checkout" class="btn btn-default text-3xl">Checkout</button>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Footer></Footer>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue"
    import Footer from "@/components/Footer.vue"

    export default {
        name: 'Cart',
        components: { Header, Footer },
        data() {
            return {
                inputPromo: '',
                inputVoucher: '',
            }
        },
        computed: {
            carts() {
                return this.$store.state.carts
            },
            promo() {
                return this.$store.state.promo[0]
            },
            kodePromo() {
                if (this.promo) {
                    return this.promo.code
                }
            },
            nilaiPromoOri() {
                if (this.promo) {
                    if (this.promo.type === '%') {
                        return this.promo.value / 100 * this.totalNetPrice
                    } else {
                        return this.promo.value
                    }
                }
            },
            nilaiPromo() {
                if (this.promo) {
                    if (this.nilaiPromoOri > this.totalNetPrice) {
                        return this.totalNetPrice
                    } else {
                        if (this.promo.type === '%') {
                            return this.promo.value / 100 * this.totalNetPrice
                        } else {
                            return this.promo.value
                        }
                    }
                }
            },
            voucher() {
                return this.$store.state.voucher[0]
            },
            kodeVoucher() {
                if (this.voucher) {
                    return this.voucher.code
                }
            },
            nilaiVoucherOri() {
                if (this.voucher) {
                    return this.voucher.amount
                }
            },
            nilaiVoucher() {
                if (this.voucher) {
                    if (this.voucher.amount > this.totalAfterPromo) {
                        return this.totalAfterPromo
                    } else {
                        return this.voucher.amount
                    }
                }
            },
            totalNetPrice() {
                let total = 0
                if (this.carts !== 'Tidak ada produk di keranjang') {
                    this.carts.forEach(cart => {
                        if (cart.productDiscountedPrice) {
                            total += cart.productDiscountedPrice
                        } else {
                            total += cart.productPrice
                        }
                    })
                }
                return total
            },
            totalGrossPrice() {
                let total = 0
                if (this.carts !== 'Tidak ada produk di keranjang') {
                    this.carts.forEach(cart => {
                        total += cart.productPrice
                    })
                }
                return total
            },
            totalAfterPromo() {
                if (this.nilaiPromo > 0) {
                    return this.totalNetPrice - this.nilaiPromo
                } else {
                    return this.totalNetPrice
                }
            },
            totalAfterVoucher() {
                if (this.nilaiVoucher > 0) {
                    return this.totalAfterPromo - this.nilaiVoucher
                } else {
                    return this.totalAfterPromo
                }
            },
        },
        methods: {
            addToCart(productId) {
                this.$store.dispatch('addToCart', { productId })
            },
            deleteFromCart(cartId) {
                this.$store.dispatch('deleteFromCart', cartId)
            },
            getPromo() {
                if (this.inputPromo.trim().length === 0 || this.inputPromo === 'undefined') {
                    Swal.fire('Masukkan kode promo')
                } else {
                    this.$store.dispatch('getPromo', this.inputPromo)
                }
            },
            removePromo() {
                this.inputPromo = ''
                this.$store.commit('SET_PROMO', '')
            },
            getVoucher() {
                if (this.inputVoucher.trim().length === 0 || this.inputVoucher === 'undefined') {
                    Swal.fire('Masukkan kode voucher')
                } else {
                    this.$store.dispatch('getVoucher', this.inputVoucher)
                }
            },
            removeVoucher() {
                this.inputVoucher = ''
                this.$store.commit('SET_VOUCHER', '')
            },
            checkout() {
                if (this.carts === 'Tidak ada produk di keranjang') {
                    Swal.fire('Keranjang belanjaan kosong')
                } else {
                    if (this.promo) {
                        this.$store.dispatch('usePromotion', { promotionCode: this.promo.code })
                    }

                    if (this.voucher) {
                        this.$store.dispatch('redeemVoucher', { voucherCode: this.voucher.code })
                    }

                    const userId = this.carts[0].userId
                    const customerName = this.carts[0].firstName + " " + this.carts[0].lastName
                    const subTotal = this.totalNetPrice
                    const promoId = this.promo ? this.promo.id : ''
                    const promoCode = this.promo ? this.promo.code : ''
                    const promoAmount = this.promo ? this.nilaiPromoOri : 0
                    const promoAmountUsed = this.promo ? this.nilaiPromo : 0
                    const voucherId = this.voucher ? this.voucher.id : ''
                    const voucherCode = this.voucher ? this.voucher.code : ''
                    const voucherAmount = this.voucher ? this.nilaiVoucherOri : 0
                    const voucherAmountUsed = this.voucher ? this.nilaiVoucher : 0
                    const total = this.totalAfterVoucher

                    this.$store.dispatch('createTrxHead', {
                        userId: userId,
                        customerName: customerName,
                        subTotal: subTotal,
                        promoId: promoId,
                        promoCode: promoCode,
                        promoAmount: promoAmount,
                        promoAmountUsed: promoAmountUsed,
                        voucherId: voucherId,
                        voucherCode: voucherCode,
                        voucherAmount: voucherAmount,
                        voucherAmountUsed: voucherAmountUsed,
                        total: total
                    })
                        .then(result => {
                            this.carts.forEach(item => {
                                this.$store.dispatch('createTrxDetail', {
                                    trxHeadId: result.data.result.id,
                                    productName: item.productName,
                                    finalPrice: item.productDiscountedPrice ? item.productDiscountedPrice : item.productPrice
                                })
                                    .then(result => {
                                        this.$store.dispatch('deleteCartAfterCheckout', { userId })
                                            .then(result => {
                                                this.$store.dispatch('createEnrollment', { productId: item.productId })
                                                    .then(result => {
                                                        Swal.fire('Transaksi berhasil')
                                                        this.$store.dispatch('getCart')
                                                        this.$store.dispatch('getProduct', { limit: 'all' })
                                                        this.clearSelection()
                                                    })
                                                    .catch(err => {
                                                        console.log(err.response.data.error);
                                                    })

                                            })
                                            .catch(err => {
                                                console.log(err.response.data.error);
                                            })
                                    })
                                    .catch(err => {
                                        console.log(err.response.data.error);
                                    })
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            },
            clearSelection() {
                this.removePromo()
                this.removeVoucher()
            },
        },
        created() {
            this.$store.dispatch('getCart')
        }
    }
</script>