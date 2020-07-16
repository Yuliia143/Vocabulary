<template>
    <div class="container">
        <h1 class="container__title">Your own vocabulary</h1>
        <options/>
        <div class="table__wrapper">
            <table>
                <tr v-for="word in words">
                    <td>
                        <div class="table__options">
                            <input type="checkbox"/>
                            <button @click="onListen(word.title)">
                                <svg>
                                    <use xlink:href="#speaker"></use>
                                </svg>
                            </button>
                        </div>
                        <span>{{word.title}}</span>
                    </td>
                    <td>
                        <button @click="onRemove(word.id)">
                            <svg>
                                <use xlink:href="#delete"></use>
                            </svg>
                        </button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import Options from "./Options";
    import {mapGetters} from "vuex";

    export default {
        name: "Vocabulary",
        components: {Options},
        computed: {
            ...mapGetters([
                'getWords',
            ]),
            words() {
                return this.searchWords(this.getWords);
            }
        },
        methods: {
            searchWords(array) {
                return array.filter(word => word.title.startsWith(this.$store.getters.getQuery));
            },
            onListen(value) {
                speechSynthesis.speak(new SpeechSynthesisUtterance(value));
            },
            onRemove(id) {
                this.$store.commit('removeWord', id);
            }
        },
    }
</script>

<style scoped>
    .container {
        width: 90%;
        margin: 0 auto;
    }

    .container__title {
        text-align: center;
        font-weight: lighter;
    }

    table {
        width: 90%;
        margin: 0 auto;
    }

    table svg {
        width: 25px;
        height: 25px;
        cursor: pointer;
    }

    table svg:hover{
        transform: scale(1.2);
    }
    tr {
        border-radius: 3px;
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        align-items: center;

        background-color: #ffffff;
        border: 1px solid #a6c2c3;
        box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
    }
    tr:nth-child(odd){
        border: 1px solid #e0c79c;
    }

    tr td:first-child {
        display: flex;
        justify-content: space-between;
    }

    .table__options {
        display: flex;
        justify-content: space-between;
        width: 95px;
        margin-right: 30px;
    }

    button {
        background: transparent;
        border: none;
        outline: none;
    }
</style>