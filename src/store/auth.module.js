import AuthService from '../services/auth.service.js'

export const auth = {
    namespaced: true,

    actions: {
        async login({ state }, siteId) {
            return await new AuthService().login(state.LOGIN_URL ,siteId)
        },
        saveId({ state }, siteId) {
            localStorage.setItem(state.ID_KEY, siteId)
        }
    },
    getters: {
        isAuthorized(state) {
            const id = localStorage.getItem(state.ID_KEY)

            if (id) return true
            return false
        }
    },
    mutations: {
    },
    state: {
        LOGIN_URL: 'https://track-api.leadhit.io/client/test_auth',
        ID_KEY: 'leadhit-site-id'
    }
}