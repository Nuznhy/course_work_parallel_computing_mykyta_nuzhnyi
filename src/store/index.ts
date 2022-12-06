import Vuex, { StoreOptions } from 'vuex';
import { home } from '@/store/modules/home';
import createPersistedState from 'vuex-persistedstate';

export interface RootState {
    welcomeMessage: string;
}

const store: StoreOptions<RootState> = {
    state: {
        welcomeMessage: 'Hello'
    },
    mutations: {},
    actions: {},
    modules: {
        home
    },
    plugins: [createPersistedState()]
};

export default new Vuex.Store<RootState>(store);
