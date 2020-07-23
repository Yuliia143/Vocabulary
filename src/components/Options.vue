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
                <div class="options__filtration filtration">
                    <button class="filtration__item" @click="onUpdateActiveFilter('studied')">
                        <svg :style="[this.getActiveFilter.includes('studied')? {transform: 'scale(1.2)'} : {}]">
                            <use xlink:href="#studied"></use>
                        </svg>
                    </button>
                    <button class="filtration__item" @click="onUpdateActiveFilter('studying')">
                        <svg :style="[this.getActiveFilter.includes('studying')? {transform: 'scale(1.2)'} : {}]">
                            <use xlink:href="#studying"></use>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="options__right">
                <button class="options__create" @click="showCreateModal = true">Add new word</button>
            </div>
            <create-word-modal v-if="showCreateModal" @close="showCreateModal = false"/>
        </div>
    </div>
</template>

<script>
    import CreateWordModal from "./CreateWordModal";
    import {mapGetters} from "vuex";

    export default {
        name: "Options",
        components: {CreateWordModal},
        data() {
            return {
                showCreateModal: false,
            }
        },
        computed: {
            ...mapGetters([
                'getActiveFilter',
                'getQuery'
            ]),
            query: {
                get() {
                    return this.getQuery;
                },
                set(value) {
                    this.$store.commit('updateQuery', value);
                }
            },
        },
        methods: {
            onUpdateActiveFilter(value) {
                this.$store.commit('updateActiveFilter', value);
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
        justify-content: space-between;
        padding: 10px 20px;
    }

    .options__left {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .options__left input {
        width: 20px;
        height: 14px;
        outline: none;
        border-radius: 3px;
        margin-right: 35px;
        border: 1px solid lightslategray;
    }

    .options__search {
        position: relative;
    }

    .options__search input {
        height: 28px;
        width: 100%;
        padding-left: 5px;
    }

    .options__search svg {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 4px;
        right: 0;
    }

    .options__create {
        outline: none;
        border: 1px solid lightslategray;
        color: white;
        background-color: #e0c79c;
        padding: 10px 20px;
        cursor: pointer;
        border-radius: 3px;
    }

    .options__create:hover {
        border: 1px solid white;
        color: black;
    }

    .options__filtration {
        margin-left: 20px;
        padding-top: 4px;
    }

    .filtration__item svg {
        width: 30px;
        height: 30px;
    }

    button {
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
    }

    @media (max-width: 767px) {
        .options__left {
            width: 60%;
            justify-content: flex-start;
        }

        .options__right {
            width: 37%;
            display: flex;
            justify-content: flex-end;
        }

        .options__left input {
            margin-right: 0;
        }

        .options__create {
            margin-left: 10px;
            padding: 5px;
        }

        .options__search input {
            height: 25px;
        }
    }
</style>