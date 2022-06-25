<template>
    <div class="auth__container">
        <h1 class="auth__title">LeadHit</h1>

        <form class="auth-form">
            <input class="auth-form__input" type="text" v-model="siteId" />
            <div class="auth-form__button" @click="onLogin">Войти</div>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            siteId: '',
            showLoginError: false
        }
    },
    methods: {
        ...mapActions({
            login: 'auth/login'
        }),
        onLogin() {
            if (this.siteId.length === 24) {
                this.login(this.siteId)
            }
            // this.showLoginError = true;
        }
    }
}
</script>

<style scoped>

</style>