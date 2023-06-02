<script>
  import RegisterUser from './components/registerUser.vue';
  import UpdateUser from './components/updateUser.vue';
  import GetAllUser from './components/getAllUser.vue';
  import DeleteUser from './components/deleteUser.vue';

export default {
  name:'App',
  components: {
    RegisterUser,
    GetAllUser,
    UpdateUser,
    DeleteUser
  }
}
</script>

<template>
  <GetAllUser></GetAllUser>
  <RegisterUser></RegisterUser>
  <UpdateUser></UpdateUser>
  <DeleteUser></DeleteUser>
</template>

<style scoped>

</style>
