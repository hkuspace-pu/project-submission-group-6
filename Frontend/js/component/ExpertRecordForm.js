import { store } from "../store/store.js";
export default {
    components: {

    },
    props: {

    },
    data() {
        return {
            store,
            isLoading: false,
            selectedSpecies: 0,
            selectedOs: 0,
            allBirds: null,
            selectedObservationType: null,
            comment: null,
            lat: 22.3526401,
            lng: 113.9628898,
            location: null,
            date_time: null,
            birdNumber: [],
            allFiles: null,
            duration: 0,
            distance: 0,
            searchWord: '',
            filterList: []
        }
    },
    methods: {
        handleLogin() {

        },
        handleSearch() {
            if (this.searchWord.length > 0) { this.filterList = this.allBirds.filter(word => word.common_name.toLowerCase().includes(this.searchWord.toLowerCase())) }
            else {
                this.filterList = []
            }
        },
        handleLogoutChild(data) {

        },
        previewFiles(event) {
            console.log(event.target.files);
            this.allFiles = event.target.files;
        },
        async handleSubmit() {
            console.log('455', this.selectedObservationType);

            //const createAt = Date.now()

            const formData = new FormData();

            for (let i = 0; i < this.allFiles.length; i++) {
                formData.append('file', this.allFiles[i])
            }

            formData.append('bird_id', this.filterList[this.selectedSpecies].bird_id);
            formData.append('user_id', store.user.user_id);
            formData.append('comment', this.comment);
            formData.append('date_time', this.date_time);
            formData.append('lat', this.lat);
            formData.append('lng', this.lng);
            formData.append('observation_type', this.selectedObservationType);
            //formData.append('createAt', createAt);
            formData.append('duration', this.duration);
            formData.append('distance', this.distance);
            formData.append('published', this.selectedOs);

            console.log('calling');

            for (var pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }

            console.log('calling2');

            //const formDataTest = new FormData();

            let res = await axios.post('http://localhost:5003/api/eBird/expert/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            let createdPost = res.data[0]

            console.log('78', res, '79', createdPost.post_id);

            if (res.status == 201) {
                console.log('inside');
                const birdData = new FormData();

                for (let i = 0; i < this.birdNumber.length; i++) {
                    birdData.append('post_id', createdPost.post_id);
                    birdData.append('bird_id', this.birdNumber[i].bird_id);
                    birdData.append('number_of_birds', this.birdNumber[i].count);

                    for (var pair of birdData.entries()) {
                        console.log(pair[0] + ', ' + pair[1]);
                    }

                    res = await axios.post('http://localhost:5003/api/eBird/expert/post_birds', birdData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    console.log('ihih', res);

                    birdData.delete('post_id');
                    birdData.delete('bird_id');
                    birdData.delete('number_of_birds');
                }
                //birdData.append('birds', this.birdNumber);

                if (res.status == 201) {
                    alert("Success!")
                    this.$emit('submitted', true)
                }
            }

            console.log('Here: ', res);
            /*
            try {

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

            } catch (e) { console.log(e); }
            */


            //this.$emit('submit', true)
        },
        handleBirdNumber(event, index) {
            //console.log(index);
            console.log(index, event.target.value);

            let birdInput = {
                bird_id: this.filterList[index].bird_id,
                count: event.target.value
            }

            let foundIndex = this.birdNumber.findIndex(b => b.bird_id == this.filterList[index].bird_id)

            console.log('find', foundIndex);

            if (foundIndex >= 0) {
                this.birdNumber[foundIndex] = birdInput
            } else {
                this.birdNumber.push(birdInput)
            }

            console.log('Birds: ', this.birdNumber);

        },
        async getBirds() {
            const res = await fetch('http://localhost:5003/api/eBird/birds');
            const res_data = await res.json();
            this.allBirds = res_data;
            console.log('get: ', this.allBirds);
            //this.filterList = this.allBirds
        },
        initMap() {
            //const myLatlng = { lat: -25.363, lng: 131.044 };
            const map = new google.maps.Map(document.getElementById("locationMapExpert"), {
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
        console.log('bird', this.birdNumber);
        this.getBirds()
        this.initMap()
    },

    watch: {

    },

    template: `
    <div class="card border-secondary mb-5">
        <div class="card-header">
            <p class="text-center h4 mt-5 mb-3">Create new record</p>
        </div>
        <div class="card-body">
            <div class="col p-0">
                <form @submit.prevent="this.handleSubmit">
                    <p>Import from file: </p>
                    <div class="input-group mt-3">
                        <input @change="previewFiles" multiple type="file" class="form-control" id="inputGroupFile02">
                    </div>
                    <p class="mt-2">Where did you bird?</p>
                    <div class="small-map" id="locationMapExpert"></div> 
                    <input readonly v-model="location" type="text" class="form-control mt-3" placeholder="Location" aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <p class="mt-2">Date</p>   
                    <input v-model="date_time" type="datetime-local" class="form-control mt-3" placeholder="Observation Date" aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <p class="mt-2">Observation Type</p>   
                        <select class="form-control mt-3" v-model="selectedObservationType" :required>
                                <optgroup label="Observation Type">
                                <option>Traveling</option>
                                <option>Stationary</option>
                                <option>Historical</option>
                                <option>Incident</option>
                                </optgroup>
                        </select>
                    <p class="mt-2">Duration</p>
                    <input v-model="duration" type="text" class="form-control mt-3" placeholder="hours" aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <p class="mt-2">Distance</p>
                    <input v-model="distance" type="text" class="form-control mt-3" placeholder="miles" aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <p class="mt-2">Comments</p>
                    <textarea v-model="comment" placeholder="" class="form-control mt-3" aria-label="With textarea"></textarea>
                    <p class="mt-2">What did you see?</p>
                    <div class="input-group mb-3">
                        <input v-model="this.searchWord" type="text" class="form-control" placeholder="Search by common name..">
                            <button @click="handleSearch" class="btn btn-outline-secondary" type="button"><i class="bi bi-search-heart"></i></button>
                        </div>
                    <div v-if="this.filterList.length > 0" v-for="(value, index) in this.filterList" class="input-group mb-3">
                        <div class="input-group-prepend" style="width: 15%">
                            <input @change="this.handleBirdNumber($event, index)" type="number" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                        <span style="width: 85%" class="input-group-text" id="basic-addon1">{{value.common_name}}</span>
                    </div> 
                    <div class="d-flex align-items-center">
                        <input class="ml-2" type="radio" value="0" v-model="selectedOs"> 
                        <p class="m-0 ps-3" style="font-size: 16px">Publish</p>
                    </div>
                    <div class="d-flex align-items-center mt-1">
                        <input class="ml-2" type="radio" value="1" v-model="selectedOs"> 
                        <p class="m-0 ps-3" style="font-size: 16px">Private</p>
                    </div>
                    <button type="submit" class="btn btn-md btn-warning btn-block mt-3">Submit</button>
                </form>
            </div>
        </div>
    </div>
    `
}