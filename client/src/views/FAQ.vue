<template>
    <div class="">
        <Header></Header>

        <section class="grey section">

            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="section-title text-center">
                            <h4>Friendly Asked Questions</h4>
                            <p class=" text-gray-500">The most frequently asked questions about
                                Academyster are listed
                                below.<br>
                                If you want to ask a question at you, please contact us.</p>
                        </div>
                    </div>
                </div>


                <div class="row">
                    <div class="col-md-12">
                        <div class="content-widget">
                            <div class="accordion-widget">
                                <div class="accordion-toggle-2">
                                    <div class="panel-group" id="accordion">
                                        <div class="panel panel-default">
                                            <div class="panel-heading">
                                                <div class="panel-title">
                                                    <a class="accordion-toggle" data-toggle="collapse"
                                                        data-parent="#accordion1" href="#collapseFour">
                                                        <h3>Bagaimana cara pembayaran? <i
                                                                class="indicator mdi mdi-plus"></i>
                                                        </h3>
                                                    </a>
                                                </div>
                                            </div>
                                            <div id="collapseFour" class="panel-collapse collapse">
                                                <div class="panel-body">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                                                        lorem quam, adipiscing
                                                        condimentum tristique vel, eleifend sed turpis. Pellentesque
                                                        cursus arcu id magna euismod
                                                        in elementum purus molestie.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="panel panel-default">
                                            <div class="panel-heading">
                                                <div class="panel-title">
                                                    <a class="accordion-toggle" data-toggle="collapse"
                                                        data-parent="#accordion1" href="#collapseFive">
                                                        <h3>Bagaimana proses refund? <i
                                                                class="indicator mdi mdi-plus"></i>
                                                        </h3>
                                                    </a>
                                                </div>
                                            </div>
                                            <div id="collapseFive" class="panel-collapse collapse">
                                                <div class="panel-body">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                                                        lorem quam, adipiscing
                                                        condimentum tristique vel, eleifend sed turpis. Pellentesque
                                                        cursus arcu.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="panel panel-default">
                                            <div class="panel-heading">
                                                <div class="panel-title">
                                                    <a class="accordion-toggle" data-toggle="collapse"
                                                        data-parent="#accordion1" href="#collapseSix">
                                                        <h3>Apakah saya bisa beli course di Tokopedia ataupun Shopee? <i
                                                                class="indicator mdi mdi-plus"></i></h3>
                                                    </a>
                                                </div>
                                            </div>
                                            <div id="collapseSix" class="panel-collapse collapse">
                                                <div class="panel-body">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                                                        lorem quam, adipiscing
                                                        condimentum tristique vel, eleifend sed turpis. Pellentesque
                                                        cursus arcu id magna euismod
                                                        in elementum purus molestie.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="panel panel-default">
                                            <div class="panel-heading">
                                                <div class="panel-title">
                                                    <a class="accordion-toggle" data-toggle="collapse"
                                                        data-parent="#accordion1" href="#collapseSix">
                                                        <h3>Bagaimana cara menggunakan voucher? <i
                                                                class="indicator mdi mdi-plus"></i></h3>
                                                    </a>
                                                </div>
                                            </div>
                                            <div id="collapseSix" class="panel-collapse collapse">
                                                <div class="panel-body">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                                                        lorem quam, adipiscing
                                                        condimentum tristique vel, eleifend sed turpis. Pellentesque
                                                        cursus arcu id magna euismod
                                                        in elementum purus molestie.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="button-wrapper text-center ">
                    <p>Revolusi industri 4.0 di depan mata, apakah kamu sudah siap menghadapinya? </p>
                    <a href="#" class="btn btn-primary border-radius"><i class="mdi mdi-sign-in"></i> Ayo Join!</a>

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
        name: 'FAQ',
        components: { Header, Footer },
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