<template>
    <div class="search-container">
        <b-form class="form" @submit.stop.prevent @submit="onSubmit">
            <b-form-group
            class="text-left"
            id="name-fieldset"
            label="Username*"
            label-for="userName"
            invalid-feedback="Enter at least 2 letters"
            :state="nameState(username)"
            >
                <b-form-input required lazy id="userName" v-model="username" trim></b-form-input>
            </b-form-group>

            <b-form-group
            class="text-left"
            id="f-name-fieldset"
            label="First Name"
            label-for="firstName"
            invalid-feedback="Enter at least 2 letters"
            :state="nameState(firstName)"
            >
                <b-form-input lazy id="firstName" v-model="firstName" trim></b-form-input>
            </b-form-group>

            <b-form-group
            class="text-left"
            id="l-name-fieldset"
            label="Last Name"
            label-for="lastName"
            invalid-feedback="Enter at least 2 letters"
            :state="nameState(lastName)"
            >
                <b-form-input lazy id="lastName" v-model="lastName" trim></b-form-input>
            </b-form-group>

            <b-form-group
            class="text-left"
            id="email-fieldset"
            label="Email*"
            label-for="email"
            invalid-feedback="Enter at least 2 letters"
            :state="nameState(email)"
            >
                <b-form-input required type="email" lazy id="email" v-model="email" trim></b-form-input>
            </b-form-group>

            <b-form-group
            class="text-left"
            id="password-fieldset"
            description="Must be at least 6 symbols long and contain one digit"
            label="Password*"
            label-for="password"
            invalid-feedback="Invalid password format!"
            :state="passwordState()"
            >
                <b-form-input required type="password" lazy id="password" v-model="password" trim></b-form-input>
            </b-form-group>


            <b-button type="submit" style="margin-top: 20px" size="sm" class="mb-2">
                <b-icon icon="search" aria-hidden="true"></b-icon> Register
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
    name: 'Register',
    data:() => {
        return {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            errors: [],

            password: '',
            hasLenght: false,
            hasDigit: false
        }
    },
    methods: {
        nameState(nameToValidate){
            return nameToValidate.length < 2 && nameToValidate.length != 0 ? false : true
        },
        passwordState(){
            this.hasLenght = this.password.length >= 6;
            this.hasDigit = /\d/.test(this.password);
            if (this.password.length == 0)
                return true
            return this.hasDigit && this.hasLenght
        },
        async executeRequest() {
            let roles = await Users.getRoles()
            console.log(roles);
            let userRoleId = 1;
            roles.forEach(role => {
                if (role.name == 'User')
                    userRoleId = role.id
            })
            let user = {
                name: this.username,
                role_id: userRoleId,
                first_name: this.firstName,
                last_name: this.lastName,
                email: this.email,
                password: this.password
            }

            let response = await (await Users.createUser(user)).data
            this.$store.dispatch('GET_USER_INFO', response.id)
            this.$router.push({path: '/', query: {search: this.searchString}});
        },
        async onSubmit(){
            this.errors = []
            let isValid = true
            if (!this.hasLenght){
                this.errors.push('Password needs to be at least 6 letters lenght')
                isValid = false
            }
            if (!this.hasDigit){
                this.errors.push('Password should contain at least one number')
                isValid = false
            }
            if (!this.nameState(this.username)){
                this.errors.push('Username should contain at least two letters')
                isValid = false
            }
            if (!this.nameState(this.firstName)){
                this.errors.push('First name should contain at least two letters')
                isValid = false
            }
            if (!this.nameState(this.lastName)){
                this.errors.push('Last name should contain at least two letters')
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
