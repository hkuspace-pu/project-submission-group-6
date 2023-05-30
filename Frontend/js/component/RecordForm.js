import { store } from "../store/store.js";

export default {
    components: {

    },
    props: {

    },
    data() {
        return {
            isLoading: false,
            selectedSpecies: 0,
            selectedDateTime: null,
            description: null,
            allBirds: [],
            lat: 22.3526401,
            lng: 113.9628898,
            displayMap: false,
            location: '',
            allFiles: null,
            store,
            searchWord:'',
            filterList: [],
        }
    },
    methods: {
        handleLogin() {

        },
        handleLogoutChild(data) {

        },
        handleSearch() {
            if (this.searchWord.length > 0) { 
                this.filterList = this.allBirds.filter(word => word.common_name.toLowerCase().includes(this.searchWord.toLowerCase())) 
            }
            else {
                this.filterList = []
            }
        },
        async handleSubmit() {
            //this.$emit('submit', true)
            const formData = new FormData();

            for (let i = 0; i < this.allFiles.length; i++) {
                formData.append('file', this.allFiles[i])
            }

            formData.append('bird_id', this.filterList[this.selectedSpecies].bird_id);
            formData.append('user_id', store.user.user_id);
            formData.append('description', this.description);
            formData.append('date_time', this.selectedDateTime);
            formData.append('lat', this.lat);
            formData.append('lng', this.lng);
            formData.append('status', 1);
            
            const res = await axios.post('http://localhost:5003/api/eBird/general/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log('Posted!', res);
            if (res.status == 201) {
                alert("Success!")
                this.$emit('submitted', true)
            }
        },
        async getBirds() {
            const res = await fetch('http://localhost:5003/api/eBird/birds');
            const res_data = await res.json();
            this.allBirds = res_data;
            //console.log('get: ', this.allBirds);
            //this.filterList = this.allBirds
            //this.filterList = this.allBirds
        },
        showMap() {
            //this.displayMap = true;
            //this.setMarker();
        },
        previewFiles(event) {
            console.log(event.target.files);
            this.allFiles = event.target.files;
        },
        initMap() {
            //const myLatlng = { lat: -25.363, lng: 131.044 };
            const map = new google.maps.Map(document.getElementById("locationMap"), {
                zoom: 10,
                center: { lat: this.lat, lng: this.lng },
            });
            // Create the initial InfoWindow.
            let infoWindow = new google.maps.InfoWindow({
                content: "Click the map to get Lat/Lng!",
                position: { lat: this.lat, lng: this.lng },
            });

            infoWindow.open(map);
            // Configure the click listener.
            map.addListener("click", (mapsMouseEvent) => {
                // Close the current InfoWindow.
                infoWindow.close();
                // Create a new InfoWindow.
                infoWindow = new google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng,
                });
                infoWindow.setContent(
                    JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
                );
                //console.log(mapsMouseEvent.latLng.toJSON())
                let latLng = mapsMouseEvent.latLng.toJSON()
                this.lat = latLng.lat
                this.lng = latLng.lng
                console.log(this.lat, this.lng);
                this.location = JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)

                infoWindow.open(map);
            });
        },
    },
    mounted() {
        this.getBirds()
        this.initMap()
        console.log('Hii', store.user);
    },

    watch: {

    },

    template: `
    <div class="p-0">
        <div class="d-flex justify-content-center p-0 m-0">
                <i class="bi bi-image p-0 m-0" style="font-size: 8rem;"></i>
            </div>
        <div class="card-header">
            <p class="text-center h4 mt-5 mb-3">Create new record</p>
            </div>
                <div class="card-body mx-auto" style="width: 100%">
                    <form @submit.prevent="this.handleSubmit">
                        <p class="mt-2">Import files: </p> 
                            <div class="input-group mt-3">
                                <input @change="previewFiles" multiple type="file" class="form-control" id="inputGroupFile02">
                            </div>
                            <p class="mt-2">Species: </p> 
                            <div class="input-group mb-3">
                        <input v-model="this.searchWord" type="text" class="form-control" placeholder="Search by common name..">
                            <button @click="handleSearch" class="btn btn-outline-secondary" type="button"><i class="bi bi-search-heart"></i></button>
                        </div>
                        <select v-if="this.filterList.length > 0" class="form-control mt-3" v-model="selectedSpecies" :required @change="">
                            <optgroup label="Select species">
                            <option v-for="(bird, index) in this.filterList" selected = index==0 :value=index>{{bird.common_name}}</option>
                            </optgroup>
                        </select>
                        
                        <p class="mt-2">Select date time: </p> 
                        <input type="datetime-local" v-model="selectedDateTime" class="form-control mt-3" placeholder="Date time" aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <p class="mt-2 mb-0">Where do you bird? </p>
                        <div class="small-map" id="locationMap"></div> 
                        <input readonly v-model="location" type="text" class="form-control mt-3" placeholder="Location" aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <p class="mt-2">Description: </p> 
                        <textarea v-model="description" placeholder="Description" class="form-control mt-3" aria-label="With textarea"></textarea>
                        <button type="submit" class="btn btn-md btn-warning btn-block mt-3">Submit</button>
                    </form>
                </div>
    </div>
    `
}