<template>
    <v-card>
        <v-text-field v-model="email" label="Votre email">
        </v-text-field>
        <v-text-field v-model="password" type="password" label="Votre mot de passe">
        </v-text-field>
        <v-btn @click="triggerLogin">Connexion</v-btn>
    </v-card>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    data: () => ({
        email: '',
        password: ''
    }),
    methods: {
        ...mapActions('user', ['login']),
        async triggerLogin() {
            try {
                await this.login({
                    email: this.email,
                    password: this.password
                        }).then(() => this.$router.push('/'))
            } catch (err) {
                console.log('oups')
            }
        }
    }
}
</script>