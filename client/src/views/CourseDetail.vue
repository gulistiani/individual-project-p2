<template>
    <div class="">
        <Header></Header>

        <section class="grey section">
            <div class="container">
                <div class="row">
                    <div id="course-left-sidebar" class="col-md-4">
                        <div class="course-image-widget">
                            <img :src="productDetail.imagePath" :alt="productDetail.name" class="img-responsive">
                        </div>
                        <div class="course-meta">
                            <p class="course-category">Category : {{productDetail.categoryName}}</p>
                            <hr>
                            <div class="rating">
                                <p>Reviews : &nbsp;
                                    <i class="mdi mdi-star"></i>
                                    <i class="mdi mdi-star"></i>
                                    <i class="mdi mdi-star"></i>
                                    <i class="mdi mdi-star"></i>
                                    <i class="mdi mdi-star-o"></i>
                                    <a title="" href="#reviews">&nbsp; (93)</a>
                                </p>
                            </div>

                            <div v-if="productDetail.totalDuration">
                                <hr>
                                <p v-if="!productDetail.totalDuration.hours" class="course-time">Duration :
                                    00:{{productDetail.totalDuration.minutes}}:{{productDetail.totalDuration.seconds}}
                                </p>
                                <p v-if="productDetail.totalDuration.hours" class="course-time">Duration :
                                    {{productDetail.totalDuration.hours}}:{{productDetail.totalDuration.minutes}}:{{productDetail.totalDuration.seconds}}
                                </p>
                            </div>

                            <hr>
                            <p class="course-prize">Prize : <i class="mdi mdi-certificate"></i> Certificate</p>

                            <hr>
                            <p class="course-student">Students : 99 Members </p>

                            <hr>
                            <p class="course-instructors">Instructor : {{productDetail.instructor}} </p>

                            <hr>
                            <p>
                                <span v-if="productDetail.discountedPrice" class="course-prize line-through"> Rp.
                                    {{ Number(productDetail.price).toLocaleString() }}
                                </span>
                                <span v-if="productDetail.discountedPrice" class="ml-4 course-prize font-bold"> Rp.
                                    {{ Number(productDetail.discountedPrice).toLocaleString() }}
                                </span>
                            </p>

                            <p v-if="!productDetail.discountedPrice" class="course-prize"> Rp.
                                {{ Number(productDetail.price).toLocaleString() }}
                            </p>
                        </div>

                        <div v-if="!productDetail.discountedPrice && productDetail.enrollment === 0 & productDetail.inCart === 0"
                            class="course-button">
                            <a href="#" class="btn btn-primary btn-block">Rp.
                                {{ Number(productDetail.price).toLocaleString() }} BELI</a>
                        </div>
                        <div v-if="productDetail.discountedPrice && productDetail.enrollment === 0 & productDetail.inCart === 0"
                            class="course-button">
                            <a @click="addToCart(productDetail.id)" class="btn btn-primary btn-block">Rp.
                                {{ Number(productDetail.discountedPrice).toLocaleString() }} BELI</a>
                        </div>

                        <div v-if="productDetail.inCart === 1 " class="course-button">
                            <a disabled class="btn btn-primary btn-block">ADDED TO CART</a>
                        </div>

                        <div v-if="productDetail.enrollment === 1 " class="course-button">
                            <a disabled class="btn btn-primary btn-block">YOU ARE ENROLLED</a>
                        </div>
                    </div>

                    <div id="course-content" class="col-md-8">
                        <div class="course-description">
                            <h3 class="course-title font-bold text-3xl text-aqua-700">{{productDetail.name}}</h3>
                            <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                suffered
                                alteration in some form, by injected humour, or randomised words which don't look even
                                slightly
                                believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there
                                isn't anything
                                embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the
                                Internet tend to
                                repeat predefined chunks as necessary, making this the first true generator on the
                                Internet.</p>
                        </div>
                        <div class="course-table">
                            <h2 class="font-bold text-3xl text-aqua-700">Course Lessons</h2>

                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Lesson Title</th>
                                        <th class="text-center">Time</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody v-if="productDetailTopics && productDetail.enrollment === 0">
                                    <tr v-for="(productDetailTopic, index) in productDetailTopics"
                                        :key="productDetailTopic.id">
                                        <td><i class="mdi mdi-play-circle"></i></td>
                                        <td>{{productDetailTopic.title}}</td>
                                        <td class="text-right">{{productDetailTopic.duration}}</td>
                                        <td>-</td>
                                    </tr>
                                </tbody>

                                <tbody v-if="productDetailTopics && productDetail.enrollment === 1">
                                    <tr v-for="(productDetailTopic, index) in productDetailTopics"
                                        :key="productDetailTopic.id">
                                        <td><i class="mdi mdi-play-circle"></i></td>
                                        <td>
                                            <p><a
                                                    @click="topicDetail(productDetailTopic.productId, productDetailTopic.sequence)">{{productDetailTopic.title}}</a>
                                            </p>
                                            <div class="progress h-2">
                                                <div class="progress-bar" role="progressbar"
                                                    :style="productDetailTopic.bar">
                                                </div>
                                            </div>
                                        </td>
                                        <td>{{Math.round(productDetailTopic.duration/60) }} menit
                                            {{productDetailTopic.duration % 60 }} detik
                                        </td>
                                        <td>{{productDetailTopic.progress}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr class="invis">
                        <div id="reviews" class="feedbacks">
                            <p>
                                <a class="btn btn-primary btn-block" role="button" data-toggle="collapse"
                                    href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                    What our customers said? (3 Feedbacks)
                                </a>
                            </p>
                            <div class="collapse" id="collapseExample">
                                <div class="well">
                                    <div class="media">
                                        <div class="media-body">
                                            <h4 class="media-heading">John DOE</h4>
                                            <div class="rating">
                                                <i class="mdi mdi-star"></i>
                                                <i class="mdi mdi-star"></i>
                                                <i class="mdi mdi-star"></i>
                                                <i class="mdi mdi-star"></i>
                                                <i class="mdi mdi-star-o"></i>
                                            </div>
                                            <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                                ante sollicitudin
                                                commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra
                                                turpis. Fusce condimentum
                                                nunc ac nisi vulputate fringilla. Donec lacinia congue felis in
                                                faucibus.</p>
                                        </div>
                                    </div>
                                    <div class="media">
                                        <div class="media-body">
                                            <h4 class="media-heading">Amanda FOXOE</h4>
                                            <div class="rating">
                                                <i class="mdi mdi-star"></i>
                                                <i class="mdi mdi-star"></i>
                                                <i class="mdi mdi-star"></i>
                                                <i class="mdi mdi-star"></i>
                                                <i class="mdi mdi-star-o"></i>
                                            </div>
                                            <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                                ante sollicitudin
                                                commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra
                                                turpis. Fusce condimentum
                                                nunc ac nisi vulputate fringilla. Donec lacinia congue felis in
                                                faucibus.</p>
                                        </div>
                                    </div>
                                    <div class="media">
                                        <div class="media-body">
                                            <h4 class="media-heading">Mark BOBS</h4>
                                            <div class="rating">
                                                <i class="mdi mdi-star"></i>
                                                <i class="mdi mdi-star"></i>
                                                <i class="mdi mdi-star"></i>
                                                <i class="mdi mdi-star"></i>
                                                <i class="mdi mdi-star"></i>
                                            </div>
                                            <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                                ante sollicitudin
                                                commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra
                                                turpis. Fusce condimentum
                                                nunc ac nisi vulputate fringilla. Donec lacinia congue felis in
                                                faucibus.</p>
                                        </div>
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
        name: 'CourseDetail',
        components: { Header, Footer },
        data() {
            return {
            }
        },
        computed: {
            productDetail() {
                return this.$store.state.productDetail
            },
            productDetailTopics() {
                return this.$store.state.productDetailTopics
            },
        },
        methods: {
            topicDetail(productId, sequence) {
                this.$store.dispatch('getTopicDetail', {
                    productId: productId,
                    sequence: sequence
                })
                    .then(result => {
                        this.$store.commit('SET_TOPIC', result.data.result[0])
                        this.$router.push('/topic/' + productId + '/seq/' + sequence)
                    })
                    .catch(err => {
                        console.log(err.response.data.error);
                    })
            },
            addToCart(productId) {
                if (!localStorage.access_token) {
                    Swal.fire({
                        title: 'Halo kak',
                        text: "Untuk belanja login dulu yuks :)",
                        showCancelButton: true,
                        confirmButtonColor: '#1b7501',
                        cancelButtonColor: '#e38a05',
                        confirmButtonText: `Ok, no prob`,
                        cancelButtonText: `Liat-liat dulu deh`
                    }).then((result) => {
                        if (result.isConfirmed === true) {
                            this.$router.push('/login')
                        }
                    })
                } else {
                    this.$store.dispatch('addToCart', { productId })
                }
            },
            created() {
                console.log(this.$route.params);
                this.$store.dispatch('getProductDetail', { productId: this.productDetail.productId })
            }
        }
    }
</script>