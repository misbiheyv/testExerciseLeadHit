export const auth = {
    namespaced: true,

    actions: {
        async login({ state }, siteId) {
            try {
                const res = await fetch(state.LOGIN_URL, {
                    method: 'GET',
                    headers: {
                        'Api-Key':'5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo',
                        'Leadhit-Site-Id': `${siteId}`
                    }
                });
    
                if(res && res.ok) return {success: res.ok, siteId}
    
                return {success: false, error: 'Invalid'}
            } catch (err) {
                console.log(err)
                return {success: false, error: 'Unknown'}
            }
        },
        saveId(_, siteId) {
            localStorage.setItem('leadhit-site-id', siteId)
        }
    },
    getters: {
    },
    mutations: {
    },
    state: {
        LOGIN_URL: 'https://track-api.leadhit.io/client/test_auth'
    }
}