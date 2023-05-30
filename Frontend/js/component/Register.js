export default {
    components: {

    },
    props: {
    
    },
    data() {
        return {
            isLoading: false,
            clickSignIn: false,
        }
    },
    methods: {
        async handleRegister(){
            console.log('Reg');
        },
    },
    mounted() {

    },

    watch: {

    },

    template: `
    <div v-if="this.isLoading" class="row align-items-center justify-content-center">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    <div class="container p-0">
        <div class="col p-0">
            <img class="mx-auto d-block mt-5" src="../images/big-logo.png"></img>
            <p class="text-center h4">Welcome to Birdwatching!</p>
            <div class="mx-auto" style="width: 80%">
                <input type="email" class="form-control" placeholder="Email" aria-label="Recipient's username" aria-describedby="basic-addon2">
                <input type="password" class="form-control mt-2" placeholder="Password" aria-label="Recipient's username" aria-describedby="basic-addon2">
                <button type="button" class="btn btn-md btn-warning btn-block mt-2" @click="this.clickSignIn=true">Sign up</button>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                        <p class="m-0">Already have an account?  </p>
                        <button type="button" class="btn btn-link btn-sm p-0">Sign in!</button>
                    </div>
            </div>
        </div>
    </div>
    `
}