<template>
    <div class="error-container">
        <b-alert variant="danger" v-for="error in errors" :key="error" show>
            {{error}}
        </b-alert>
    </div>
</template>

<script>
export default {
  name: 'ErrorPanel',
  props: {
      errors: Array
  }
}
</script>

<style scoped>
.error-container{
    /* background-color: #d45959; */
    margin: 20px;
}
</style>
