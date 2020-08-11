<template>
    <div class="modal__mask">
        <div class="modal__container">
            <svg @click="onClose(word)">
                <use xlink:href="#close"></use>
            </svg>
            <div class="modal__header">
                <img v-if="word.img" :src="word.img" :alt="word.title">
                <svg v-else :style="{width: '100%', height: '100%'}">
                    <use xlink:href="#addPicture"></use>
                </svg>
            </div>
            <div class="modal__body">
                <div class="modal__word">
                    <button @click="onListen(word.title)">
                        <svg>
                            <use xlink:href="#speaker"></use>
                        </svg>
                    </button>
                    <input class="word__title" v-model="word.title" value="word.title"/>
                    <input class="word__translation" v-model="word.translation" value="word.translation"/>
                </div>
            </div>
            <div class="modal__footer">
                <button>
                    <svg v-if="word.status ==='studied'" style="fill: #6ca95f">
                        <use xlink:href="#studied"></use>
                    </svg>
                    <svg v-else style="fill: #e61a20">
                        <use xlink:href="#studying"></use>
                    </svg>
                </button>
                <button @click="onRemove(word.id)">
                    <svg>
                        <use xlink:href="#delete"></use>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WordDetailsModal",
        props: {
            word: Object
        },
        methods: {
            onListen(value) {
                speechSynthesis.speak(new SpeechSynthesisUtterance(value));
            },
            onRemove(id) {
                this.$store.commit('removeWord', id);
                this.$emit('close');
            },
            onClose(word) {
                this.$store.dispatch('updateWord', word);
                this.$emit('close');
            }
        }
    }
</script>

<style scoped>
    .modal__mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .modal__container {
        position: absolute;
        z-index: 10;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        border: 1px solid #a6c2c3;
        background: white;

        min-height: 350px;
        width: 300px;
        padding: 15px;

        display: flex;
        flex-direction: column;
    }

    .modal__container > svg {
        position: absolute;
        top: -13px;
        right: -13px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        fill: #e0c79c;
    }

    .modal__body {
        text-align: center;
        display: flex;
        flex-direction: column;
    }

    .modal__header img {
        width: 100%;
    }

    .modal__word {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
    }

    .modal__word svg {
        width: 30px;
        height: 30px;
    }

    .modal__word input{
        text-align: center;
        border: none;
        border-bottom: 1px solid black;
        align-self: center;
        width: 50%;
        margin-bottom: 15px;
    }
    .modal__word input:focus{
        outline: none;
    }
    .word__title {
        font-size: 24px;
    }
    .word__translation{
        font-size: 16px;
    }


    .modal__body {
        flex: 1;
    }

    .modal__body p {
        margin: 5px;
    }

    .modal__footer {
        display: flex;
        justify-content: space-between;
    }

    .modal__footer svg {
        width: 30px;
        height: 30px;
    }

    button {
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
    }
</style>
