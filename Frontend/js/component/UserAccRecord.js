
export default {
    components: {

    },
    props: {
        record: null
    },
    data() {
        return {
            isLoading: false,
            edit: false,
            firstName: null,
            lastName: null,
            email: null
        }
    },
    methods: {
        handleLogin() {

        },
        handleLogoutChild(data) {

        },
        handleSearch() {
            this.filterList = this.birdList.filter(word => word.birdEnName.toLowerCase().includes(this.searchWord.toLowerCase()))
        },
        async handleDelete() {
            if (confirm('Delete record?')) {
                //const formData = new FormData();

                //formData.append('user_id', this.record.user_id)
                console.log(this.record.user_id)
                const res = await axios.delete(`http://localhost:5003/api/eBird/ebird/user/${this.record.user_id}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                console.log(res);
                if (res.status == 200) {
                    this.$emit('save', true)
                }

            }
        },
        async handleSave() {
            const formData = new FormData();

            formData.append('user_id', this.record.user_id)
            formData.append('first_name', this.firstName)
            formData.append('last_name', this.lastName)
            formData.append('user_email', this.email)

            const res = await axios.put('http://localhost:5003/api/eBird/ebird/user', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(res);
            if (res.status == 200) {
                this.$emit('save', true)
            }
        }
    },
    mounted() {
        this.firstName = this.record.first_name
        this.lastName = this.record.last_name
        this.email = this.record.user_email
    },

    watch: {
    },

    template: `
    <div class="card border-secondary">
        <div class="d-flex justify-content-center p-0 m-0">
        <i class="bi bi-person-square p-0 m-0" style="font-size: 8rem;"></i>
    </div>
        <div class="card-header">
            <p class="h4">@{{this.record.user_name}}</p>
        </div>
        <div class="card-body text-secondary">
            <p class="p-0 m-0">First name</p><p v-if="!edit" style="color: grey">{{this.record.first_name}}</p>
            <input v-model="this.firstName" v-if="edit" class="form-control mt-2" type="text"></input>
            <p class="p-0 m-0">Last name</p><p v-if="!edit" style="color: grey">{{this.record.last_name}}</p>
            <input v-model="this.lastName" v-if="edit" class="form-control mt-2" type="text"></input>
            <p class="p-0 m-0">Email</p><p v-if="!edit" style="color: grey">{{this.record.user_email}}</p>
            <input v-model="this.email" v-if="edit" class="form-control mt-2" type="text"></input>
    
            <a v-if="!edit" @click="this.edit=true" class="btn btn-lg"><i class="bi bi-pencil-square"></i>Edit</a>
            <a v-if="!edit" @click="handleDelete" class="btn btn-lg"><i class="bi bi-trash3">Delete</i></a>
            <a v-if="edit" @click="handleSave" class="btn btn-lg"><i class="bi bi-check2-square"></i>Save</a>
            <a v-if="edit" @click="this.edit=false" class="btn btn-lg"><i class="bi bi-x-square"></i>cancel</a>
        </div>
    </div>
    `
}