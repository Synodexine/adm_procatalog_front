import axios from 'axios'
// import VueCookie from 'vue-cookie'


export let RestClient = axios.create({
    baseURL: 'http://116.203.149.31:8000/api/',
})

export let postExternalRequest = async (url, payload, restClient = RestClient) => {
    return await restClient.post(url, payload)
    .catch((error) => {
        return {
            data: error.response.data,
            status: error.response.status,
        }
    })
    .then((response) => {
        return {
            data: response.data,
            status: response.status,
        }
    })
}

export let getExternalRequest = async (url, restClient = RestClient) => {
    let response = await restClient.get(url)
    .catch(error => {
        return {
            data: error.response.data.detail,
            status: error.response.status
        }
    })
    return {
        data: response.data,
        status: response.status
    }
}

export let patchExternalRequest = async (url, payload, restClient = RestClient) => {
    let response = await restClient.patch(url, payload)
    .catch(error => {
        return {
            data: error.response.data.detail,
            status: error.response.status
        }
    })
    return {
        data: response.data,
        status: response.status
    }
}


export let deleteExternalRequest = async (url, restClient = RestClient) => {
    let response = await restClient.delete(url)
    .catch(error => {
        return {
            data: error.response.data.detail,
            status: error.response.status
        }
    })
    return {
        data: response.data,
        status: response.status
    }
}

// let token = VueCookie.get('token')
// RestClient.defaults.headers.common['Authorization'] = token