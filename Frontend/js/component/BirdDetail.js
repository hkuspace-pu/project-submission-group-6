//import Record from "./Record.js";
export default {
    components: {
     "Record": Vue.defineAsyncComponent(() => import('./Record.js'))
    },
    props: {
        bird: {}
    },
    data() {
        return {
            isLoading: false,
            allPost: null,
            relatedPost: null,
            relatedExpertPost: null,
            showPost: false,
            record: null,
            isExpert: null,
        }
    },
    methods: {
        handleLogin(){

        },
        handleLogoutChild(data) {
    
        },
        handleSearch(){
            this.filterList = this.birdList.filter(word => word.birdEnName.toLowerCase().includes(this.searchWord.toLowerCase()))
        },
        async getPost() {
            this.isLoading = true;
            const res = await fetch('http://localhost:5003/api/eBird/general_user/post');
            const res_data = await res.json();
            this.allPost = res_data;
            console.log('all post', this.allPost);
            this.relatedPost = this.allPost.filter(a => a.bird_id == this.bird.bird_id)
            console.log('all filter', this.relatedPost);
            for (let i = 0; i < this.relatedPost.length; i++) {
                let postFile = await fetch(`http://localhost:5003/api/eBird/general_user/post_file/${this.relatedPost[i].post_id}`);
                let postFile_data = await postFile.json();
                console.log('postFile: ',postFile_data);
                this.relatedPost[i] = {...this.relatedPost[i],coverImage: postFile_data[0], media: postFile_data}
            }

            console.log('Hi: ',this.relatedPost);

            //let postFile = await fetch(`http://localhost:5003/api/eBird/general_user/post_file/${this.commonPost[0].post_id}`);
            //let postFile_data = await postFile.json();
            //console.log(postFile_data[0].file_id);



            //console.log(this.commonPost);
            //this.expertPost = this.allPost.filter(a => a.post_id >= 5)
            //console.log(this.expertPost);
            this.isLoading = false;
        },

        handleShowRecord(key) {
            console.log(this.relatedPost[key]);
            this.record = this.relatedPost[key];
            this.showPost = true;
        }
    },
    mounted() {
        console.log('Hello!!', this.bird);
        this.getPost();

    },

    watch: {
    },

    template: `
    <div v-if="this.isLoading" style="height: 100vh;" class="row align-items-center justify-content-center">
        <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only"></span>
        </div>
    </div>
    <div v-if="!this.showPost">
        <div v-if="!this.isLoading" style="border-radius: 15px;" class="card border-secondary">
            <img class="card-img-top" style="width: 100%" v-bind:src="'http://localhost:5003/api/eBird/birds/media/' + this.bird.image_id" />
            <div class="card-header">
                <p class="h4">{{this.bird.common_name}}</p>
                <p class="p-0 m-0">{{this.bird.chinese_name}}</p>
                <p class="p-0 m-0"><i>{{this.bird.scientific_Name}}<i></p>
            </div>
            <div class="card-body text-secondary">
                <p class="p-0 m-0">Order: </p><p style="color: grey">{{this.bird.bird_order}}</p>
                <p class="p-0 m-0">Famliy: </p><p style="color: grey">{{this.bird.family}}</p>
            </div>
        </div>
        <div v-if="!this.isLoading" class="mt-5">
            <h4>Find out more user post about {{this.bird.common_name}}!</h4>
        </div>
        <div class="d-flex mb-3" v-for="(value, key) in this.relatedPost">
                <img @click="handleShowRecord(key)" style="height: 80px; width: 100px; border-radius: 15px" v-bind:src="'http://localhost:5003/api/eBird/media/' + value.coverImage.file_id" />
                <div class="col ps-3">
                    <p style="font-size: 12px" class="pt-2 m-0">{{value.date_time}}</p>
                    <p style="font-size: 12px" class="p-0 m-0">@{{value.user_name}}</p>
                </div>
            </div>
    </div>
    <Record v-if="this.showPost" :record=this.record :isExpert=this.isExpert />
    
    `
}