<template>
    <div class="auth__container">
        <h1 class="auth__title">LeadHit</h1>

        <form class="auth-form">
            <input 
                class="auth-form__input triggered-input" 
                type="text" 
                v-model="siteId"
            />
            <div class="error" :class="showLoginError?'visible':''" >
                Id введен некорректно
            </div>
            <button class="auth-form__button" @click.prevent="onLogin">Войти</button>
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
                return this.login(this.siteId)
            }
            this.showLoginError = true;
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

.auth__title {
    font-weight: 700;
    font-size: 28px;
    line-height: 130%;
    color: rgb(44, 50, 54);
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

    background: #FF4402;
    border-radius: 4px;

    color: white;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 24px;
    transition: all .3s ease;
}
.auth-form__button:hover {
    background: #ee6230;
}

.error {
    position: relative;
    width: 100%;
    font-size: 10px;
    line-height: 15px;
    height: 15px;
    font-weight: 500;
    color: #ff714d;
    display: none;
}

.visible {
    display: block;
}

@keyframes trambling-animation {
    0%, 50%, 100% {
        transform: rotate(0deg);
    }
    10%, 30% {
        transform: rotate(-5deg);
    }
    20%, 40% {
        transform: rotate(5deg);
    }
}

</style>