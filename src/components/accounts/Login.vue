<template>
    <div class="search-container">
        <b-form class="form" @submit.stop.prevent @submit="onSubmit">
            <b-form-group
            class="text-left"
            id="email-fieldset"
            label="Email"
            label-for="email"
            >
                <b-form-input required type="email" lazy id="email" v-model="email" trim></b-form-input>
            </b-form-group>

            <b-form-group
            class="text-left"
            id="password-fieldset"
            label="Password"
            label-for="password"
            invalid-feedback="Invalid password format!"
            :state="passwordState()"
            >
                <b-form-input required type="password" lazy id="password" v-model="password" trim></b-form-input>
            </b-form-group>


            <b-button type="submit" style="margin-top: 20px" size="sm" class="mb-2">
                <b-icon icon="box-arrow-in-right" aria-hidden="true"></b-icon> Log in
            </b-button>

            <ErrorPanel v-bind:errors="errors"></ErrorPanel>
        </b-form>
    </div>
</template>

<script>
import ErrorPanel from "../common/ErrorPanel"
// import { postExternalRequest } from '../../api/common'
import { Users } from '../../api/users'

export default {
    components: {
        ErrorPanel
    },
    name: 'Login',
    data:() => {
        return {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            errors: [],

            password: '',
        }
    },
    methods: {
        nameState(nameToValidate){
            return nameToValidate.length < 2 && nameToValidate.length != 0 ? false : true
        },
        passwordState(){
            if (this.password.length == 0)
                return true
            return this.password.length >= 6
        },
        async executeRequest() {
            let response = await Users.obtainUserTokens(this.email, this.password)
            if (response.status == 200)
            {
                let tokens = response.data
                this.$cookie.set('access_token', tokens.accessToken, 1)
                this.$cookie.set('refresh_token', tokens.refreshToken, 30)
                this.$store.dispatch('GET_USER_INFO_BY_TOKEN', tokens.accessToken)
                this.$router.push({path: '/', query: {search: this.searchString}});
            }
            else if (response.status == 404){
                this.errors.push('Unable to find a user with this credentials')
            }
            else {
                this.errors.push('Sorry! An unknown error occured while logging in')
            }
        },
        async onSubmit(){
            this.errors = []
            let isValid = true
            if (!this.password.length >= 6){
                this.errors.push('Password needs to be at least 6 letters length')
                isValid = false
            }
            if (!this.nameState(this.email)){
                this.errors.push('Email should contain at least two letters')
                isValid = false
            }
            if (isValid){
                await this.executeRequest();
            }
        }
    }
}
</script>

<style scoped>
.search-container{
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.form {
    width: 50vw;
    padding: 50px;
}
label{
    font-size: 20pt;
}
</style>
