<template>
    <div class="modal__mask">
        <div class="modal__container">
            <svg @click="$emit('close')">
                <use xlink:href="#close"></use>
            </svg>
            <form class="modal__createForm" @submit="onAdd">
                <div class="form__wrapper">
                    <div class="img-wrapper">
                        <img v-if="word.img" :src="`${word.img}`" alt="Picture" :style="{width: '100%', height: 'auto'}"/>
                        <svg v-else :style="{width: '100%', height: '100%'}">
                            <use xlink:href="#addPicture"></use>
                        </svg>
                    </div>
                    <div class="img-input">
                        <label>Add image
                            <input type="file" id="file" name="file" @change="onFileChange"/>
                        </label>
                    </div>
                    <div class="modal__inputs">
                        <input placeholder="Enter new word" type="text" v-model="word.title"/>
                        <input placeholder="Enter translation" type="text" v-model="word.translation"/>
                    </div>
                    <button class="modal__createButton">Create</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import Word from "../models/Word";

    export default {
        name: "CreateWordModal",
        data() {
            return {
                word: new Word()
            }
        },
        methods: {
            onFileChange(e) {
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.onload = (e) => {
                    this.word.img = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            onAdd(e) {
                e.preventDefault();
                this.$store.dispatch('addWord', this.word.getDto());
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

    .modal__createForm {
        display: flex;
        flex-direction: column;
    }

    .form__wrapper {
        width: 90%;
        margin: 0 auto;
        text-align: center;
    }

    .modal__inputs {
        display: flex;
        flex-direction: column;
        margin: 10px 0 20px;
    }

    .modal__inputs input {
        height: 30px;
        margin: 10px 0;
        outline: none;
        border: 1px solid #a6c2c3;
    }

    .modal__createButton {
        width: 100%;
        outline: none;
        border: 1px solid #a6c2c3;
        color: white;
        background-color: #e0c79c;
        padding: 5px 20px;
        cursor: pointer;
        border-radius: 3px;
    }

    .modal__createButton:hover, .img-input label:hover {
        color: black;
    }

    .img-input label{
        text-align: center;
        background: #e0c79c;
        border: 1px solid #a6c2c3;
        color: white;
        padding: 5px 40px;
        font-size: 13px;
        cursor: pointer;
    }

    input[type="file"] {
        display: none;
    }

</style>