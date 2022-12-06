<template>
    <v-loading v-if="loading" />
    <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">{{ title }}</span>
            <span class="navbar-brand mb-0 h5">
                Server status: <span v-bind:class="serverStatus">{{ serverStatus }}</span>
            </span>
        </div>
    </nav>
    <div class="container-xxl w-100 mt-5">
        <div class="row">
            <div class="col-3">
                <div class="input-group">
                    <div class="input-group mb-3">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Document ID"
                            aria-label="First name"
                            v-model="docId"
                        />
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Document"
                            aria-label="Last name"
                            v-model="data"
                        />
                        <button
                            class="btn btn-primary"
                            type="button"
                            id="button-addon2"
                            @click.prevent="submitAddData"
                            :disabled="!useMulti && !useSingle"
                        >
                            Add
                        </button>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Search"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        v-model="search"
                    />
                    <button
                        class="btn btn-primary"
                        type="button"
                        id="button-addon2"
                        @click.prevent="submitSearchData"
                        :disabled="!useMulti && !useSingle"
                    >
                        Search
                    </button>
                </div>
                <div class="form-check-reverse form-switch">
                    <input class="form-check-input" type="checkbox" id="useMulti" v-model="useMulti" />
                    <label class="form-check-label" for="useMulti" id="useMultiLabel">Use MultiThread</label>
                </div>
                <div class="form-check-reverse form-switch">
                    <input class="form-check-input" type="checkbox" id="useSingle" v-model="useSingle" />
                    <label class="form-check-label" for="useSingle" id="useSingleLabel">Use SingleThread</label>
                </div>
                <div class="dropdown mt-3">
                    <button
                        class="btn btn-primary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Max Workers: {{ maxWorkers }}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#" @click.prevent="setMaxWorkers(1)">1</a></li>
                        <li><a class="dropdown-item" href="#" @click.prevent="setMaxWorkers(2)">2</a></li>
                        <li><a class="dropdown-item" href="#" @click.prevent="setMaxWorkers(4)">4</a></li>
                        <li><a class="dropdown-item" href="#" @click.prevent="setMaxWorkers(8)">8</a></li>
                        <li><a class="dropdown-item" href="#" @click.prevent="setMaxWorkers(16)">16</a></li>
                        <li><a class="dropdown-item" href="#" @click.prevent="setMaxWorkers(32)">32</a></li>
                    </ul>
                </div>
                <button class="btn btn-primary m-5" type="button" @click.prevent="resetState">Reset Store</button>
                <div class="input-group mb-3">
                    <form>
                        <div class="form-group">
                            <label for="customRange3" class="form-label m-1" style="color: azure"
                                >Test Number {{ testCount }}</label
                            >
                            <input
                                type="range"
                                class="form-range"
                                min="0"
                                max="100"
                                step="5"
                                id="customRange3"
                                v-model="testCount"
                            />
                        </div>
                    </form>
                    <button class="btn btn-primary" type="button" @click.prevent="runTest">RunTest</button>
                    <p v-if="showError" style="color: #ff3631">{{ error }}</p>
                </div>
            </div>
            <div class="col-9" style="height: 500px">
                <v-list></v-list>
            </div>
        </div>
        <div class="row" v-if="firstRun">
            <div>
                <v-chart-search-multi></v-chart-search-multi>
                <h5 style="color: azure">Search multi</h5>
            </div>
            <div>
                <v-chart-search-single></v-chart-search-single>
                <h5 style="color: azure">Search single</h5>
            </div>
            <div>
                <v-chart-add-multi></v-chart-add-multi>
                <h5 style="color: azure">Add multi</h5>
            </div>
            <div>
                <v-chart-add-single></v-chart-add-single>
                <h5 style="color: azure">Add Single</h5>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import vList from '@/views/v-list.vue';
import vChartSearchMulti from '@/views/v-chart-search-multi.vue';
import vChartSearchSingle from '@/views/v-chart-search-single.vue';
import vChartAddMulti from '@/views/v-chart-add-multi.vue';
import vChartAddSingle from '@/views/v-chart-add-single.vue';
import vLoading from '@/views/v-loading.vue';
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';
import { randexp } from 'randexp';

export default defineComponent({
    name: 'v-main-wrapper',
    components: {
        vLoading,
        vList,
        vChartSearchMulti,
        vChartSearchSingle,
        vChartAddMulti,
        vChartAddSingle
    },
    data() {
        return {
            title: 'Inverted Index course work',
            search: '',
            docId: '',
            data: '',
            useMulti: true,
            useSingle: true,
            loading: false,
            maxWorkers: 8,
            testCount: '',
            error: '',
            showError: false,
            firstRun: false
        };
    },
    props: {},
    computed: {
        ...mapState('home', ['serverStatus'])
    },
    methods: {
        ...mapActions('home', [
            'GET_SEARCH_FROM_SINGLE_THREAD',
            'GET_SEARCH_FROM_MULTI_THREAD',
            'POST_DATA_TO_INDEX_SINGLE',
            'POST_DATA_TO_INDEX_MULTI',
            'PING_SERVER',
            'RESET_STATE'
        ]),
        async pingServer() {
            this.loading = true;
            await this.PING_SERVER();
            this.loading = false;
        },
        async submitAddData() {
            this.loading = true;
            this.firstRun = true;
            if (this.useSingle) {
                await this.POST_DATA_TO_INDEX_SINGLE({ doc_data: this.data, doc_id: this.docId });
            }
            if (this.useMulti) {
                await this.POST_DATA_TO_INDEX_MULTI({
                    doc_data: this.data,
                    doc_id: this.docId,
                    maxWorkers: this.maxWorkers
                });
            }
            this.loading = false;
        },
        async submitSearchData() {
            this.loading = true;
            this.firstRun = true;
            if (this.useSingle) {
                await this.GET_SEARCH_FROM_SINGLE_THREAD(this.search);
            }
            if (this.useMulti) {
                await this.GET_SEARCH_FROM_MULTI_THREAD({ search: this.search, maxWorkers: this.maxWorkers });
            }
            this.loading = false;
        },
        setMaxWorkers(maxWorkers: number) {
            this.maxWorkers = maxWorkers;
        },
        resetState() {
            this.RESET_STATE();
        },
        async startTest() {
            this.firstRun = true;
            const docsData: any = [];
            this.showError = false;

            if (this.testCount === null || !parseInt(this.testCount)) {
                this.error = 'Enter valid integer as test Number';
                this.showError = true;
                this.loading = false;
                return;
            }
            const testCount = parseInt(this.testCount);
            for (let i = 0; i < testCount; i++) {
                const docId = randexp('https://[a-z]{0,20}');
                for (let j = 0; j < 10; j++) {
                    const docData = randexp('[a-z]{0,10}');
                    docsData.push({ docId, docData });
                }
            }

            docsData.map(async (docData: any) => {
                await this.POST_DATA_TO_INDEX_SINGLE({ doc_data: docData.docData, doc_id: docData.docId });
                await this.POST_DATA_TO_INDEX_MULTI({
                    doc_data: docData.docData,
                    doc_id: docData.docId,
                    maxWorkers: this.maxWorkers
                });
            });

            docsData.map(async (docData: any) => {
                await this.GET_SEARCH_FROM_SINGLE_THREAD(docData.docData);
                await this.GET_SEARCH_FROM_MULTI_THREAD({
                    search: docData.docData,
                    maxWorkers: this.maxWorkers
                });
            });
        },
        async runTest() {
            this.loading = true;
            await this.startTest().then(() => (this.loading = false));
        }
    },
    watch: {},
    beforeMount() {
        this.RESET_STATE();
    },
    mounted() {
        this.PING_SERVER();
        window.setInterval(() => {
            this.PING_SERVER();
        }, 6000000);
    }
});
</script>

<style lang="scss">
.v-main-wrapper {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    max-width: 900px;
    margin: 0 auto;
}
.online {
    color: #2fac66;
}
.offline {
    color: #ff3631;
}
#useMultiLabel,
#useSingleLabel {
    color: honeydew;
}

.results-header {
    color: honeydew;
    font-weight: bold;
}
.result {
    overscroll-behavior-y: initial;
}
</style>
<style src="@vueform/toggle/themes/default.css"></style>
