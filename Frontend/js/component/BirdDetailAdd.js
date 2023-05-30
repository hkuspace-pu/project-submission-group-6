//import Record from "./Record.js";
export default {
    components: {
        "Record": Vue.defineAsyncComponent(() => import('./Record.js'))
    },
    props: {
        bird: {}
    },
    data() {
        return {
            isLoading: false,
            allPost: null,
            relatedPost: null,
            showPost: false,
            record: null,
            isExpert: null,
            edit: false,
            commonName: '',
            chineseName: '',
            scientificName: '',
            birdOrder: '',
            birdFamily: '',
            allFiles: null
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
        async getPost() {
            this.isLoading = true;
            const res = await fetch('http://localhost:5003/api/eBird/general_user/post');
            const res_data = await res.json();
            this.allPost = res_data;
            console.log('all post', this.allPost);
            this.relatedPost = this.allPost.filter(a => a.bird_id == this.bird.bird_id)
            console.log('all filter', this.relatedPost);
            for (let i = 0; i < this.relatedPost.length; i++) {
                let postFile = await fetch(`http://localhost:5003/api/eBird/general_user/post_file/${this.relatedPost[i].post_id}`);
                let postFile_data = await postFile.json();
                console.log('postFile: ', postFile_data);
                this.relatedPost[i] = { ...this.relatedPost[i], coverImage: postFile_data[0], media: postFile_data }
            }

            console.log('Hi: ', this.relatedPost);

            //let postFile = await fetch(`http://localhost:5003/api/eBird/general_user/post_file/${this.commonPost[0].post_id}`);
            //let postFile_data = await postFile.json();
            //console.log(postFile_data[0].file_id);



            //console.log(this.commonPost);
            //this.expertPost = this.allPost.filter(a => a.post_id >= 5)
            //console.log(this.expertPost);
            this.isLoading = false;
        },
        handleShowRecord(key) {
            console.log(this.relatedPost[key]);
            this.record = this.relatedPost[key];
            this.showPost = true;
        },
        handleDelete() {

        },
        previewFiles(event) {
            console.log(event.target.files);
            this.allFiles = event.target.files;
        },
        async handleSave() {

            const formData = new FormData();

            formData.append('common_name',this.commonName)
            formData.append('chinese_name',this.chineseName)
            formData.append('scientific_Name',this.scientificName)
            formData.append('bird_order',this.birdOrder)
            formData.append('family',this.birdFamily)

            for (let i = 0; i < this.allFiles.length; i++) {
                formData.append('file', this.allFiles[i])
            }
            //formData.append('file',this.allFiles)

            try {
                const res = await axios.post('http://localhost:5003/api/eBird/birds', formData ,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                if (res.data) {
                    alert("Bird added!")
                    //this.clickRegister = false;
                    //this.$refs.regForm.reset(); 
                    this.isLoading = false;
                }
                this.$emit('submitted', true)

            } catch (e) {
                console.log(e);
                alert('Error')
                this.isLoading = false;
            }
        }
    },
    mounted() {
        console.log('Hello!!', this.bird);
        //this.getPost();
        /*
        this.commonName = this.bird.common_name
        this.chineseName = this.bird.chinese_name
        this.scientificName = this.bird.scientific_Name
        this.birdOrder = this.bird.bird_order
        this.birdFamily = this.bird.family
        */
    },

    watch: {
    },

    template: `
    <div v-if="this.isLoading" style="height: 100vh;" class="row align-items-center justify-content-center">
        <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only"></span>
        </div>
    </div>
    <div v-if="!this.showPost">
        <div v-if="!this.isLoading" style="border-radius: 15px;" class="card border-secondary">
        <div class="card-header">
            <p class="text-center h4 mt-5 mb-3">Create new bird species</p>
        </div>
            <div class="card-body text-secondary">
            <p class="mt-2">Import bird image: </p> 
                            <div lass="input-group mt-3">
                                <input @change="previewFiles" multiple type="file" class="form-control" id="inputGroupFile02">
                            </div>
                <p class="p-0 m-0 mt-2">Common name: </p>
                <input v-model="this.commonName" class="form-control mt-2" type="text" />
                <p class="p-0 m-0">Chinese name: </p>
                <input v-model="this.chineseName" class="form-control mt-2" type="text" />
                <p class="p-0 m-0">Scientific name: </p>
                <input v-model="this.scientificName" class="form-control mt-2" type="text" />
                <p class="p-0 m-0">Order: </p>
                <input v-model="this.birdOrder" class="form-control mt-2" type="text" />
                <p class="p-0 m-0">Famliy: </p>
                <input v-model="this.birdFamily" class="form-control mt-2" type="text" />
                <button @click="handleSave" type="button" class="btn btn-md btn-warning btn-block mt-2">Submit</button>
            </div>
        </div>
    </div>
    
    `
}