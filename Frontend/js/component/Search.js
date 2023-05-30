import BirdDetail from "./BirdDetail.js";
export default {
    components: {
        BirdDetail
    },
    props: {
    
    },
    data() {
        return {
            isLoading: false,
            selectedSpecies: 0,
            searchWord: '',
            showRecord: false,
            selectedUser: 0,
            birdList: [
                {
                    userName: 'Jack *expert',
                    birdChName:'中華鷓鴣',
                    birdEnName:'Chinese Francolin',
                    birdOffName:'Francolinus pintadeanus',
                    url:'../images/0.jpg',
                    isExpert: true,
                    hours: 2
                },
                {
                    userName: 'Ben',
                    birdChName:'鵪鶉',
                    birdEnName:'Japanese Quail',
                    birdOffName:'Coturnix japonica',
                    url:'../images/1.jpg',
                    isExpert: false,
                    hours: 4
                },
                {
                    userName: 'Jay',
                    birdChName:'栗樹鴨',
                    birdEnName:'Lesser Whistling Duck',
                    birdOffName:'Dendrocygna javanica',
                    url:'../images/2.jpg',
                    isExpert: false,
                    hours: 12
                },
                {
                    userName: 'Saul *expert',
                    birdChName:'灰雁',
                    birdEnName:'Greylag Goose',
                    birdOffName:'Anser anser',
                    url:'../images/3.jpg',
                    isExpert: true,
                    hours: 8
                },
            ],
        filterList: [],
        tempList: [],
        allBirds: [],
        bird:{}
        }
    },
    methods: {
        handleLogin(){

        },
        handleLogoutChild(data) {
    
        },
        handleSearch(){
            this.filterList = this.allBirds.filter(word => word.common_name.toLowerCase().includes(this.searchWord.toLowerCase()))
        },

        download () {
            const url = '../images/0.jpg';
            window.location.href = url;
        },
        async getBirds() {
            const res = await fetch('http://localhost:5003/api/eBird/birds');
            const res_data = await res.json();
            this.allBirds = res_data;
            console.log('Hi: ', this.allBirds);
            this.filterList = this.allBirds
        },
        handleShowDetail(id){
            this.bird = this.filterList.find(b => b.bird_id == id)
            this.showRecord = true;
        },
    },
    mounted() {
        this.getBirds();
    },

    watch: {
        searchWord(nee,ddd){
            console.log(nee);
        }
    },

    template: `
    <div v-if="this.isLoading" style="height: 100vh;" class="row align-items-center justify-content-center">
        <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only"></span>
        </div>
    </div>
    <div v-if="!showRecord && !this.isLoading" class="container p-0">
        <div class="input-group mb-3">
            <input v-model="this.searchWord" type="text" class="form-control" placeholder="What are you looking for?" aria-label="Username" aria-describedby="basic-addon1">
            <span @click="handleSearch" class="input-group-text" id="basic-addon1"><i class="bi bi-search-heart"></i></span>
        </div>
        
        <div class="d-flex my-5" v-for="(value, key) in this.filterList">
            <img @click="handleShowDetail(value.bird_id)" style="height: 150px; width: 200px; border-radius: 15px" v-bind:src="'http://localhost:5003/api/eBird/birds/media/' + value.image_id" />
            <div class="col ps-3">
                <p style="font-size: 12px" class="pt-2 m-0">{{value.chinese_name}}</p>
                <p style="font-size: 12px" class="p-0 m-0">{{value.common_name}}</p>
                <p style="font-size: 12px" class="p-0 m-0"><i>{{value.scientific_Name}}</i></p>
            </div>
        </div>
    </div>
    <i v-if="showRecord" @click="this.showRecord=false;" class="bi bi-arrow-left" style="font-size: 1.5rem;"></i>
    <BirdDetail v-if="showRecord" :bird="this.bird"/>
    `
}