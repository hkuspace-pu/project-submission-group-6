import Record from "./Record.js"
import RecordForm from "./RecordForm.js"
import EditRecord from "./EditRecord.js"
import EditExpertRecord from "./EditExpertRecord.js"
import { store } from "../store/store.js"
export default {
    components: {
        Record,
        RecordForm,
        EditRecord,
        EditExpertRecord
    },
    props: {
        type: 0,
    },
    data() {
        return {
            store,
            isLoading: false,
            selectedSpecies: 0,
            searchWord: '',
            clickRecord: false,
            clickEdit: false,
            birdList: [],
            selectedRecord: null,
            filterList: [],
            isExpert: false,
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
                    console.log('Posted!', res);
                    if (true) {
                        alert("Deleted!")

                        let userPost = []
                        const res = await fetch(`http://localhost:5003/api/eBird/general_user/${store.user.user_id}/post`);
                        let res_data = await res.json();
                        console.log('res_data', res_data);
                        userPost = res_data;

                        for (let i = 0; i < userPost.length; i++) {
                            let postFile = await fetch(`http://localhost:5003/api/eBird/general_user/post_file/${userPost[i].post_id}`);
                            let postFile_data = await postFile.json();
                            console.log('postFile: ', postFile_data);
                            userPost[i] = { ...userPost[i], coverImage: postFile_data[0].file_id, media: postFile_data }
                        }
                        //console.log('userDetail: ', this.userDetail, 'post:', res);

                        store.userPost = userPost

                        this.birdList = store.userPost
                        this.filterList = this.birdList
                        this.selectedRecord = this.filterList[0]
                    }

                } else {
                    try {
                        const res = await axios.delete(`http://localhost:5003/api/eBird/expert/post/${this.filterList[key].post_id}`, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                    } catch (e) { }
                    if (true) {
                        alert("Deleted!")

                        let userPost = []
                        const res = await fetch(`http://localhost:5003/api/eBird/expert_user/${store.user.user_id}/post`);
                        let res_data = await res.json();
                        console.log('res_data', res_data);
                        userPost = res_data;

                        for (let i = 0; i < userPost.length; i++) {
                            let postFile = await fetch(`http://localhost:5003/api/eBird/expert_user/post_file/${userPost[i].post_id}`);
                            let postFile_data = await postFile.json();
                            //console.log('postFile: ',postFile_data);
                            userPost[i] = { ...userPost[i], coverImage: postFile_data[0].file_id, media: postFile_data }

                            let getBirds = await fetch(`http://localhost:5003/api/eBird/expert_user/post_bird/${userPost[i].post_id}`);
                            let postBird_data = await getBirds.json();
                            userPost[i] = { ...userPost[i], birds: postBird_data }
                        }
                        //console.log('userDetail: ', this.userDetail, 'post:', res);

                        store.userPost = userPost

                        this.birdList = store.userPost
                        this.filterList = this.birdList
                        this.selectedRecord = this.filterList[0]
                    }

                }
            }
        },
        handleEdit(key) {
            this.selectedRecord = this.filterList[key]
            this.clickEdit = true;
            this.clickRecord = false;
        },
        handleBack(data) {
            this.clickRecord = data;
            this.clickEdit = data;
        },
        handelShowRecord(key) {
            this.clickRecord = true;
            this.selectedRecord = this.filterList[key]
        },
        async handleSaveGeneral(data) {

            console.log('dkdijij');

            let userPost = []
            const res = await fetch(`http://localhost:5003/api/eBird/general_user/${store.user.user_id}/post`);
            let res_data = await res.json();
            console.log('res_data', res_data);
            userPost = res_data;

            for (let i = 0; i < userPost.length; i++) {
                let postFile = await fetch(`http://localhost:5003/api/eBird/general_user/post_file/${userPost[i].post_id}`);
                let postFile_data = await postFile.json();
                console.log('postFile: ', postFile_data);
                userPost[i] = { ...userPost[i], coverImage: postFile_data[0].file_id, media: postFile_data }
            }
            //console.log('userDetail: ', this.userDetail, 'post:', res);

            store.userPost = userPost

            this.birdList = store.userPost
            this.filterList = this.birdList
            this.selectedRecord = this.filterList[0]

            this.clickEdit = false;
        },
        async handleSaveExpert(data) {

            console.log('dkdijij');

            let userPost = []
            const res = await fetch(`http://localhost:5003/api/eBird/expert_user/${store.user.user_id}/post`);
            let res_data = await res.json();
            console.log('res_data', res_data);
            userPost = res_data;

            for (let i = 0; i < userPost.length; i++) {
                let postFile = await fetch(`http://localhost:5003/api/eBird/expert_user/post_file/${userPost[i].post_id}`);
                let postFile_data = await postFile.json();
                //console.log('postFile: ',postFile_data);
                userPost[i] = { ...userPost[i], coverImage: postFile_data[0].file_id, media: postFile_data }

                let getBirds = await fetch(`http://localhost:5003/api/eBird/expert_user/post_bird/${userPost[i].post_id}`);
                let postBird_data = await getBirds.json();
                userPost[i] = { ...userPost[i], birds: postBird_data }
            }
            //console.log('userDetail: ', this.userDetail, 'post:', res);

            store.userPost = userPost

            this.birdList = store.userPost
            this.filterList = this.birdList
            this.selectedRecord = this.filterList[0]

            this.clickEdit = false;
        }
    },
    mounted() {
        this.birdList = store.userPost
        this.filterList = this.birdList
        this.selectedRecord = this.filterList[0]
        this.isExpert = store.user.user_type == 1

        console.log('998: ', this.filterList);
    },

    watch: {
        searchWord(nee, ddd) {
            console.log(nee);
        },
        clickRecord(ddd, dd) {
            console.log(ddd);
        }
    },

    template: `
    <div v-if="!clickRecord && !clickEdit" class="container p-0 m-0 mb-5">
        <div class="col">
            <div class="d-flex justify-content-center p-0 m-0">
                <i class="bi bi-person-square p-0 m-0" style="font-size: 8rem;"></i>
            </div>
            <p class="text-center" style="color: lightgrey">{{this.store.user.user_email}}</p>
            <p>My records:</p>
            <div class="input-group mb-3">
            <input v-model="this.searchWord" type="text" class="form-control" placeholder="Search..">
       
                <button @click="handleSearch" class="btn btn-outline-secondary" type="button"><i class="bi bi-search-heart"></i></button>
         
            </div>
            <div class="d-flex align-items-center mb-3" v-for="(value, key) in this.filterList">
                <img v-if="!isExpert" @click="handelShowRecord(key)" style="height: 80px; width: 100px; border-radius: 15px" v-bind:src="'http://localhost:5003/api/eBird/media/' + value.coverImage" />
                <img v-if="isExpert"  @click="handelShowRecord(key)" style="height: 80px; width: 100px; border-radius: 15px" v-bind:src="'http://localhost:5003/api/eBird/expert/media/' + value.coverImage" />
                <div class="col ps-2">
                    <p v-if="!isExpert" style="font-size: 12px" class="pt-2 m-0">{{value.chinese_name}}</p>
                    <p v-if="!isExpert" style="font-size: 12px" class="p-0 m-0">{{value.common_name}}</p>
                    <p v-if="isExpert" style="font-size: 12px" class="pt-2 m-0">{{value.birds[0].chinese_name}}</p>
                    <p v-if="isExpert" style="font-size: 12px" class="p-0 m-0">{{value.birds[0].common_name}}</p>
                    <p style="font-size: 12px; color: lightgrey" class="p-0 m-0">Created {{value.createAt}}</p>
                </div>
                <p v-if="!isExpert" style="font-size: 12px" class="p-0 m-0 me-3">{{value.status == 0? 'Approve' : 'Decline'}}</p>
                <p v-if="isExpert" style="font-size: 12px" class="p-0 m-0 me-3">{{value.published == 0? 'Publish' : 'Private'}}</p>
                <i @click="handleEdit(key)" class="bi bi-pencil-square me-4" style="font-size: 1.5rem;"></i>
                <i @click="handleDelete(key)" class="bi bi-trash3" style="font-size: 1.5rem;"></i>
            </div>
        </div>
    </div>
    <i v-if="clickRecord || clickEdit" @click="this.clickRecord=false; this.clickEdit=false;" class="bi bi-arrow-left" style="font-size: 1.5rem;"></i>
    <Record :isExpert=this.isExpert :record=this.selectedRecord v-if="clickRecord" />
    <EditRecord @submitted="handleSaveGeneral" :record=this.selectedRecord @back="handleBack" v-if="clickEdit && !isExpert" />
    <EditExpertRecord @submitted="handleSaveExpert" :record=this.selectedRecord @back="handleBack" v-if="clickEdit && isExpert" />
    `
}