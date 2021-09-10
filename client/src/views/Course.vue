<template>
    <div class="">
        <Header></Header>

        <section class="grey section">
            <div class="container ">
                <div class="row">
                    <div class="col-md-12">
                        <div class="section-title text-center">
                            <h4>Available Courses</h4>
                            <p>Temukan jalan ninjamu</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="section-title text-center"></div>
                        <div class="flex justify-end ">
                            <input v-model="inputSearch" @change="searchProduct(inputSearch)" type="text"
                                class="pl-4 ml-4 shadow-xl h-16 rounded w-full  bg-white "
                                placeholder="Cari produk ..." />
                            <span class="mdi mdi-magnify text-5xl mt-2 mr-8 z-20 text-oren-700 hover:text-green-700 ">
                            </span>
                        </div>
                    </div>
                </div>
            </div>


            <Card></Card>

        </section>

        <Footer></Footer>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue"
    import Footer from "@/components/Footer.vue"
    import Card from "@/components/Card.vue"

    export default {
        name: 'Course',
        components: { Header, Footer, Card },
        data() {
            return {
                inputSearch: ""
            }
        },
        computed: {
        },
        methods: {
            searchProduct(inputSearch) {
                if (inputSearch === '' || inputSearch.trim().length === 0) {
                    this.$store.dispatch('getProduct', { limit: 'all' })
                } else {
                    this.$store.dispatch('searchProduct', { inputSearch: inputSearch })
                }
            },
        },
        created() {
            // this.$store.dispatch('getCategory')
            this.$store.dispatch('getProduct', { limit: 'all' })
            // this.$store.dispatch('getCart')
        }
    }
</script>