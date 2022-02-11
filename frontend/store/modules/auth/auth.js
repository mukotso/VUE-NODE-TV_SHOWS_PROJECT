const user = JSON.parse(localStorage.getItem('user'));


export const auth = {
    namespaced: true,
    state: {
        status: {
            loggedIn: user ? true : false
        },

        user: user
    },

    getters: {
        authState: state => state.status,
        user: state => state.user,
    },

    actions: {
        login({commit},data) {
            if (data.token) {
                localStorage.setItem('jwToken', JSON.stringify(data.token));
                localStorage.setItem('user', JSON.stringify(data.loggedInUser));
            }

            commit('login',data.loggedInUser);
        },
        logout({ commit }) {
            localStorage.clear();
            commit('logout');
        },
    },
    mutations: {
        logout(state) {
            state.status.loggedIn = false;
            state.user = {};
        },
        login(state,user) {
            state.status.loggedIn = true;
            state.user = user;
        },
    }
};