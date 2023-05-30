import adminRecord from "./adminRecord.js";
import ExpertRecordForm from "./ExpertRecordForm.js";
import ModulatorRecord from "./ModulatorRecord.js";
export default {
    components: {
        adminRecord,
        ExpertRecordForm,
        ModulatorRecord
    },
    props: {

    },
    data() {
        return {
            isLoading: false,
            selectedUser: 3,
            birdList: [
                {
                    userName: 'Jack',
                    birdChName: '中華鷓鴣',
                    birdEnName: 'Chinese Francolin',
                    birdOffName: 'Francolinus pintadeanus',
                    url: '../images/0.jpg',
                    isExpert: true,
                    status: 0,
                    hours: '2022-05-07'
                },
                {
                    userName: 'Ben',
                    birdChName: '鵪鶉',
                    birdEnName: 'Japanese Quail',
                    birdOffName: 'Coturnix japonica',
                    url: '../images/1.jpg',
                    isExpert: false,
                    status: 1,
                    hours: '2022-06-07'
                },
                {
                    userName: 'Jay',
                    birdChName: '栗樹鴨',
                    birdEnName: 'Lesser Whistling Duck',
                    birdOffName: 'Dendrocygna javanica',
                    url: '../images/2.jpg',
                    isExpert: false,
                    status: 2,
                    hours: '2022-12-08'
                },
                {
                    userName: 'Saul',
                    birdChName: '灰雁',
                    birdEnName: 'Greylag Goose',
                    birdOffName: 'Anser anser',
                    url: '../images/3.jpg',
                    isExpert: true,
                    status: 0,
                    hours: '2022-11-07'
                },
                {
                    userName: 'Jason',
                    birdChName: '灰雁',
                    birdEnName: 'Philippine Duck',
                    birdOffName: 'Anser anser',
                    url: '../images/3.jpg',
                    isExpert: true,
                    status: 1,
                    hours: '2022-2-07'
                },
                {
                    userName: 'John',
                    birdChName: '灰雁',
                    birdEnName: 'Baer\'s Pochard',
                    birdOffName: 'Anser anser',
                    url: '../images/3.jpg',
                    isExpert: true,
                    status: 2,
                    hours: '2022-6-25'
                },
            ],
            filterList: [],
            tempList: [],
            searchWord: '',
            showRecord: false,
            showAddRecord: false,
        }
    },
    methods: {
        handleSearch() {
            this.filterList = this.birdList.filter(word => word.userName.toLowerCase().includes(this.searchWord.toLowerCase()))
        },
        handleChange() {
            console.log('jsjsj');
            if (this.selectedUser == 3) {
                this.tempList = this.birdList
            } else {
                this.tempList = this.birdList.filter(word => word.status == this.selectedUser)
            }
            this.filterList = this.tempList
        },
        handleSave() {
            this.showRecord = false;
        },
        handleSubmit() {
            this.showAddRecord = false;
        }
    },
    mounted() {
        this.filterList = this.birdList
    },

    watch: {

    },

    template: `
    <div v-if="this.isLoading" class="row align-items-center justify-content-center">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    <div v-if="showRecord">
        <i @click="this.showRecord=false" class="bi bi-arrow-left" style="font-size: 1.5rem;"></i>
        <ModulatorRecord @save=handleSave />
    </div>
    <div v-if="showAddRecord">
        <i @click="this.showAddRecord=false" class="bi bi-arrow-left" style="font-size: 1.5rem;"></i>
        <ExpertRecordForm @submit=handleSubmit />
    </div>
    <div v-if="!showRecord && !showAddRecord">
        <p class="h4 text-center">Survey Records List</p>
        <div class="input-group mb-3">
            <input v-model="this.searchWord" type="text" class="form-control" placeholder="Search by user name.." aria-label="Recipient's username" aria-describedby="basic-addon2">
            <div class="input-group-append">
                <button @click="handleSearch" class="btn btn-outline-secondary" type="button"><i class="bi bi-search-heart"></i></button>
            </div>
        </div>
        <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Record status</label>
                </div>
                <select @change="handleChange" v-model="this.selectedUser" class="form-control" id="inputGroupSelect01">
                    <option value="0">approve</option>
                    <option value="1">decline</option>
                    <option value="2">pending</option>
                    <option value="3">All</option>
                </select>
        </div>
        <div class="container" style="width: 100%">
        <table class="table table-sm">
            <thead>
                <tr>
                <th scope="col"><p>id</p></th>
                <th scope="col"><p>species</p></th>
                <th scope="col"><p>@user</p></th>
                <th scope="col"><p>status</p></th>
                <th scope="col"><p>create at</p></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value,key) in this.filterList">
                <th scope="row"><a @click="this.showRecord=true"><p>{{key + 1}}</p></a></th>
                <td><p>{{value.birdEnName}}</p></td>
                <td><p>{{value.userName}}</p></td>
                <td><p>{{value.status == 0 ? 'approve' : value.status == 1 ?  'decline' : 'pending'}}</p></td>
                <td><p>{{value.hours}}</p></td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
    `
}