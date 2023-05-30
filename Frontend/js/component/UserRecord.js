import adminRecord from "./adminRecord.js";
import UserAccRecord from "./UserAccRecord.js";
import ExpertRecordForm from "./ExpertRecordForm.js";
import AddUserForm from "./AddUserForm.js";
export default {
    components: {
        adminRecord,
        ExpertRecordForm,
        UserAccRecord,
        AddUserForm
    },
    props: {

    },
    data() {
        return {
            isLoading: false,
            selectedUser: 0,
            userList: [
            ],
            filterList: [],
            tempList: [],
            searchWord: '',
            showRecord: false,
            showAddRecord: false,
            selectedRecord: null
        }
    },
    methods: {
        handleSearch() {
            this.filterList = this.userList.filter(word => word.user_name.toLowerCase().includes(this.searchWord.toLowerCase()))
        },
        handleChange() {
            if (this.selectedUser == 4) {
                this.filterList = this.userList
            } else {
                this.filterList = this.userList.filter(u => u.user_type == this.selectedUser)
            }
            /*
            console.log('jsjsj');
            this.tempList = this.birdList.filter(word => word.userName.toLowerCase().includes(this.searchWord.toLowerCase()))
            if(this.selectedUser == 0){
            this.filterList = this.tempList
            } else if (this.selectedUser == 1) {
                this.filterList = this.tempList.filter(word => !word.isExpert)
            } else if (this.selectedUser == 2){
                this.filterList = this.tempList.filter(word => word.isExpert)
            }*/
        },
        handleSave() {
            this.getUserList()
            this.showRecord = false;
        },
        handleSubmit() {
            this.getUserList()
            this.showAddRecord = false;
        },
        async getUserList() {
            const res = await fetch('http://localhost:5003/api/eBird/user');
            const res_data = await res.json();
            console.log(res_data);
            this.userList = res_data

            this.filterList = this.userList
        },
        handleShowRecord(key) {
            this.selectedRecord = this.filterList[key]
            this.showRecord = true
        }
    },
    mounted() {
        this.getUserList()
    },

    watch: {

    },

    template: `
    <div v-if="this.isLoading" class="row align-items-center justify-content-center">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    <div v-if="showRecord">
        <i @click="this.showRecord=false" class="bi bi-arrow-left" style="font-size: 1.5rem;"></i>
        <UserAccRecord :record=this.selectedRecord @save=handleSave />
    </div>
    <div style="margin-bottom: 80px;" v-if="showAddRecord">
        <i @click="this.showAddRecord=false" class="bi bi-arrow-left" style="font-size: 1.5rem;"></i>
        <AddUserForm @submitted=handleSubmit />
    </div>
    <div v-if="!showRecord && !showAddRecord">
        <p class="h4 text-center">User List</p>
        <div class="input-group mb-3">
            <input @click="handleSearch" v-model="this.searchWord" type="text" class="form-control" placeholder="Search by username..">
                <button @click="handleSearch" class="btn btn-outline-secondary" type="button"><i class="bi bi-search-heart"></i></button>
            </div>
        <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Type</label>
                </div>
                <select @change="handleChange" v-model="this.selectedUser" class="form-control" id="inputGroupSelect01">
                    <option value="4">All user</option>
                    <option value="0">General user</option>
                    <option value="1">Expert user</option>
                    <option value="2">Modulator</option>
                    <option value="3">Admin</option>
                </select>
        </div>
        <div class="container" style="width: 100%">
        <table class="table table-sm">
            <thead>
                <tr>
                <th scope="col"><p>id</p></th>
                <th scope="col"><p>@username</p></th>
                <th scope="col"><p>First name</p></th>
                <th scope="col"><p>Last name</p></th>
                <th scope="col"><p>Type</p></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value,key) in this.filterList">
                <th scope="row"><a><p>{{key + 1}}</p></a></th>
                <td @click="handleShowRecord(key)" style="color: blue"><p>{{value.user_name}}</p></td>
                <td><p>{{value.first_name}}</p></td>
                <td><p>{{value.last_name}}</p></td>
                <td><p>{{value.user_type == 0? 'General' : value.user_type == 1? 'Expert' : value.user_type == 2? 'Modulator' : 'Admin'}}</p></td>
                </tr>
            </tbody>
        </table>
        <button @click="this.showAddRecord=true" type="button" class="btn btn-secondary btn-lg btn-block">Add user account</button>
        </div>
    </div>
    `
}