import adminRecord from "./adminRecord.js";
import UserAccRecord from "./UserAccRecord.js";
import ExpertRecordForm from "./ExpertRecordForm.js";
import AddUserForm from "./AddUserForm.js";
import BirdDetailEdit from "./BirdDetailEdit.js";
import BirdDetailAdd from "./BirdDetailAdd.js";
export default {
    components: {
        adminRecord,
        ExpertRecordForm,
        UserAccRecord,
        AddUserForm,
        BirdDetailEdit,
        BirdDetailAdd
    },
    props: {

    },
    data() {
        return {
            isLoading: false,
            selectedUser: 0,
            birdList: [
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
            this.filterList = this.birdList.filter(word => word.common_name.toLowerCase().includes(this.searchWord.toLowerCase()))
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
            this.getBirdList()
            this.showAddRecord = false;
            this.showRecord = false;
        },
        async getBirdList() {
            const res = await fetch('http://localhost:5003/api/eBird/birds');
            const res_data = await res.json();
            console.log(res_data);
            this.birdList = res_data

            this.filterList = this.birdList
        },
        handleShowRecord(key) {
            this.selectedRecord = this.filterList[key]
            this.showRecord = true
        }
    },
    mounted() {
        this.getBirdList()
    },

    watch: {

    },

    template: `
    <div v-if="this.isLoading" class="row align-items-center justify-content-center">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    <div v-if="showRecord">
        <i @click="this.showRecord=false" class="bi bi-arrow-left" style="font-size: 1.5rem;"></i>
        <BirdDetailEdit :bird=this.selectedRecord @submitted=handleSubmit />
    </div>
    <div style="margin-bottom: 80px;" v-if="showAddRecord">
        <i @click="this.showAddRecord=false" class="bi bi-arrow-left" style="font-size: 1.5rem;"></i>
        <BirdDetailAdd @submitted=handleSubmit />
    </div>
    <div v-if="!showRecord && !showAddRecord">
        <p class="h4 text-center">Bird List</p>
        <div class="input-group mb-3">
            <input @click="handleSearch" v-model="this.searchWord" type="text" class="form-control" placeholder="Search by common name..">
                <button @click="handleSearch" class="btn btn-outline-secondary" type="button"><i class="bi bi-search-heart"></i></button>
            </div>
        <div class="container" style="width: 100%">
        <table class="table table-sm">
            <thead>
                <tr>
                <th scope="col"><p>id</p></th>
                <th scope="col"><p>Common name</p></th>
                <th scope="col"><p>Chinese name</p></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value,key) in this.filterList">
                <th scope="row"><a><p>{{key + 1}}</p></a></th>
                <td @click="handleShowRecord(key)" style="color: blue"><p>{{value.common_name}}</p></td>
                <td><p>{{value.chinese_name}}</p></td>
                </tr>
            </tbody>
        </table>
        <button @click="this.showAddRecord=true" type="button" class="btn btn-secondary btn-lg btn-block">Add bird</button>
        </div>
    </div>
    `
}