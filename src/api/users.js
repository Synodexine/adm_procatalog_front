import axios from 'axios'
import { getExternalRequest, postExternalRequest } from './common'


export let AuthRestClient = axios.create({
    baseURL: 'http://192.168.100.3:8010/api/',
})


export const Users = {
    async createUser(accountData) {
        return await postExternalRequest('/users/', accountData, AuthRestClient)
        .then((response) => {
            return {
                data: response.data,
                status: response.statusCode 
            }
        })
    },
    async obtainUserTokens(email, password) {
        return await postExternalRequest('/users/obtain-token/', {"email": email, "password": password}, AuthRestClient)
        .then((response) => {
            return {
                data: {
                    accessToken: 'Bearer ' + response.data?.access_token,
                    refreshToken: response.data?.refresh_token
                },
                status: response.status,
            }
        })
    },
    async verifyToken(token) {
        return await postExternalRequest('/users/verify-token/', {'token': token.split(' ')[1]}, AuthRestClient)
    },
    async getRoles() {
        return await (await getExternalRequest('/permissions/roles/', AuthRestClient)).data
    },
    async getUserInfo(userId) {
        return await getExternalRequest('/users/' + userId + '/', AuthRestClient)
    },
}