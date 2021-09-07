<template>
    <footer class="dark footer section bg-aqua-900">
        <div class="container">
            <div class="row">

                <div class="col-md-3 col-md-6 col-xs-12">
                    <div class="widget">
                        <div class="widget-title">
                            <h4 class="">About Adamyster</h4>
                            <hr>
                        </div>
                        <p class="">Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has
                            been the
                            industry's standard dummy text ever since the 1500s, when an unknown printer took...</p>
                        <button @click="goToAbout"
                            class="mx-1 my-4 w-60 h-20 border-radius text-center rounded-lg text-2xl text-white bg-aqua-600 hover:bg-aqua-700">Read
                            More</button>
                    </div>
                </div>


                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="widget">
                        <div class="widget-title">
                            <h4>Contact Form</h4>
                            <hr>
                        </div>
                        <div id="contact_form" class="contact_form row">
                            <div id="message"></div>
                            <form id="contactform" action="mailto:cs@academyster.com" enctype="text/plain"
                                method="post">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" name="name" id="name" class="form-control bg-gray-200"
                                        placeholder="Name *">
                                    <input type="text" name="email" id="email" class="form-control bg-gray-200"
                                        placeholder="Email *">
                                    <input type="text" name="name" id="phone" class="form-control bg-gray-200"
                                        placeholder="Phone Number">
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <textarea class="form-control  bg-gray-200" name="comments" id="comments" rows="6"
                                        placeholder="Input message here"></textarea>
                                    <button type="submit" value="SEND" id="submit"
                                        class="mx-1  w-full h-12 border-radius text-center rounded text-2xl text-white bg-aqua-600 hover:bg-aqua-700">Send
                                        Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


                <div class="col-md-3 col-md-6 col-xs-12">
                    <div class="widget">
                        <div class="widget-title">
                            <h4>Contact Details</h4>
                            <hr>
                        </div>
                        <ul class="contact-details">
                            <li><i class="mdi mdi-web"></i>www.academyster.com</li>
                            <li><i class="mdi mdi-email-outline"></i> info@academyster.com </li>
                            <li><i class="mdi mdi-phone"></i> +62 81212 77 4949</li>
                            <li><i class="mdi mdi-home"></i> Pancoran, Jakarta, Indonesia</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: 'Footer',
        components: {},
        data() {
            return {
            }
        },
        computed: {
        },
        methods: {
            goToAbout() {
                this.$router.push('/about')
            },
        },
        created() {

        }
    }
</script>