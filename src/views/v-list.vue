<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <ul
                    class="list-group scrollable overflow-scroll"
                    ref="searchResultSingle"
                    style="max-height: 500px; overflow: scroll"
                >
                    <li class="list-group-item" v-for="(result, id) in this.searchResultSingleThread" :key="id">
                        OperationId: {{ id }} Time: {{ result ? result.result_time.toFixed(6) : '' }} Result:
                        {{ result ? result.result : '' }}
                    </li>
                    <li class="list-group-item-primary" style="">Search Single</li>
                </ul>
            </div>
            <div class="col">
                <ul
                    class="list-group scrollable overflow-scroll"
                    ref="searchResultMulti"
                    style="max-height: 500px; overflow: scroll"
                >
                    <li class="list-group-item" v-for="(result, id) in this.searchResultMultiThread" :key="id">
                        OperationId: {{ id }} Time: {{ result ? result.result_time.toFixed(6) : '' }} Result:
                        {{ result ? result.result : '' }}
                    </li>
                    <li class="list-group-item-primary">Search Multi</li>
                </ul>
            </div>
            <div class="col">
                <ul class="list-group scrollable overflow-scroll" style="max-height: 500px; overflow: scroll">
                    <li class="list-group-item" v-for="(result, id) in this.singleThread" :key="id">
                        OperationId: {{ id }} Time: {{ result ? result.result_time.toFixed(6) : '' }}
                    </li>
                    <li class="list-group-item-primary" ref="addResultSingle">Add Single</li>
                </ul>
            </div>
            <div class="col">
                <ul class="list-group scrollable overflow-scroll" style="max-height: 500px; overflow: scroll">
                    <li class="list-group-item" v-for="(result, id) in this.multiThread" :key="id">
                        OperationId: {{ id }} Time: {{ result ? result.result_time.toFixed(6) : '' }}
                    </li>
                    <li class="list-group-item-primary" ref="addResultMulti">Add Multi</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
export default defineComponent({
    name: 'v-list',
    computed: {
        ...mapState('home', ['singleThread', 'multiThread', 'searchResultSingleThread', 'searchResultMultiThread'])
    },
    updated() {
        this.$nextTick(() => this.scrollToEnd());
    },
    methods: {
        scrollToEnd() {
            const elementsToScroll = document.querySelectorAll<HTMLElement>('.scrollable');
            elementsToScroll.forEach((elementScroll: HTMLElement) => {
                if (elementScroll.lastElementChild !== null) {
                    const lastEl = elementScroll.lastElementChild as HTMLElement | null;
                    elementScroll.scrollTop = lastEl?.offsetTop || 0;
                }
            });
        }
    }
});
</script>

<style scoped></style>
