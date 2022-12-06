<template>

    <Responsive class="w-full" style="margin-top: 20px">
        <template #main="{ width }">
            <Chart
                :size="{ width, height: 400 }"
                :data="STATE.chartData.searchSingle"
                :margin="margin"
                :direction="direction"
                :axis="axis"
                style="background-color: azure; padding-left: 20px; padding-bottom: 20px"
            >
                <template #layers>
                    <Grid strokeDasharray="1,1" />
                    <Line
                        :dataKeys="['queryNumber', 'result_time']"
                        :line-style="{ stroke: 'black' }"
                        :type="'monotone'"
                    />
                </template>
            </Chart>
        </template>
    </Responsive>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Chart, Grid, Line, Responsive } from 'vue3-charts';
import { mapGetters } from 'vuex';

export default defineComponent({
    name: 'LineChart',
    components: { Responsive, Chart, Grid, Line },
    computed: {
        ...mapGetters('home', ['STATE'])
    },
    setup() {
        const direction = ref('vertical');
        const margin = ref({
            left: 0,
            top: 20,
            right: 20,
            bottom: 0
        });

        const axis = ref({
            primary: {
                type: 'linear',
                ticks: 20
            },
            secondary: {
                type: 'linear',
                ticks: 20
            }
        });

        return { direction, margin, axis };
    }
});
</script>

<style>
#app {
    color: #2ecc71;
}
</style>
