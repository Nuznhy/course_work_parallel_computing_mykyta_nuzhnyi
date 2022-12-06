import { Module } from 'vuex';
import * as axiosService from '@/services/AxiosService';
import { RootState } from '@/store';

export interface Data {
    doc_data: string;
    doc_id: string;
}

export interface getResponse {
    success: boolean;
    threadMulti: number;
    searchResult: string[];
    result_time: number;
    queryNumber: number | null;
}

export interface postResponse {
    success: boolean;
    threadMulti: number;
    result_time: number;
    words_added: number;
    queryNumber: number | null;
}

export interface MainState {
    singleThread: postResponse[];
    multiThread: postResponse[];
    searchResultSingleThread: getResponse[];
    searchResultMultiThread: getResponse[];
    chartData: {
        searchMulti: getResponse[];
        searchSingle: getResponse[];
        addSingle: postResponse[];
        addMulti: postResponse[];
    };
    searchQueryMultiNumber: number;
    searchQuerySingleNumber: number;
    addQuerySingleNumber: number;
    addQueryMultiNumber: number;
    serverStatus: string | null;
}

export const home: Module<MainState, RootState> = {
    namespaced: true,
    state: {
        singleThread: [],
        multiThread: [],
        searchResultSingleThread: [],
        searchResultMultiThread: [],
        chartData: {
            searchMulti: [],
            searchSingle: [],
            addSingle: [],
            addMulti: []
        },
        searchQueryMultiNumber: 0,
        searchQuerySingleNumber: 0,
        addQuerySingleNumber: 0,
        addQueryMultiNumber: 0,
        serverStatus: 'offline'
    },
    getters: {
        STATE(state) {
            return state;
        }
    },
    mutations: {
        ADD_TO_SINGLE_THREAD: (state, result: postResponse) => {
            state.singleThread.push(result);
            state.addQuerySingleNumber = state.singleThread.length;
            state.chartData.addSingle = [...state.singleThread];
            state.chartData.addSingle.sort((obj1, obj2) => obj1.result_time - obj2.result_time);
        },
        ADD_TO_MULTI_THREAD: (state, result: postResponse) => {
            state.multiThread.push(result);
            state.addQueryMultiNumber = state.multiThread.length;
            state.chartData.addMulti = [...state.multiThread];
            state.chartData.addMulti.sort((obj1, obj2) => obj1.result_time - obj2.result_time);
        },
        ADD_TO_SEARCH_RESULT_SINGLE: (state, searchResult: getResponse) => {
            state.searchResultSingleThread.push(searchResult);
            state.searchQuerySingleNumber = state.searchResultSingleThread.length;
            state.chartData.searchSingle = [...state.searchResultSingleThread];
            state.chartData.searchSingle.sort((obj1, obj2) => obj1.result_time - obj2.result_time);
            state.chartData.searchSingle[state.chartData.searchSingle.length - 1].queryNumber =
                state.searchQuerySingleNumber;
        },
        ADD_TO_SEARCH_RESULT_MULTI: (state, searchResult: getResponse) => {
            state.searchResultMultiThread.push(searchResult);
            state.searchQueryMultiNumber = state.searchResultMultiThread.length;
            state.chartData.searchMulti = [...state.searchResultMultiThread];
            state.chartData.searchMulti.sort((obj1, obj2) => obj1.result_time - obj2.result_time);
            state.chartData.searchMulti[state.chartData.searchMulti.length - 1].queryNumber =
                state.searchQueryMultiNumber;
        },
        SET_SERVER_STATE: (state, serverState: boolean) => {
            state.serverStatus = serverState ? 'online' : 'offline';
        },
        RESET: (state) => {
            state.singleThread = [];
            state.multiThread = [];
            state.searchResultSingleThread = [];
            state.searchResultMultiThread = [];
            state.chartData = {
                searchMulti: [],
                searchSingle: [],
                addSingle: [],
                addMulti: []
            };
            state.searchQueryMultiNumber = 0;
            state.searchQuerySingleNumber = 0;
            state.addQuerySingleNumber = 0;
            state.addQueryMultiNumber = 0;
        }
    },
    actions: {
        GET_SEARCH_FROM_SINGLE_THREAD({ commit }, search: string) {
            return axiosService
                .getSearchSingleThread(search)
                .then((response) => {
                    console.log(response);
                    commit('ADD_TO_SEARCH_RESULT_SINGLE', response?.data);
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                });
        },
        GET_SEARCH_FROM_MULTI_THREAD({ commit }, search: any) {
            return axiosService
                .getSearchMultiThread(search)
                .then((response) => {
                    console.log(response);
                    commit('ADD_TO_SEARCH_RESULT_MULTI', response?.data);
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                });
        },
        POST_DATA_TO_INDEX_SINGLE({ commit }, data: Data) {
            return axiosService
                .postAddToIndexSingle(data)
                .then((response) => {
                    console.log(response);
                    commit('ADD_TO_SINGLE_THREAD', response?.data);
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                });
        },
        POST_DATA_TO_INDEX_MULTI({ commit }, data: Data) {
            return axiosService
                .postAddToIndexMulti(data)
                .then((response) => {
                    console.log(response);
                    commit('ADD_TO_MULTI_THREAD', response?.data);
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                });
        },
        PING_SERVER({ commit }) {
            return axiosService
                .pingServer()
                .then((response) => {
                    console.log(response);
                    commit('SET_SERVER_STATE', response?.data.success);
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                    commit('SET_SERVER_STATE', false);
                    return error;
                });
        },
        RESET_STATE({ commit }) {
            commit('RESET');
        }
    },
    modules: {}
};
