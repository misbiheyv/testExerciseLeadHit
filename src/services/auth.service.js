export default class AuthService {
    async login(url, siteId) {
        try {
            const res = await fetch(url, {
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
    }
}