<script>
  import RegisterUser from './components/registerUser.vue';
  import UpdateUser from './components/updateUser.vue';
  import GetAllUser from './components/getAllUser.vue';

export default {
  name:'App',
  components: {
    RegisterUser,
    GetAllUser,
    UpdateUser
  }
}
</script>

<template>
  <RegisterUser></RegisterUser>
  <GetAllUser></GetAllUser>
  <UpdateUser></UpdateUser>
</template>

<style scoped>

</style>
