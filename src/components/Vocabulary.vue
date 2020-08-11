<template>
    <div class="container">
        <h1 class="container__title">Your own vocabulary({{`${words.length}`}})</h1>
        <options/>
        <div class="table__wrapper">
            <h3 v-if="words.length===0">No words found</h3>
            <table class="ui-table">
                <tr v-for="word in words" @click.self="onShowDetailsModal(word)" class="ui-table__row">
                    <td class="ui-table__cell table__left">
                        <div class="table__options">
                            <input type="checkbox"/>
                            <button @click="onListen(word.title)">
                                <svg>
                                    <use xlink:href="#speaker"></use>
                                </svg>
                            </button>
                        </div>
                        <div class="table__content">
                            <span class="table__word">{{word.title}}</span>
                            <span class="table__translation">{{word.translation}}</span>
                        </div>
                    </td>
                    <td class="ui-table__cell table__right">
                        <div class="table__wordImg">
                            <img v-if="word.img" :src="word.img" :alt="word.title">
                            <svg v-else :style="{width: '100%', height: '100%'}">
                                <use xlink:href="#addPicture"></use>
                            </svg>
                        </div>
                        <div>
                            <button>
                                <svg v-if="word.status ==='studied'">
                                    <use xlink:href="#studied"></use>
                                </svg>
                                <svg v-else>
                                    <use xlink:href="#studying"></use>
                                </svg>
                            </button>
                            <button @click="onRemove(word.id)">
                                <svg>
                                    <use xlink:href="#delete"></use>
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <word-details-modal v-if="showDetailsModal" @close="showDetailsModal = false" :word="propsWord"/>
    </div>
</template>

<script>
    import Options from "./Options";
    import {mapGetters} from "vuex";
    import WordDetailsModal from "./WordDetailsModal";

    export default {
        name: "Vocabulary",
        components: {WordDetailsModal, Options},
        data() {
            return {
                showDetailsModal: false,
                propsWord: null
            }
        },
        computed: {
            ...mapGetters([
                'getWords',
                'getSearchedWords',
                'getFilteredWords',
            ]),
            words() {
                return this.getFilteredWords;
            }
        },
        methods: {
            onListen(value) {
                speechSynthesis.speak(new SpeechSynthesisUtterance(value));
            },
            onRemove(id) {
                this.$store.dispatch('removeWord', id);
            },
            onShowDetailsModal(word) {
                this.onListen(word.title);
                this.propsWord = word;
                this.showDetailsModal = true;
            },
        },
    }
</script>

<style scoped>
    .container {
        width: 90%;
        margin: 0 auto;
    }

    .container__title, .table__wrapper h3 {
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

    table svg:hover {
        transform: scale(1.2);
    }

    tr {
        border-radius: 3px;
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        align-items: center;
        cursor: pointer;

        background-color: #ffffff;
        border: 1px solid #a6c2c3;
        box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
    }

    tr:nth-child(odd) {
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
        align-items: center;
    }

    .table__content {
        display: flex;
        flex-direction: column;
    }

    .table__translation {
        color: lightslategray;
        font-size: 16px;
    }

    .table__right {
        display: flex;
    }

    .table__wordImg {
        width: 70px;
        height: 40px;
        margin-right: 10px;
        overflow: hidden;
    }

    .table__wordImg img {
        width: 100%;
        height: auto;
    }

    button {
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
    }


    @media (max-width: 767px) {
        .table__right, .table__left{
            flex-direction: column;
        }
        .table__wordImg{
            margin-bottom: 7px;
        }
        .table__options{
            width: fit-content;
        }
    }
</style>
