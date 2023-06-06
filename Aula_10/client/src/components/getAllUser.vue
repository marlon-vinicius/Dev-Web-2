<template>
    <div>
        <h1>Consulta Usuários</h1>
        <form @submit.prevent="getUsers">
            <button type="submit">Mostrar todos</button>
            <p>{{ msg }}</p>
        </form>
        <div class="showUser">
            <table >
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>                        
                    </tr>
                </thead>
                <tbody v-if="users.length">
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.nome }}</td>
                        <td>{{ user.email }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: '',
            users: []
        }
    },
    methods: {
        async getUsers() {
            try {
                const response = await fetch('http://localhost:3000/api/getUsers');
                const data = await response.json();
                this.users = data;
            } catch (error) {
                this.msg = error.message;
            }
        }
    },
}
</script>

<style scoped>
    h1 {
        color: black;
    }
    button {
        background-color: rgb(247, 182, 77);
    }    
    .showUser {
        background-color: rgba(247, 182, 77, 0.674);
        display: flex;
        justify-content: center;
        margin: 0 10px;
    }

    table, th,td {
        border: 2px solid #4444;
        border-collapse: collapse;
    }
    table {
        width: 100%;
    }
</style>
