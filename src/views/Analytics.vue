<template>
    <div v-if="isAuthorized" class="_container analytic__container">
        <h1 class="page-title">Аналитика</h1>
        <section class="analytic__section">
            <h3 class="section__title">Аналитика по визитам</h3>
            <chart class="section__chart"></chart>
        </section>
        <div></div>
    </div>
</template>

<script>
import Chart from '../components/Chart.vue'
import { mapGetters } from 'vuex'

export default {
    components: { Chart },
    mounted() {
        if (!this.isAuthorized) {
            this.$router.push('/')
            .then(() => {
                location.reload()
            })
        }
    },
    computed: {
        ...mapGetters({
            isAuthorized: 'auth/isAuthorized'
        })
    }
}
</script>

<style scoped>
._container {
    padding: 10px;
}
.analytic__container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
}

.analytic__section {
    max-width: 1300px;
    width: 100%;
    display: flex;
    flex-direction: column;
}
@media screen and (min-width: 2000px) {
    .analytic__section {
        max-width: 2000px;
    }
}
.analytic__section>*:not(:last-child) {
    margin-bottom: 10px;
}

.section__title {
    display: inline-flex;
    justify-content: center;
    text-align: inherit;

    font-weight: 700;
    font-size: 18px;
}

.section__chart {
    min-height: 500px;
    width: 100%;
}
@media screen and (max-height: 650px) {
    .section__chart {
        min-height: 300px;
    }
}
@media screen and (max-width: 750px) {
    .section__chart {
        min-height: 300px;
    }
}
@media screen and (max-height: 400px) {
    .section__chart {
        min-height: 150px;
        height: 100%;
    }
}
</style>