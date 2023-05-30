import adminRecord from "./adminRecord.js";
import ExpertRecordForm from "./ExpertRecordForm.js";
import Record from "./Record.js";
import EditExpertRecord from "./EditExpertRecord.js";
import AdminEditRecord from "./AdminEditRecord.js";
import { store } from "../store/store.js";
export default {
    components: {
        adminRecord,
        ExpertRecordForm,
        Record,
        EditExpertRecord,
        AdminEditRecord
    },
    props: {

    },
    data() {
        return {
            isLoading: false,
            selectedUser: 1,
            generalList: [

            ],
            expertList: [],
            filterList: [],
            tempList: [],
            searchWord: '',
            showRecord: false,
            showAddRecord: false,
            allpost: null,
            commonPost: null,
            allExpertPost: null,
            expertPost: null,
            selectedRecord: null,
            isExpert: false,
            clickEdit: false,
            store
        }
    },
    methods: {
        handleSearch() {
            this.filterList = this.birdList.filter(word => word.userName.toLowerCase().includes(this.searchWord.toLowerCase()))
        },
        handleChange() {
            console.log('jsjsj');
            //this.tempList = this.birdList.filter(word => word.userName.toLowerCase().includes(this.searchWord.toLowerCase()))
            if (this.selectedUser == 0) {
                //this.filterList = this.tempList
            } else if (this.selectedUser == 1) {
                //this.filterList = this.tempList.filter(word => !word.isExpert)
                this.isExpert = false
                this.filterList = this.commonPost
            } else if (this.selectedUser == 2) {
                //this.filterList = this.tempList.filter(word => word.isExpert)
                this.isExpert = true
                this.filterList = this.expertPost
                console.log('debug: ', this.filterList);
            }
        },
        handleSave() {
            this.showRecord = false;
        },
        handleSaveExpert() {
            this.getExpertPost()
            this.clickEdit = false;
        },
        handleSaveGeneral() {
            this.getPost()
            this.clickEdit = false;
        },
        handleSubmit() {
            this.getExpertPost();
            this.showAddRecord = false;
        },
        handleEdit(key) {
            if (this.selectedUser == 1) {
                this.isExpert = false;
                this.selectedRecord = this.filterList[key]
                this.clickEdit = true
            } else {
                this.isExpert = true;
                this.selectedRecord = this.filterList[key]
                this.clickEdit = true
            }
        },
        async handleDelete(key) {
            console.log(key);
            if (confirm('Delete record?', key)) {
                if (!this.isExpert) {
                    try {
                        const res = await axios.delete(`http://localhost:5003/api/eBird/general/post/${this.filterList[key].post_id}`, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                    } catch (e) { }
                    this.getPost()
                    this.selectedUser = 1
                    this.handleChange()
                } else {
                    try {
                        const res = await axios.delete(`http://localhost:5003/api/eBird/expert/post/${this.filterList[key].post_id}`, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                    } catch (e) { }
                    this.getExpertPost()
                    this.selectedUser = 2
                    this.handleChange()
                }
            }
        },
        async getPost() {
            this.isLoading = true;
            const res = await fetch('http://localhost:5003/api/eBird/general_user/post');
            const res_data = await res.json();
            //this.allPost = res_data;
            this.commonPost = res_data;

            for (let i = 0; i < this.commonPost.length; i++) {
                let postFile = await fetch(`http://localhost:5003/api/eBird/general_user/post_file/${this.commonPost[i].post_id}`);
                let postFile_data = await postFile.json();
                console.log('postFile: ', postFile_data);
                this.commonPost[i] = { ...this.commonPost[i], coverImage: postFile_data[0].file_id, media: postFile_data }
            }

            console.log('Hi99: ', this.commonPost);
            if (this.selectedUser == 1) {
                this.filterList = this.commonPost;
            }
            this.isLoading = false;

        },
        async getExpertPost() {
            this.isLoading = true;
            const res = await fetch('http://localhost:5003/api/eBird/expert_user/post');
            const res_data = await res.json();

            //this.allExpertPost = res_data;

            this.expertPost = res_data;

            console.log('Hi111: ', this.expertPost);

            for (let i = 0; i < this.expertPost.length; i++) {
                let postFile = await fetch(`http://localhost:5003/api/eBird/expert_user/post_file/${this.expertPost[i].post_id}`);
                let postFile_data = await postFile.json();
                //console.log('postFile: ',postFile_data);
                this.expertPost[i] = { ...this.expertPost[i], coverImage: postFile_data[0].file_id, media: postFile_data }

                let getBirds = await fetch(`http://localhost:5003/api/eBird/expert_user/post_bird/${this.expertPost[i].post_id}`);
                let postBird_data = await getBirds.json();
                this.expertPost[i] = { ...this.expertPost[i], birds: postBird_data }
            }

            console.log('Hi: ', this.expertPost);
            //this.filterList = this.expertPost;
            if (this.selectedUser == 2) {
                this.filterList = this.expertPost;
            }

            //let postFile = await fetch(`http://localhost:5003/api/eBird/general_user/post_file/${this.commonPost[0].post_id}`);
            //let postFile_data = await postFile.json();
            //console.log(postFile_data[0].file_id);

            //console.log(this.commonPost);
            //this.expertPost = this.allPost.filter(a => a.post_id >= 5)
            //console.log(this.expertPost);
            this.isLoading = false;
        },
        handleShowRecord(key) {
            if (this.selectedUser == 1) {
                this.isExpert = false;
                this.selectedRecord = this.filterList[key]
                this.showRecord = true
            } else {
                this.isExpert = true;
                this.selectedRecord = this.filterList[key]
                this.showRecord = true
            }
        },
        handleBack() {
            this.clickEdit = false;
        },
    },
    mounted() {
        this.getPost()
        this.getExpertPost()

        console.log(this.filterList);
    },

    watch: {

    },

    template: `
    <div v-if="this.isLoading" class="row align-items-center justify-content-center">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    <div v-if="showRecord">
        <i @click="this.showRecord=false" class="bi bi-arrow-left" style="font-size: 1.5rem;"></i>
        <Record :isExpert=this.isExpert :record=this.selectedRecord />
    </div>
    <div v-if="clickEdit && !isExpert">
        <i @click="this.clickEdit=false" class="bi bi-arrow-left" style="font-size: 1.5rem;"></i>
        <AdminEditRecord @submitted="handleSaveGeneral" :record=this.selectedRecord />
    </div>
    <div v-if="clickEdit && isExpert">
        <i @click="this.clickEdit=false" class="bi bi-arrow-left" style="font-size: 1.5rem;"></i>
        <EditExpertRecord @submitted="handleSaveExpert" :record=this.selectedRecord />
    </div>
    <div v-if="showAddRecord">
        <i @click="this.showAddRecord=false" class="bi bi-arrow-left" style="font-size: 1.5rem;"></i>
        <ExpertRecordForm @submitted=handleSubmit />
    </div>
    <div v-if="!showRecord && !showAddRecord && !clickEdit">
        <p class="h4 text-center">Survey Records List</p>
        <div class="input-group mb-3">
            <input v-model="this.searchWord" type="text" class="form-control" placeholder="Search by user..">
       
                <button @click="handleSearch" class="btn btn-outline-secondary" type="button"><i class="bi bi-search-heart"></i></button>
         
            </div>
        <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Create by</label>
                </div>
                <select @change="handleChange" v-model="this.selectedUser" class="form-control" id="inputGroupSelect01">
                    <option value="1">General user</option>
                    <option value="2">Expert user</option>
                </select>
        </div>
        <div class="container" style="width: 100%">
        <table class="table table-sm">
            <thead>
                <tr>
                    <th scope="col"><p>id</p></th>
                    <th scope="col"><p>species</p></th>
                    <th scope="col"><p>@user</p></th>
                    <th scope="col"><p>create at</p></th>
                    <th scope="col"><p>status</p></th>
                    <th scope="col"><p>action</p></th>
                </tr>
            </thead>
            <tbody v-if="this.selectedUser == 2">
                <tr v-for="(value,key) in this.filterList">
                    <th class="align-middle" scope="row"><a><p>{{key + 1}}</p></a></th>
                    <td @click="handleShowRecord(key)" class="align-middle" style="color: blue"><p>{{value.birds[0].common_name}}</p></td>
                    <td class="align-middle"><p>{{value.user_name}}</p></td>
                    <td class="align-middle"><p>{{value.createAt}}</p></td>
                    <td class="align-middle"><p>{{value.published == 0? 'published' : 'private'}}</p></td>
                    <td class="align-middle">
                        <i @click="handleEdit(key)" class="bi bi-pencil-square me-4" style="font-size: 1.5rem;"></i>
                        <i @click="handleDelete(key)" class="bi bi-trash3" style="font-size: 1.5rem;"></i>
                    </td>
                </tr>
            </tbody>
            <tbody v-if="this.selectedUser == 1">
                <tr v-for="(value,key) in this.filterList">
                    <th class="align-middle" scope="row"><a><p>{{key + 1}}</p></a></th>
                    <td @click="handleShowRecord(key)" class="align-middle" style="color: blue"><p>{{value.common_name}}</p></td>
                    <td class="align-middle"><p>{{value.user_name}}</p></td>
                    <td class="align-middle"><p>{{value.createAt}}</p></td>
                    <td class="align-middle"><p>{{value.status == 0? 'approve' : 'decline'}}</p></td>
                
                <td class="align-middle">
                    <i @click="handleEdit(key)" class="bi bi-pencil-square me-4 p-0" style="font-size: 1.5rem;"></i>
                    <i @click="handleDelete(key)" class="bi bi-trash3 p-0" style="font-size: 1.5rem;"></i>
                </td>
                </tr>
            </tbody>
        </table>
        <button @click="this.showAddRecord=true" type="button" class="btn btn-secondary btn-lg btn-block">Add survey record</button>
        </div>
    </div>
    `
}