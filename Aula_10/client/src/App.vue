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
  <div id="main">
    <GetAllUser></GetAllUser>
    <RegisterUser></RegisterUser>
    <UpdateUser></UpdateUser>
    <DeleteUser></DeleteUser>
  </div>
  
</template>

<style scoped>

</style>
