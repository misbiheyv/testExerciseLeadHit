<template>
    <div class="auth__container">
        <h1 class="page-title auth__title">LeadHit</h1>

        <form class="auth-form">
            <input 
                class="auth-form__input triggered-input" 
                type="text" 
                v-model="siteId"
            />
            <div class="error" :class="showLoginError?'visible':''" >
                {{ errorMessage }}
            </div>
            <button class="auth-form__button" @click.prevent="onLogin">Войти</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

const errorMessages = {
    shortId: 'Id введен некорректно.',
    invalidId: 'Не удалось войти. Попробуйте еще раз или измените id.',
    unknownError: 'Проблемы с выполнением запроса. Попробуйте еще раз или повторите попытку через некоторое время',
}

export default {
    data() {
        return {
            siteId: '',
            showLoginError: false,
            errorMessage: errorMessages.shortId
        }
    },
    methods: {
        ...mapActions({
            login: 'auth/login',
            saveId: 'auth/saveId'
        }),
        async onLogin() {
            if (this.siteId.length !== 24) {
                return this.showLoginError = true;
            }
            const res = await this.login(this.siteId)

            if (!res.success) {

                this.errorMessage = res.error === 'Invalid' 
                    ? errorMessages.invalidId
                    : errorMessages.unknownError

                this.showLoginError = true
                return ;
            }

            this.saveId(res.siteId)
            this.$router.push('analytics')
        }
    },
    watch: {
        siteId() {
            if (!this.showLoginError) return
            this.showLoginError = false
        }
    }
}
</script>

<style scoped>
.auth__container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.auth__title { margin-bottom: 10px; }
.auth-form>*:not(:first-child) { margin-top: 10px; }
.auth-form> .error{ margin-top: 0px; }

.auth-form__input {
    display: block;
    width: 100%;
    border: 1px solid transparent;
    min-height: 46px;
    line-height: 1.466;
    font-family: inherit;
    font-size: 15px;
    font-weight: 400;
    padding: 12px 25px 11px 15px;
    word-break: keep-all;
    border-radius: 4px;
    transition: all .3s ease;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.auth-form__button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-height: 46px;

    background: #994df7;
    border-radius: 4px;

    color: white;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 24px;
    transition: all .3s ease;
}
.auth-form__button:hover {
    background: #e6c8fa;
    color: #994df7;
}

.error {
    position: relative;
    width: 100%;
    font-size: 12px;
    line-height: 15px;
    height: 15px;

    color: #ff714d;
    display: none;
}

.visible {
    display: block;
}


</style>
