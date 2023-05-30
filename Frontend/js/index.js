
import GeneralUser from "./component/GeneralUser.js"

export default {
    components: {
        GeneralUser
    },
    props: {
    
    },
    data() {
        return {
            isLoading: false,
            clickLogin: false,
        }
    },
    methods: {
   
    },
    mounted() {
        
    },

    watch: {

    },

    template: `
    <div v-if="this.isLoading" class="row align-items-center justify-content-center">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    <!--
    <div v-if="!this.clickLogin" class="container p-0">
        <div class="col p-0">
        <img src="./images/logo.png"></img>
            <p class="p-1 mb-0 h1">
            Birdwatching
            </p>
            <p class="text-align-left h6 p-3">
            Explore birds and hotspots near you and wherever you go, all based on the latest sightings from around the world. <br />Every sighting matters. Contribute yours.
            </p>
            <div class="landing-button">
                <button type="button" class="btn btn-md main-button ml-3" @click="this.clickLogin=true">Login</button>
            </div>
        </div>
    </div>
    -->
    <GeneralUser />
    `
}