import RecordForm from "./RecordForm.js";
import ExpertRecordForm from "./ExpertRecordForm.js";
import Search from "./Search.js";
import Profile from "./Profile.js";
import Record from "./Record.js";
import Map from "./Map.js";
import Login from "./Login.js";
import AdminUser from "./AdminUser.js";
import { store } from "../store/store.js";

export default {
    components: {
        RecordForm,
        Search,
        Profile,
        Record,
        ExpertRecordForm,
        Map,
        Login,
        AdminUser
    },
    props: {
    },
    data() {
        return {
            store,
            isLoading: false,
            menuHome: true,
            menuAddRecord: false,
            menuSearch: false,
            menuProfile: false,
            menuMap: false,
            showRecord: false,
            clickLogin: false,
            isUserLogin: false,
            userType: 0,
            allPost: [],
            selectedRecord: {},
            commonPost: [],
            userDetail: null,
            expertPost: null,
            allExpertPost: null,
            isExpert: false,
        }
    },
    methods: {
        handleLogin() {
            this.clickLogin = true
        },
        handleLogout() {
            //this.$emit('logout', false)
            this.getPost()
            this.getExpertPost()
            this.isUserLogin = false;
            this.userDetail = null;
            this.menuHome = true;
            this.menuAddRecord = false;
            this.menuSearch = false;
            this.menuProfile = false;
            this.menuMap = false;
        },
        handlecontent() {
            console.log('gggg');
        },
        async handleSubmit(data) {
            //this.getPost();
            if (store.user.user_type == 0) {

                let userPost = []
                const res = await fetch(`http://localhost:5003/api/eBird/general_user/${store.user.user_id}/post`);
                let res_data = await res.json();
                console.log('res_data', res_data);
                userPost = res_data;

                for (let i = 0; i < userPost.length; i++) {
                    let postFile = await fetch(`http://localhost:5003/api/eBird/general_user/post_file/${userPost[i].post_id}`);
                    let postFile_data = await postFile.json();
                    console.log('postFile: ', postFile_data);
                    userPost[i] = { ...userPost[i], coverImage: postFile_data[0].file_id, media: postFile_data }
                }
                //console.log('userDetail: ', this.userDetail, 'post:', res);

                store.userPost = userPost
            } else if (store.user.user_type == 1) {

                let userPost = []
                const res = await fetch(`http://localhost:5003/api/eBird/expert_user/${store.user.user_id}/post`);
                let res_data = await res.json();
                console.log('res_data', res_data);
                userPost = res_data;

                for (let i = 0; i < userPost.length; i++) {
                    let postFile = await fetch(`http://localhost:5003/api/eBird/expert_user/post_file/${userPost[i].post_id}`);
                    let postFile_data = await postFile.json();
                    //console.log('postFile: ',postFile_data);
                    userPost[i] = { ...userPost[i], coverImage: postFile_data[0].file_id, media: postFile_data }

                    let getBirds = await fetch(`http://localhost:5003/api/eBird/expert_user/post_bird/${userPost[i].post_id}`);
                    let postBird_data = await getBirds.json();
                    userPost[i] = { ...userPost[i], birds: postBird_data }
                }

                store.userPost = userPost
            }

            //store.userPost = userPost
            this.getPost();
            this.getExpertPost();
            this.menuSearch = false;
            this.menuAddRecord = false;
            this.menuHome = true;
        },
        handleCancelLogin(data) {
            this.clickLogin = data
        },
        async handleUserLogin(data) {
            this.clickLogin = false;
            this.isUserLogin = true;

            this.userDetail = data
            this.userType = data.user_type + 1
            store.user = data

            if (store.user.user_type == 0) {

                let userPost = []
                const res = await fetch(`http://localhost:5003/api/eBird/general_user/${store.user.user_id}/post`);
                let res_data = await res.json();
                console.log('res_data', res_data);
                userPost = res_data;

                for (let i = 0; i < userPost.length; i++) {
                    let postFile = await fetch(`http://localhost:5003/api/eBird/general_user/post_file/${userPost[i].post_id}`);
                    let postFile_data = await postFile.json();
                    console.log('postFile: ', postFile_data);
                    userPost[i] = { ...userPost[i], coverImage: postFile_data[0].file_id, media: postFile_data }
                }
                //console.log('userDetail: ', this.userDetail, 'post:', res);

                store.userPost = userPost
            } else if (store.user.user_type == 1) {

                let userPost = []
                const res = await fetch(`http://localhost:5003/api/eBird/expert_user/${store.user.user_id}/post`);
                let res_data = await res.json();
                console.log('res_data', res_data);
                userPost = res_data;

                for (let i = 0; i < userPost.length; i++) {
                    let postFile = await fetch(`http://localhost:5003/api/eBird/expert_user/post_file/${userPost[i].post_id}`);
                    let postFile_data = await postFile.json();
                    //console.log('postFile: ',postFile_data);
                    userPost[i] = { ...userPost[i], coverImage: postFile_data[0].file_id, media: postFile_data }

                    let getBirds = await fetch(`http://localhost:5003/api/eBird/expert_user/post_bird/${userPost[i].post_id}`);
                    let postBird_data = await getBirds.json();
                    userPost[i] = { ...userPost[i], birds: postBird_data }
                }

                store.userPost = userPost
            }

        },
        handleShowRecord(index) {
            this.selectedRecord = this.commonPost[index];
            this.isExpert = false;
            this.showRecord = true;
        },
        handleShowExpertRecord(index) {
            this.selectedRecord = this.expertPost[index];
            this.isExpert = true;
            this.showRecord = true;
        },
        handleLogoutChild(data) {
            this.getPost()
            this.getExpertPost()
            this.clickLogin = data;
            this.isUserLogin = false;
            this.userType = 0;
            this.userDetail = null;
            this.menuHome = true;
            this.menuAddRecord = false;
            this.menuSearch = false;
            this.menuProfile = false;
            this.menuMap = false;
        },
        async getPost() {
            this.isLoading = true;
            const res = await fetch('http://localhost:5003/api/eBird/general_user/post');
            const res_data = await res.json();
            this.allPost = res_data;
            this.commonPost = this.allPost.filter(a => a.status == 0)

            for (let i = 0; i < this.commonPost.length; i++) {
                let postFile = await fetch(`http://localhost:5003/api/eBird/general_user/post_file/${this.commonPost[i].post_id}`);
                let postFile_data = await postFile.json();
                console.log('postFile: ', postFile_data);
                this.commonPost[i] = { ...this.commonPost[i], coverImage: postFile_data[0].file_id, media: postFile_data }
            }

            console.log('Hi99: ', this.commonPost);
            this.isLoading = false;

        },
        async getExpertPost() {
            this.isLoading = true;
            const res = await fetch('http://localhost:5003/api/eBird/expert_user/post');
            const res_data = await res.json();

            this.allExpertPost = res_data;
            this.expertPost = this.allExpertPost.filter(a => a.published == 0)

            console.log('Hi111: ', this.expertPost);

            for (let i = 0; i < this.expertPost.length; i++) {
                let postFile = await fetch(`http://localhost:5003/api/eBird/expert_user/post_file/${this.expertPost[i].post_id}`);
                let postFile_data = await postFile.json();
                //console.log('postFile: ',postFile_data);
                this.expertPost[i] = { ...this.expertPost[i], coverImage: postFile_data[0].file_id, media: postFile_data }

                let getBirds = await fetch(`http://localhost:5003/api/eBird/expert_user/post_bird/${this.expertPost[i].post_id}`);
                let postBird_data = await getBirds.json();
                this.expertPost[i] = { ...this.expertPost[i], birds: postBird_data }
            }

            console.log('Hi: ', this.expertPost);



            //let postFile = await fetch(`http://localhost:5003/api/eBird/general_user/post_file/${this.commonPost[0].post_id}`);
            //let postFile_data = await postFile.json();
            //console.log(postFile_data[0].file_id);

            //console.log(this.commonPost);
            //this.expertPost = this.allPost.filter(a => a.post_id >= 5)
            //console.log(this.expertPost);
            this.isLoading = false;
        }
    },
    mounted() {
        console.log("Hello!!!!");
        this.getPost();
        this.getExpertPost();
    },

    watch: {
        menuAddRecord(news, olds) {
            console.log(news);
        }
    },

    template: `
    <div v-if="this.isLoading" style="height: 100vh;" class="row align-items-center justify-content-center">
        <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only"></span>
        </div>
    </div>
    <Login @cancel="handleCancelLogin" @loggedIn="handleUserLogin" v-if="this.clickLogin"/>
    <AdminUser :type=this.userType v-if="this.userType >= 3" @logout="handleLogoutChild" />
    <div v-if="!this.clickLogin && this.userType <= 2 && !this.isLoading">
        <nav class="navbar navbar-light bg-light fixed-top p-0">
            <div class="container p-0"> 
                <img class="pl-2" style="height: 50px" src="../images/logo.png"></img>
                <button v-if='!isUserLogin' @click="handleLogin" type="button" class="btn btn-lg btn-without-bg">
                    <div class="d-flex align-items-center">
                        <p style="color: blue" class="m-0 p-0">Login/Register</p>
                        <i class="bi bi-box-arrow-right ps-3" style="font-size: 1.5rem;"></i>
                    </div>
                </button>
                <div class="d-flex align-items-center" v-if='isUserLogin'>
                    <p style="color: blue" class="m-0 p-0">@{{this.userDetail.user_name}}</p> 
                    <button @click="handleLogout" type="button" class="btn btn-lg btn-without-bg">
                        <i class="bi bi-box-arrow-left" style="font-size: 1.5rem;"></i>
                    </button>
                </div>
            </div>
        </nav>
        <div style="margin-top: 80px; margin-bottom: 80px" class="container" v-if="this.menuHome && !showRecord">
                <div class="col">
                    <div class="row">
                        <div class="d-flex scroll-post">
                            <div v-for="(post, index) in this.commonPost" class="me-4">
                                
                                <img class="post-img" @click="handleShowRecord(index)" v-bind:src="'http://localhost:5003/api/eBird/media/' + post.coverImage"></img>
                                
                                <p class="post-title">{{post.common_name}}</p>
                                <p class="post-user">@{{post.user_name}}</p>
                            </div>
                        </div>
                    </div>

                    <div class="row my-5">
                        <h2 class="text-center">Recommendation</h3>
                    </div>
                    
                    <div class="row justify-content-between">
                            <div v-for="(post, index) in this.expertPost" class="col-12 col-sm-6 col-lg-4">
                            <div class="row justify-content-center p-0">
                                <div style="border-radius: 15px; width: 300px; height: 400px" class="card mx-4 my-4 p-0">
                                    <img class="card-img-top expert-post-img" @click="handleShowExpertRecord(index)" v-bind:src="'http://localhost:5003/api/eBird/expert/media/' + post.coverImage" />
                                    <div class="card-body">
                                        <h5 class="card-title">{{post.common_name}}</h5>
                                        <p class="card-text">@{{post.user_name}} *Expert</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                    </div>
                </div>
        </div>
        <div v-if="showRecord && this.menuHome" style="margin-top: 50px;margin-bottom: 80px;" class="container">
            <i  @click="this.showRecord=false;" class="bi bi-arrow-left" style="font-size: 1.5rem;"></i>
            <Record :record=this.selectedRecord :isExpert=this.isExpert />
        </div>
        <div style="margin-top: 80px; margin-bottom: 80px" v-if="this.menuAddRecord && this.userType == 1" class="container">
            <RecordForm @submitted="handleSubmit" />
        </div>
        <div style="margin-top: 80px; margin-bottom: 80px;" v-if="this.menuAddRecord && this.userType == 2" class="container">
            <ExpertRecordForm @submitted="handleSubmit" />
        </div>
        <div style="margin-top: 80px; margin-bottom: 80px;" v-if="this.menuSearch" class="container">
            <Search />
        </div>
        <div style="margin-top: 80px" v-if="this.menuMap" class="container">
            <Map />
        </div>
        <div style="margin-top: 50px; margin-bottom: 80px;" v-if="this.menuProfile" class="container">
            <Profile :type=type />
        </div>
        <div class="container">
            <nav class="navbar bg-light fixed-bottom p-0">
                <div class="container justify-content-center">
                    <div class="">
                        <button @click="
                        this.menuHome=true;
                        this.menuAddRecord=false;
                        this.menuSearch=false;
                        this.menuProfile=false;
                        this.menuMap=false;
                        " type="button" class="btn btn-lg btn-without-bg">
                            <i class="bi bi-house" style="font-size: 2rem;"></i>
                        </button>
                    </div>
                    <div class="">
                    <button
                    v-if="this.userDetail"
                    @click="
                    this.menuHome=false;
                    this.menuAddRecord=true;
                    this.menuSearch=false;
                    this.menuProfile=false;
                    this.menuMap=false;
                    " type="button" class="btn btn-lg btn-without-bg">
                        <i class="bi bi-file-earmark-plus" style="font-size: 2rem;"></i>
                    </button>
                    </div>
                    <div class="">
                    <button @click="
                    this.menuHome=false;
                    this.menuAddRecord=false;
                    this.menuSearch=true;
                    this.menuProfile=false;
                    this.menuMap=false;
                    "  type="button" class="btn btn-lg btn-without-bg">
                        <i class="bi bi-search" style="font-size: 2rem;"></i>
                    </button>
                    </div>
                    <div class="">
                    <button @click="
                    this.menuHome=false;
                    this.menuAddRecord=false;
                    this.menuSearch=false;
                    this.menuProfile=false;
                    this.menuMap=true;
                    " type="button" class="btn btn-lg btn-without-bg">
                        <i class="bi bi-pin-map" style="font-size: 2rem;"></i>
                    </button>
                    </div>
                    <div class="">
                    <button v-if="this.userDetail" @click="
                    this.menuHome=false;
                    this.menuAddRecord=false;
                    this.menuSearch=false;
                    this.menuProfile=true;
                    this.menuMap=false;
                    " type="button" class="btn btn-lg btn-without-bg">
                        <i class="bi bi-person-fill" style="font-size: 2rem;"></i>
                    </button>
                    </div>
                </div>
            </nav>
        </div>
    </div>
    `
}