import RecordForm from "./RecordForm.js";
import ExpertRecordForm from "./ExpertRecordForm.js";
import Search from "./Search.js";
import Profile from "./Profile.js";
import Record from "./Record.js";
import Map from "./Map.js";
import SurveyRecord from "./SurveyRecord.js";
import UserRecord from "./UserRecord.js";
import ModulatorSurveyRecord from "./ModulatorSurveyRecord.js";
import BirdList from "./BirdList.js";
import { store } from "../store/store.js";
export default {
    components: {
        RecordForm,
        Search,
        Profile,
        Record,
        ExpertRecordForm,
        Map,
        SurveyRecord,
        UserRecord,
        ModulatorSurveyRecord,
        BirdList
    },
    props: {
        type:0
    },
    data() {
        return {
            store,
            isLoading: false,
            menuSurvey: true,
            menuUser: false,
            menuBirds: false,
            showRecord: false,
            isAdmin: false,
        }
    },
    methods: {
        handleLogin(){
      
        },
        handleLogout(){
            this.$emit('logout', false)
        },
        handlecontent(){
           console.log('gggg');
        },
        handleSubmit(data){
            this.menuSearch = false;
            this.menuAddRecord = false;
            this.menuHome = true;
        }
    },
    mounted() {
        console.log(this.store.user);
        this.isAdmin = this.store.user.user_type == 3
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
    <nav class="navbar navbar-light bg-light fixed-top p-0">
        <div class="container p-0"> 
            <img class="pl-2" style="height: 30px" src="../images/logo.png"></img>
            <div class="d-flex align-items-center" v-if='true'>
                <p style="color: blue" class="m-0 p-0">@{{this.store.user.user_name}}</p>
                <button @click="handleLogout" type="button" class="btn btn-lg btn-without-bg">
                    <i class="bi bi-box-arrow-left" style="font-size: 1.5rem;"></i>
                </button>
            </div>
        </div>
    </nav>
    <div style="margin-top: 80px; margin-bottom: 80px" class="container" v-if="this.menuSurvey && !showRecord">
           <SurveyRecord />
    </div>
    <div v-if="showRecord && this.menuSurvey" style="margin-top: 50px;" class="container">
    <i  @click="this.showRecord=false;" class="bi bi-arrow-left" style="font-size: 1.5rem;"></i>
        <Record />
    </div>
    <div style="margin-top: 80px; margin-bottom: 80px" class="container" v-if="this.menuUser && !showRecord">
           <UserRecord />
    </div>
    <div style="margin-top: 80px; margin-bottom: 80px" class="container" v-if="this.menuBirds && !showRecord">
           <BirdList />
    </div>
    <div v-if="showRecord && this.menuSurvey" style="margin-top: 50px; margin-bottom: 80px" class="container">
    <i  @click="this.showRecord=false;" class="bi bi-arrow-left" style="font-size: 1.5rem;"></i>
        <Record />
    </div>
    <div class="container">
        <nav class="navbar  bg-light fixed-bottom p-0">
            <div class="container justify-content-center">
            <div class="mx-5">
                <button @click="
                this.menuSurvey=true;
                this.menuUser=false;
                this.menuBirds=false;
                " type="button" class="btn btn-lg btn-without-bg">
                    <i class="bi bi-archive" style="font-size: 2rem;"></i>
                </button>
                </div>
                <div v-if="isAdmin" class="mx-5">
                <button @click="
                this.menuSurvey=false;
                this.menuUser=true;
                this.menuBirds=false;
                " type="button" class="btn btn-lg btn-without-bg">
                    <i class="bi bi-people" style="font-size: 2rem;"></i>
                </button>
                </div>
                <div v-if="isAdmin" class="mx-5">
                <button @click="
                this.menuSurvey=false;
                this.menuUser=false;
                this.menuBirds=true;
                " type="button" class="btn btn-lg btn-without-bg">
                <i class="bi bi-list-columns" style="font-size: 2rem;"></i>
                </button>
                </div>
            </div>
        </nav>
    </div>
    `
}