import axios from "@/utils/axios"

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.server) {
        const token = useCookie('token')

        try {
            await axios.get('/api/v1/user', {
                headers: {
                    'Authorization': `Bearer ${token.value}`
                }
            })
        } catch (error) {
            return navigateTo('/login')
        }
    }
})