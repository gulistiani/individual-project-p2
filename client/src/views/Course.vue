<template>
    <div class="">
        <Header></Header>

        <section class="grey section">
            <div class="container ">
                <div class="row">
                    <div class="col-md-12">
                        <div class="section-title text-center">
                            <h4>Cari Kelas Training</h4>
                            <p>Temukan jalan ninjamu</p>
                        </div>
                    </div>
                </div>

                <Card></Card>

            </div>
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
            }
        },
        computed: {
        },
        methods: {
        },
        created() {

        }
    }
</script>