<template>
    <div class="options">
        <div class="options__wrapper">
            <div class="options__left">
                <input type="checkbox"/>
                <div class="options__search">
                    <input type="text"
                           placeholder="Search"
                           v-model="query"/>
                    <svg>
                        <use xlink:href="#search"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Options",
        computed: {
            query: {
                get() {
                    return this.$store.getters.getQuery;
                },
                set(value) {
                    this.$store.commit('updateQuery', value);
                }
            }
        }
    }
</script>

<style scoped>
    .options {
        margin: 0 auto 30px;
        width: 90%;
        background-color: #a6c2c3;
        border-radius: 3px;
    }

    .options__wrapper {
        display: flex;
        padding: 10px 20px;
    }

    .options__left {
        display: flex;
        justify-content: space-between;
    }

    .options__left input {
        width: 20px;
        height: 14px;
        border: none;
        outline: none;
        border-radius: 3px;
        margin-right: 35px;
    }

    .options__search {
        position: relative;
    }

    .options__search input {
        height: 25px;
        width: 100%;
        padding-left: 5px;
    }

    .options__search svg{
        width: 20px;
        height: 20px;
        position: absolute;
        top: 4px;
        right: 0;
    }
</style>