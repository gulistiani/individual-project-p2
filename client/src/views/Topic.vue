<template>
    <div class="">
        <Header></Header>

        <section class="grey section">
            <div class="container">


                <div class="flex justify-center course-title font-bold text-3xl text-aqua-700">
                    {{topic.title}}
                </div>

                <!-- <div class="flex justify-center mt-10">
                    <youtube :video-id="videoId" ref="youtube" :player-vars="playerVars" @paused="getWatched"
                        @ended="getWatched" class=" "></youtube>
                </div> -->

                <div class="flex justify-center mt-10">
                    <youtube :video-id="videoId" ref="youtube" :player-vars="playerVars" @paused="getWatched"
                        @ended="getWatched" class=" "></youtube>
                </div>

                <!-- <div class="w-6/12 mx-auto">
                    <div class="flex justify-between">
                        <button v-if="topic.sequence === 1" disabled
                            class="mx-1 my-4 w-60 h-20 border-radius text-center rounded-lg text-2xl text-white bg-gray-400">Prev
                        </button>
                        <button v-if="topic.sequence !== 1" @click="goToPrev()"
                            class="mx-1 my-4 w-60 h-20 border-radius text-center rounded-lg text-2xl text-white btn-primary">Prev
                        </button>

                        <button v-if="topic.sequence === topic.maxSequence" disabled
                            class="mx-1 my-4 w-60 h-20 border-radius text-center rounded-lg text-2xl text-white bg-gray-400">Next
                        </button>
                        <button v-if="topic.sequence !== topic.maxSequence" @click="goToNext()"
                            class="mx-1 my-4 w-60 h-20 border-radius text-center rounded-lg text-2xl text-white btn-primary">Next
                        </button>
                    </div>
                </div> -->
            </div>
        </section>

        <Footer></Footer>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue"
    import Footer from "@/components/Footer.vue"

    export default {
        name: 'Topic',
        components: { Header, Footer },
        data() {
            return {

            }
        },
        computed: {
            playerVars() {
                return {
                    autoplay: 1,
                    playsinline: 1,
                    controls: 1, //show video control : 0 or 1
                    modestbranding: 1, // 1 to hide youtube logo
                    rel: 0, //0 to hide related videos at the end
                    // start: this.topic.watched, //start vide di detik ke brp
                    showinfo: 0,
                    autohide: 1
                }
            },
            player() {
                return this.$refs.youtube.player
            },
            topic() {
                return this.$store.state.topic
            },
            videoId() {
                return this.$store.state.topic.url
            },
        },
        methods: {
            playVideo() {
                this.$refs.youtube.player.playVideo()
            },
            goToPrev() {
                this.$store.dispatch('getTopicDetail', {
                    productId: this.topic.productId,
                    sequence: this.topic.sequence - 1
                })
                    .then(result => {
                        console.log('----------------------- 108');
                        this.$store.commit('SET_TOPIC', result.data.result[0])

                        console.log('----------------------- 118');
                        console.log(`/topic/${this.topic.productId}/seq/${this.topic.sequence}`);
                        this.$router.push(`/topic/${this.topic.productId}/seq/${this.topic.sequence}`)

                        console.log('----------------------- 109');
                        this.player = null

                        console.log('----------------------- 112');
                        console.log(this.topic);
                        this.playerVars.start = this.topic.watched
                        console.log(this.playerVars);

                        console.log('----------------------- 114');
                        this.player = this.$refs.youtube.player

                        console.log('----------------------- 116');
                        // this.player.seekTo(this.topic.watched).playVideo()



                    })
                    .catch(err => {
                        console.log(err.response.data.error);
                    })
            },
            goToNext() {
                this.$store.dispatch('getTopicDetail', {
                    productId: this.topic.productId,
                    sequence: this.topic.sequence + 1
                })
                    .then(result => {
                        console.log('----------------------- 108');
                        this.$store.commit('SET_TOPIC', result.data.result[0])

                        console.log('----------------------- 118');
                        console.log(`/topic/${this.topic.productId}/seq/${this.topic.sequence}`);
                        this.$router.push(`/topic/${this.topic.productId}/seq/${this.topic.sequence}`)

                        console.log('----------------------- 109');
                        this.player = null

                        console.log('----------------------- 112');
                        console.log(this.topic);
                        this.playerVars.start = this.topic.watched
                        console.log(this.playerVars);

                        console.log('----------------------- 114');
                        this.player = this.$refs.youtube.player

                        console.log('----------------------- 116');
                        // this.player.seekTo(this.topic.watched).playVideo()

                    })
                    .catch(err => {
                        console.log(err.response.data.error);
                    })
            },
            markCompleted() {
                this.$store.dispatch('saveWatched', {
                    productId: this.topic.productId,
                    productDetailId: this.topic.id,
                    watched: this.topic.duration,
                    sequence: this.topic.sequence
                })
            },
            getWatched() {
                this.player.getCurrentTime()
                    .then(result => {
                        console.log(result);
                        this.$store.dispatch('saveWatched', {
                            productId: this.topic.productId,
                            productDetailId: this.topic.id,
                            watched: result,
                            sequence: this.topic.sequence
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        created() {
            console.log('----------------------- 150');
            this.player = null

            console.log('----------------------- 152');
            console.log(this.topic);

            console.log('----------------------- 154');
            this.playerVars.start = this.topic.watched
            console.log(this.playerVars);

            console.log('----------------------- 156');
            this.player = this.$refs.youtube.players

            // this.player.seekTo(this.playerVars.start).playVideo()

        }
    }
</script>

<style>
</style>