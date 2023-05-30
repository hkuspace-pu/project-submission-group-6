import { store } from "../store/store.js";

export default {
    components: {

    },
    props: {
        record: null,
    },
    data() {
        return {
            store,
            isLoading: false,
            selectedSpecies: 0,
            selectedDateTime: null,
            description: null,
            allBirds: [],
            lat: null,
            lng: null,
            displayMap: false,
            location: '',
            allFiles: null,
            store,
            status: 1
        }
    },
    methods: {
        handleLogin() {

        },
        handleLogoutChild(data) {

        },
        async handleSubmit() {
            //this.$emit('submit', true)
            const formData = new FormData();

            formData.append('bird_id', this.allBirds[this.selectedSpecies].bird_id);
            formData.append('bird_id', this.allBirds[this.selectedSpecies].bird_id);
            //formData.append('user_id', store.user.user_id);
            formData.append('description', this.description);
            formData.append('date_time', this.selectedDateTime);
            formData.append('lat', this.lat);
            formData.append('lng', this.lng);
            formData.append('status', this.status);


            const res = await axios.put(`http://localhost:5003/api/eBird/general/post/${this.record.post_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log('Posted!', res);
            if (res.status == 200) {
                alert("Save!")
                this.$emit('submitted', true)
            }
        },
        async getBirds() {
            const res = await fetch('http://localhost:5003/api/eBird/birds');
            const res_data = await res.json();
            this.allBirds = res_data;
            //let findings = this.allBirds.find(e => e.bird_id == this.record.bird_id)
            //console.log('finddd',findings );
            //this.selectedSpecies = findings.common_name
            //console.log('get: ', this.allBirds);
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
        console.log("EDITTT", this.record);
        this.lat = this.record.lat
        this.lng = this.record.lng
        this.selectedDateTime = this.record.date_time
        this.description = this.record.description
        this.status = this.record.status
        this.getBirds()
        this.initMap()
        console.log('Hii77', store.user);
    },

    watch: {

    },

    template: `
    <div class="p-0">
        <div class="d-flex justify-content-center p-0 m-0">
                <i class="bi bi-image p-0 m-0" style="font-size: 8rem;"></i>
            </div>
        <div class="card-header">
            <p class="text-center h4 mt-5 mb-3">Edit survey record</p>
            </div>
            <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div v-for="(post, index) in this.record.media" class="carousel-item" :class="{ active: index == 0 }">
                        <img v-if="!this.isExpert" class="d-block w-100 card-img-top" v-bind:src="'http://localhost:5003/api/eBird/media/' + post.file_id" alt="First slide">
                        <img v-if="this.isExpert" class="d-block w-100 card-img-top" v-bind:src="'http://localhost:5003/api/eBird/expert/media/' + post.file_id" alt="First slide">
                    </div>
                </div>
            </div>
                <div class="card-body mx-auto" style="width: 100%">
                    <form @submit.prevent="this.handleSubmit">
                            <p class="mt-2">Select species: </p> 
                        <select class="form-control mt-3" v-model="selectedSpecies" :required @change="">
                            <optgroup label="Select species">
                            <option v-for="(bird, index) in this.allBirds" selected = index==0 :value=index>{{bird.common_name}}</option>
                            </optgroup>
                        </select>
                        <p class="mt-2">Select date time: </p> 
                        <input type="datetime-local" v-model="selectedDateTime" class="form-control mt-3" placeholder="Date time" aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <p class="mt-2 mb-0">Where do you bird? </p>
                        <div class="small-map" id="locationMap"></div> 
                        <input readonly v-model="location" type="text" class="form-control mt-3" placeholder="Location" aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <p class="mt-2">Description: </p> 
                        <textarea v-model="description" placeholder="Description" class="form-control mt-3" aria-label="With textarea"></textarea>
                        <div class="d-flex align-items-center mt-2">
                            <input class="ml-2" type="radio" value="0" v-model="status"> 
                            <p class="m-0 ps-3" style="font-size: 16px">Approve</p>
                        </div>
                        <div class="d-flex align-items-center mt-1">
                            <input class="ml-2" type="radio" value="1" v-model="status"> 
                            <p class="m-0 ps-3" style="font-size: 16px">Decline</p>
                        </div>
                        <button type="submit" class="btn btn-md btn-warning btn-block mt-3">Save</button>
                    </form>
                </div>
    </div>
    `
}