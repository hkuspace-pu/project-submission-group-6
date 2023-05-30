import AdminUser from "./AdminUser.js";
import { store } from "../store/store.js";

export default {
    components: {
        AdminUser
    },
    props: {

    },
    data() {
        return {
            store,
            isLoading: false,
            isLogin: false,
            clickRegister: false,
            clickSignIn: false,
            selectedUserType: 0,
            generalLanding: false,
            adminLanding: false,
            loginEmail: '',
            loginPassword: '',
            regFirstName: '',
            regLastName: '',
            regUserName: '',
            regUserEmail: '',
            regUserPassword: '',
        }
    },
    methods: {
        async handleLogin() {
            /*
            this.isLogin = true;
            let data = {
                type: 0
            }
            if (this.selectedUserType == 0) {
                data.type = 0
            } else if (this.selectedUserType == 1) {
                data.type = 1
            } else if (this.selectedUserType == 2) {
                data.type = 2
            } else if (this.selectedUserType == 3) {
                data.type = 3
            }*/
            const formData = {
                user_email: this.loginEmail,
                user_password: this.loginPassword,
            }
            const res = await axios.post('http://localhost:5003/api/eBird/login', formData)
            console.log(res);

            if (res.data) {
                this.isLogin = true;
                this.$emit('loggedIn', res.data)
            }
        },
        handleLogoutChild(data) {
            console.log('fff', data);
            this.isLogin = data;
            this.generalLanding = false
            this.adminLanding = false
        },
        handleBack() {
            this.$emit('cancel', false)
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
                user_type: 0
            }
            try {
                const res = await axios.post('http://localhost:5003/api/eBird/register', formData)

                if (res.data) {
                    alert("Register succes! please login")
                    this.clickRegister = false;
                    //this.$refs.regForm.reset(); 
                    this.isLoading = false;
                }

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
        selectedUserType(newc, oldc) {
            console.log(newc);
        }
    },

    template: `
    <div v-if="isLoading" style="margin-top: 50%" class="d-flex justify-content-center">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-if="!clickRegister && !isLogin && !isLoading" class="container p-0">
        <div class="col p-0">
            <button>
            <div @click="handleBack" class="d-flex align-items-center mt-4">
                <i class="bi bi-chevron-left pe-2" style="font-size: 1rem;"></i>
                <p class="m-0 p-0">back</p>
            </div>
            </button>
            <img class="mx-auto d-block mt-5" src="../images/big-logo.png"></img>
            <p class="text-center h4 pb-4">Welcome to Birdwatching!</p>
            <div class="mx-auto" style="width: 80%">
                <form ref="loginForm" @submit.prevent="this.handleLogin">
                    <input required v-model="this.loginEmail" type="email" class="form-control" placeholder="Email" aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <input required v-model="this.loginPassword" type="password" class="form-control mt-2" placeholder="Password" aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <!--
                    <select class="form-control mt-2" v-model="selectedUserType" :required @change="">
                        <option :value=0>general user</option>
                        <option :value=1>expert user</option>
                        <option :value=2>admin</option>
                        <option :value=3>modulator</option>
                    </select>
                    -->
                    <button type="submit" class="btn btn-md btn-warning btn-block mt-2">Login</button>
                </form>
                <div class="d-flex justify-content-between align-items-center mt-2">
                    <p class="m-0">Don’t have an account?  </p>
                    <button @click="this.clickRegister=true" type="button" class="btn btn-link btn-sm p-0">Register!</button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="clickRegister && !isLogin && !isLoading" class="container p-0">
        <div class="col p-0">
            <img class="mx-auto d-block mt-5" src="../images/sign-up.png"></img>
            <p class="text-center h4 mt-3 mb-3">Welcome! Sign up</p>
                <div class="mx-auto" style="width: 80%">
                    <form ref="regForm" @submit.prevent="this.handleRegister">
                        <input v-model="this.regFirstName" required type="text" class="form-control mt-2" placeholder="First name" aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <input v-model="this.regLastName" required type="text" class="form-control mt-2" placeholder="Last name" aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <input v-model="this.regUserName" required type="text" class="form-control mt-2" placeholder="Username" aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <input v-model="this.regUserEmail" required type="email" class="form-control mt-2" placeholder="Email" aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <input v-model="this.regUserPassword" required type="password" class="form-control mt-2" placeholder="Password" aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <button type="submit" class="btn btn-md btn-warning btn-block mt-2">Sign up</button>
                        <div class="d-flex justify-content-between align-items-center mt-2">
                            <p class="m-0">Already have an account?  </p>
                            <button @click="this.clickRegister=false" type="button" class="btn btn-link btn-sm p-0">Sign in!</button>
                        </div>
                    </form>
                </div>
        </div>
    </div>
    <!--
    <GeneralUser :type=selectedUserType @logout="handleLogoutChild" v-if="this.generalLanding && isLogin"/>
    -->
    <!--
    <AdminUser :type=selectedUserType @logout="handleLogoutChild" v-if="this.adminLanding && isLogin"/>
    -->
    `
}