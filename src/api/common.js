import axios from 'axios'
// import VueCookie from 'vue-cookie'


export let RestClient = axios.create({
    baseURL: 'http://116.203.149.31:8000/api/',
})

export let postExternalRequest = async (url, payload) => {
    return await RestClient.post(url, payload)
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

export let getExternalRequest = async (url) => {
    let response = await RestClient.get(url)
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

export let patchExternalRequest = async (url, payload) => {
    let response = await RestClient.patch(url, payload)
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


export let deleteExternalRequest = async (url) => {
    let response = await RestClient.delete(url)
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