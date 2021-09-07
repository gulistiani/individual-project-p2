<template>
    <div class="">
        <Header></Header>

        <section class="grey section">
            <div class="container ">
                <div class="row">
                    <div class="col-md-12">
                        <div class="section-title text-center">
                            <h4>Your Courses</h4>
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
        name: 'MyLearning',
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