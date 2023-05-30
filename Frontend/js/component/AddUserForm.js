
export default {
    components: {

    },
    props: {
    
    },
    data() {
        return {
            isLoading: false,
            selectedSpecies: 0,
            selectedOs: 'publish',
            birdList: [
            ],
            regFirstName: '',
            regLastName: '',
            regUserName: '',
            regUserEmail: '',
            regUserPassword: '',
            regUserType: 0,
        }
    },
    methods: {
        handleLogin(){

        },
        handleLogoutChild(data) {

        },
        handleSubmit(){
            this.$emit('submit', true)
        },
        async handleRegister() {
            this.isLoading = true;
            console.log('REg: ', this.regFirstName, this.regLastName, this.regUserEmail, this.regUserPassword, this.regUserName);
            const formData = {
                user_name: this.regUserName,
                first_name: this.regFirstName,
                last_name: this.regLastName,
                user_email: this.regUserEmail,
                user_password: this.regUserPassword,
                user_type: this.regUserType
            }
            try {
                const res = await axios.post('http://localhost:5003/api/eBird/register', formData)

                if (res.data) {
                    alert("Account created!")
                    this.clickRegister = false;
                    //this.$refs.regForm.reset(); 
                    this.isLoading = false;
                }
                this.$emit('submitted', true)

            } catch (e) {
                console.log(e);
                alert('Register fail. Duplicate username.')
                this.isLoading = false;
            }
        }
    },
    mounted() {

    },

    watch: {
  
    },

    template: `
    <div class="card border-secondary">
        <div class="card-header">
            <p class="text-center h4 mt-5 mb-3">Create new user account</p>
        </div>
        <div class="card-body">
        <div class="col p-0">
            <div class="mx-auto" style="width: 90%">
                <form ref="regForm" @submit.prevent="this.handleRegister">
                    <input v-model="this.regFirstName" required type="text" class="form-control mt-2" placeholder="First name" aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <input v-model="this.regLastName" required type="text" class="form-control mt-2" placeholder="Last name" aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <input v-model="this.regUserName" required type="text" class="form-control mt-2" placeholder="Username" aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <input v-model="this.regUserEmail" required type="email" class="form-control mt-2" placeholder="Email" aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <input v-model="this.regUserPassword" required type="password" class="form-control mt-2" placeholder="Password" aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <select v-model="this.regUserType" class="form-control mt-2" id="inputGroupSelect01">
                            <option value="0">General user</option>
                            <option value="1">Expert user</option>
                            <option value="2">Modulator</option>
                            <option value="3">Admin</option>
                    </select>
                    <button type="submit" class="btn btn-md btn-warning btn-block mt-2">Submit</button>
                </form>
            </div>
        </div>
        </div>
    </div>
    `
}