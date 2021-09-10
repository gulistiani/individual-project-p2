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
                                    <h1>History Transaction</h1>
                                </div>
                            </div>
                        </div>
                        <div class="blog-wrapper">
                            <div class="blog-desc">
                                <div class="shop-cart">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th class="text-center">
                                                    Order ID
                                                </th>
                                                <th class="text-center">
                                                    Tanggal Transaksi
                                                </th>
                                                <th class="text-center">
                                                    Total Transaksi
                                                </th>
                                                <th class="text-center">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(trxHead, index) in trxHeads" :key="trxHead.id">
                                                <td class="text-center">
                                                    {{trxHead.id}}
                                                    </tdc>
                                                <td class="text-center">
                                                    {{trxHead.createdAt}}
                                                </td>
                                                <td class="text-right">
                                                    Rp. {{ Number(trxHead.total).toLocaleString() }}
                                                </td>
                                                <td class="text-center">
                                                    <button @click="showHeadFull(trxHead.id)"
                                                        class="mdi mdi-dots-horizontal rounded-full mx-1 text-4xl text-oren-700 hover:text-hijau-tua">
                                                    </button>
                                                    <button @click="showDetail(trxHead.id)"
                                                        class="mdi mdi-dns-outline rounded-full mx-1 text-2xl text-oren-700 hover:text-hijau-tua">
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>

                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <!---------------------------- modal Head Full ------------------------------>
        <dialog id="headFull" class="h-7/12 w-8/12 p-5 bg-white rounded-lg ">

            <div class="flex flex-col w-full h-auto  ">
                <!-- Header -->
                <div class="flex w-full h-auto justify-center  bg-oren-700 items-center ">
                    <div class="flex w-10/12 h-auto py-3 justify-center items-center text-oren-200 text-xl font-bold">
                        Detail Transaction
                    </div>
                    <div @click="closeHeadFull" class="flex w-1/12 h-6 justify-center text-primary cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="#084769" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                </div>
                <!--Header End-->

                <!-- Modal Content-->
                <div class="mt-6">
                    <div class="flex text-lg  text-gray-500">
                        <span class="w-72 text-lg  text-gray-500">Tanggal Transaksi:
                        </span>
                        <span class="text-lg  text-gray-500"> {{ trxHeadFull.createdAt}}
                        </span>
                    </div>

                    <div class="flex text-lg  text-gray-500">
                        <span class="w-72 text-lg  text-gray-500">Nama Customer:
                        </span>
                        <span class="text-lg  text-gray-500"> {{ trxHeadFull.customerName}}
                        </span>
                    </div>

                    <div class="flex text-lg  text-gray-500">
                        <span class="w-72 text-lg  text-gray-500">Total Belanja:
                        </span>
                        <span class="text-lg  text-gray-500">Rp. {{ Number(trxHeadFull.subTotal).toLocaleString() }}
                        </span>
                    </div>

                    <div class="flex text-lg  text-gray-500">
                        <span class="w-72 text-lg  text-gray-500">Kode Promo:
                        </span>
                        <span class="text-lg  text-gray-500"> {{ trxHeadFull.promoCode}}
                        </span>
                    </div>

                    <div class="flex text-lg  text-gray-500">
                        <span class="w-72 text-lg  text-gray-500">Nilai Promo:
                        </span>
                        <span class="text-lg  text-gray-500">Rp. {{ Number(trxHeadFull.promoAmount).toLocaleString() }}
                        </span>
                    </div>

                    <div class="flex text-lg  text-gray-500">
                        <span class="w-72 text-lg  text-gray-500">Nilai Promo yang Digunakan:
                        </span>
                        <span class="text-lg  text-gray-500">Rp.
                            {{ Number(trxHeadFull.promoAmountUsed).toLocaleString() }}
                        </span>
                    </div>


                    <div class="flex text-lg  text-gray-500">
                        <span class="w-72 text-lg  text-gray-500">Kode Voucher:
                        </span>
                        <span class="text-lg  text-gray-500"> {{ trxHeadFull.voucherCode}}
                        </span>
                    </div>

                    <div class="flex text-lg  text-gray-500">
                        <span class="w-72 text-lg  text-gray-500">Nilai Voucher:
                        </span>
                        <span class="text-lg  text-gray-500">Rp.
                            {{ Number(trxHeadFull.voucherAmount).toLocaleString() }}
                        </span>
                    </div>

                    <div class="flex text-lg  text-gray-500">
                        <span class="w-72 text-lg  text-gray-500">Nilai Voucher yang Digunakan:
                        </span>
                        <span class="text-lg  text-gray-500">Rp.
                            {{ Number(trxHeadFull.voucherAmountUsed).toLocaleString() }}
                        </span>
                    </div>

                    <div class="flex text-lg  text-gray-500">
                        <span class="w-72 text-lg  text-gray-500">Total Pembayaran:
                        </span>
                        <span class="text-lg  text-gray-500"> {{ Number(trxHeadFull.total).toLocaleString() }}
                        </span>
                    </div>

                </div>
                <!-- End of Modal Content-->
            </div>
        </dialog>
        <!---------------------------- end of modal head full ------------------------------>


        <!---------------------------- modal detail  ------------------------------>
        <dialog id="detail" class="h-7/12 w-8/12 p-5 bg-white rounded-lg ">

            <div class="flex flex-col w-full h-auto  ">
                <!-- Header -->
                <div class="flex w-full h-auto justify-center  bg-oren-700 items-center ">
                    <div class="flex w-10/12 h-auto py-3 justify-center items-center text-oren-200 text-xl font-bold">
                        Detail Item
                    </div>
                    <div @click="closeDetail" class="flex w-1/12 h-6 justify-center text-primary cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="#084769" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                </div>
                <!--Header End-->

                <!-- Modal Content-->
                <div v-for="(trxDetail, index) in trxDetails" :key="trxDetail.id" class="mt-6">

                    <div class="flex text-lg  text-gray-500">
                        <span class="w-72 text-lg  text-gray-500">Nama Produk:
                        </span>
                        <span class="text-lg  text-gray-500"> {{ trxDetail.productName}}
                        </span>
                    </div>

                    <div class="flex text-lg  text-gray-500">
                        <span class="w-72 text-lg  text-gray-500">Total:
                        </span>
                        <span class="text-lg  text-gray-500">Rp.
                            {{ Number(trxDetail.finalPrice).toLocaleString() }}
                        </span>
                    </div>

                </div>
                <!-- End of Modal Content-->
            </div>
        </dialog>
        <!---------------------------- end of modal detail  ------------------------------>


        <Footer></Footer>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue"
    import Footer from "@/components/Footer.vue"

    export default {
        name: 'Account',
        components: { Header, Footer },
        data() {
            return {
            }
        },
        computed: {
            trxHeads() {
                console.log(this.$store.state.trxHeads);
                return this.$store.state.trxHeads
            },
            trxHeadFull() {
                //console.log(this.$store.state.trxHeadFull);
                return this.$store.state.trxHeadFull
            },
            trxDetails() {
                // console.log(this.$store.state.trxDetails);
                return this.$store.state.trxDetails
            },
            trxDate() {
                // moment.locale();
                // console.log(this.$store.state.trxHeads.createdAt);
                // console.log(moment(moment.utc(this.$store.state.trxHeads.createdAt).toDate()).format('LLLL'))
                // console.log(moment.utc(this.$store.state.trxHeads.createdAt).format('YYYY-MM-DD HH:mm:ss'));
                // return moment(this.$store.state.trxHeads.createdAt).format('YYYY-MM-DD HH:mm:ss')
            },
        },
        methods: {
            showHeadFull(trxHeadId) {
                document.getElementById('headFull').showModal()
                this.$store.dispatch('getTrxHeadById', { trxHeadId })
            },
            closeHeadFull() {
                document.getElementById('headFull').close()
            },
            showDetail(trxHeadId) {
                document.getElementById('detail').showModal()
                this.$store.dispatch('getTrxDetail', { trxHeadId })
            },
            closeDetail() {
                document.getElementById('detail').close()
            }
        },
        created() {
            // console.log(this.$store.state.user.id);
            this.$store.dispatch('getTrxHead')
        }
    }
</script>