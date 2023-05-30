
export default {
    components: {

    },
    props: {

    },
    data() {
        return {
            isLoading: false,
            edit: false,
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
        handleDelete() {
            if (confirm('Delete record?')) {
                this.$emit('save', true)
            }
        },
        handleSave() {

            this.$emit('save', true)

        }
    },
    mounted() {

    },

    watch: {
    },

    template: `
    <div class="card border-secondary">
        <img style="width: 100%" src="../images/0.jpg" />
        <div class="card-header">
            <p class="h4">中華鷓鴣</p>
            <p class="p-0 m-0">Chinese Francolin</p>
            <p class="p-0 m-0">Francolinus pintadeanus</p>
        </div>
        <div class="card-body text-secondary">
            <p class="p-0 m-0">Record time: </p><p v-if="!edit" style="color: grey">2023-01-02 08:20</p>
            <input v-if="edit" class="form-control" type="text" value="2023-01-02 08:20"></input>
            <p class="p-0 m-0">Location: </p><p v-if="!edit" style="color: grey">Tai Po</p>
            <input v-if="edit" class="form-control" type="text" value="Tai Po"></input>
            <p class="p-0 m-0">Description: </p><p v-if="!edit" style="color: grey">eating</p>
            <input v-if="edit" class="form-control" type="text" value="eating"></input>
            <p class="p-0 m-0">Create by: </p><p style="color: grey">user@Jack </p>
           
            <a  @click="handleSave" class="btn btn-lg"><i class="bi bi-check-square"></i>Approve</a>
            <a  @click="handleSave" class="btn btn-lg"><i class="bi bi-x-square"></i>Decline</a>
         
        </div>
    </div>
    `
}