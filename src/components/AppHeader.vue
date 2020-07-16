<template>
    <header class="header" v-if="isAuth">
        <nav class="navigation">
            <ul class="navigation__list site__list">
                <li class="navigation__item site__logo">
                    <router-link to="/" class="navigation__link">
                        <img class="navigation__logo" src="../../public/images/logo-white.png" alt="Logo"/>
                    </router-link>
                </li>
                <li class="navigation__item">
                    <router-link to="/vocabulary" class="navigation__link">Vocabulary</router-link>
                </li>
            </ul>
            <ul class="navigation__list user__list">
                <li class="navigation__item">
                    <router-link to="/profile" class="navigation__link">Profile</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
    export default {
        name: "AppHeader",
        computed: {
            isAuth() {
                return this.$store.getters.getId;
            }
        }
    }
</script>

<style scoped>
    .header{
        background-color: #e0c79c;
        color: white;
        height: 60px;
    }
    .navigation {
        display: flex;
        justify-content: space-between;
        padding: 0 30px;
        height: 60px;
    }

    .navigation__list {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .navigation__item{
        cursor: pointer;
        padding: 20px;
    }
    .navigation__item.site__logo{
        padding: 5px 0 3px;;
    }
    .navigation__logo{
        height: 50px;
        width: 60px;
    }
    .site__list{
        display: flex;
        justify-content: space-between;
    }
    .navigation__link{
        text-decoration: none;
        color: white;
    }
</style>