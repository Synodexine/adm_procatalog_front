import { getExternalRequest, postExternalRequest } from './common'

export const Accounts = {
    async createProduct(productData) {
        return await postExternalRequest('/products/', productData)
        .then((response) => {
            return {
                data: response.data,
                status: response.statusCode 
            }
        })
    },
    async getAllProducts() {
        return await postExternalRequest('/accounts/obtain_token/', {"username": username, "password": password})
        .then((response) => {
            return {
                data: 'Bearer ' + response.data?.token,
                status: response.status,
            }
        })
    },
    async verify_token(token) {
        return await postExternalRequest('/accounts/verify_token/', {'token': token.split(' ')[1]})
    },
    async getUserInfo() {
        return await getExternalRequest('/accounts/get-user-info/')
    },
    async changePrefix(prefix){
        return await postExternalRequest('/accounts/change-prefix/', {'prefix': prefix})
    }
}