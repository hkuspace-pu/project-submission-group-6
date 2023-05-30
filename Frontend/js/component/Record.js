

export default {
    components: {
      "BirdDetail": Vue.defineAsyncComponent(() => import('./BirdDetail.js'))
    },
    props: {
        record: {},
        isExpert: false,
    },
    data() {
        return {
            isLoading: false,
            media: [],
            lat: null,
            lng: null,
            map: null,
            isLoading: false,
            bird: null,
            showDB: false,
        }
    },
    methods: {
        handleLogin(){

        },
        handleShowDatabase(index) {
            if (this.isExpert) {
                this.bird = this.record.birds[index];
                this.showDB = true;
            } else {
                this.bird = this.record
                this.showDB = true;
            }
        },
        handleLogoutChild(data) {
    
        },
        handleSearch(){
            this.filterList = this.birdList.filter(word => word.birdEnName.toLowerCase().includes(this.searchWord.toLowerCase()))
        },
        initMap() {
            this.map = new google.maps.Map(document.getElementById("locationSpot"), {
                zoom: 15,
                center: { lat: this.lat, lng: this.lng },
            });
        },
        setMarker() {
            // 建立一個新地標
            const marker = new google.maps.Marker({
              // 設定地標的座標
              position: { lat: this.lat, lng: this.lng },
              // 設定地標要放在哪一個地圖
              map: this.map
            });
          }
    },
    mounted() {
        this.isLoading = true;
        console.log('Hello!!', this.record);

        this.media = this.record.media;
        this.lat = this.record.lat;
        this.lng = this.record.lng;

        this.initMap();
        this.setMarker();
        this.isLoading = false;
    },

    watch: {
    },

    template: `
    <div v-if="this.isLoading" style="height: 100vh;" class="row align-items-center justify-content-center">
        <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only"></span>
        </div>
    </div>
    <div v-if="!this.showDB">
        <div v-if="!this.isLoading" style="border-radius: 15px;" class="card border-secondary">
        
                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item" :class="{ active: index == 0 }" v-for="(post, index) in this.media">
                            <img v-if="!this.isExpert" class="d-block w-100 card-img-top" v-bind:src="'http://localhost:5003/api/eBird/media/' + post.file_id" >
                            <img v-if="this.isExpert" class="d-block w-100 card-img-top" v-bind:src="'http://localhost:5003/api/eBird/expert/media/' + post.file_id">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                
            <div v-if="!this.isExpert" class="card-header">
                <p class="h4">{{this.record.common_name}}</p>
                <p class="p-0 m-0">{{this.record.chinese_name}}</p>
                <p class="p-0 m-0"><i>{{this.record.scientific_name}}<i></p>
            </div>
            <div v-if="this.isExpert" v-for="(bird, index) in this.record.birds" class="card-header">
                <p class="h4">{{bird.common_name}}</p>
                <p class="p-0 m-0">{{bird.chinese_name}}</p>
                <p class="p-0 m-0"><i>{{bird.scientific_Name}}<i></p>
            </div>
            <div class="card-body text-secondary">
                <p class="p-0 m-0">Name of surveyor: </p><p style="color: grey">user@{{this.record.user_name}} </p>
                <p class="p-0 m-0">Record time: </p><p style="color: grey">{{this.record.date_time}}</p>
                <p class="p-0 m-0">Observation notes: </p><p style="color: grey">{{this.isExpert? this.record.comment :this.record.description}}</p>
                <p v-if="this.isExpert" class="p-0 m-0">Observation type: </p><p style="color: grey">{{this.record.observation_type}}</p>
                <p v-if="this.isExpert" class="p-0 m-0">Distance(miles): </p><p style="color: grey">{{this.record.distance}}</p>
                <p v-if="this.isExpert" class="p-0 m-0">Duration(minutes): </p><p style="color: grey">{{this.record.duration}}</p>
                <p class="p-0 m-0">Location: </p>
                <div class="small-map" id="locationSpot"></div> 
            </div>
        </div>
        <div v-if="!this.isLoading" class="mt-5">
            <h4>Find out more information: </h4>
        </div>
        <div v-if="!this.isLoading && !this.isExpert" class="d-flex mb-3">
            <img @click="handleShowDatabase" style="height: 80px; width: 100px; border-radius: 15px" v-bind:src="'http://localhost:5003/api/eBird/birds/media/' + this.record.image_id" />
            <div class="col ps-3">
                <p style="font-size: 12px" class="pt-2 m-0">{{this.record.chinese_name}}</p>
                <p style="font-size: 12px" class="p-0 m-0">{{this.record.common_name}}</p>
                <p style="font-size: 12px" class="p-0 m-0"><i>{{this.record.scientific_Name}}</i></p>
            </div>
        </div>
        <div v-if="!this.isLoading && this.isExpert" v-for="(bird, index) in this.record.birds" class="d-flex mb-3">
            <img @click="handleShowDatabase(index)" style="height: 80px; width: 100px; border-radius: 15px" v-bind:src="'http://localhost:5003/api/eBird/birds/media/' + bird.image_id" />
            <div class="col ps-3">
                <p style="font-size: 12px" class="pt-2 m-0">{{bird.chinese_name}}</p>
                <p style="font-size: 12px" class="p-0 m-0">{{bird.common_name}}</p>
                <p style="font-size: 12px" class="p-0 m-0"><i>{{bird.scientific_Name}}</i></p>
            </div>
        </div>
    </div>
    
    <BirdDetail v-if="this.showDB" :bird="this.bird"/>

    `
}