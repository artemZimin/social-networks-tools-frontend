import { abortNavigation, useCookie } from "nuxt/app";
import axios from '@/utils/axios'

export default defineEventHandler(async (event) => {
    const token = useCookie('token')

    try {
        const response = await axios.get('/api/v1/user', {
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })

        return {
            user: response.data
        }
    } catch (error) {
        return abortNavigation()
    }
})