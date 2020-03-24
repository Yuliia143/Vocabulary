<template>
    <div class="login_container">
        <div class="left_content">
            <!--<img src="../../public/images/main-image.jpg" alt="Picture">-->
        </div>
        <div class="right_content">
            <form class="login_form" @submit.prevent="login">
                <h1>Welcome</h1>
                <div class="form_inputs">
                    <div class="input_container">
                        <input type="text" required="" v-model="email"/>
                        <label>Email</label>
                        <svg>
                            <use xlink:href="#user"></use>
                        </svg>
                    </div>
                    <div class="input_container">
                        <input type="password" required="" v-model="password"/>
                        <label>Password</label>
                        <svg>
                            <use xlink:href="#password"></use>
                        </svg>
                    </div>
                </div>
                <div class="form_buttons">
                    <button type="submit" @click="login">Log in</button>
                    <button type="submit" @click="signup">Sign up</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "Login",
        // mounted() {
        //     if (localStorage.accessToken) {
        //         this.$store.commit('setAccessToken', localStorage.accessToken);
        //     }
        // },
        computed: {
            ...mapGetters([
                'getAccessToken',
                'getRefreshToken'
            ]),
            email: {
                get() {
                    return this.$store.getters.getEmail;
                },
                set(value) {
                    this.$store.commit('setEmail', value);
                }
            },
            password: {
                get() {
                    return this.$store.getters.getPassword;
                },
                set(value) {
                    this.$store.commit('setPassword', value);
                }
            }
        },
        methods: {
            login() {
                const {email, password} = this;
                this.$store.dispatch('login', {email, password});
            },
            signup(){
                const {email, password} = this;
                this.$store.dispatch('signup', {email, password});
            }
        }
    }
</script>

<style scoped lang="scss">
    .login_container {
        width: 80%;
        height: 90%;
        display: flex;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        box-shadow: 0 0 21px 3px rgba(120, 120, 120, 1);
    }

    .left_content {
        height: 100%;
        width: 55%;
        background: url("../../public/images/main-image.jpg") no-repeat;
        background-size: cover;
        background-position: right 0 bottom 20%;
        display: flex;
        flex: 0 1 55%;
    }

    .right_content {
        width: 45%;
        padding: 100px 0 30px;
        text-align: center;
        position: relative;
        display: flex;
        flex: 0 1 60%;
    }

    .login_form {
        padding: 0 50px 0;
        display: flex;
        flex-direction: column;
        width: 70%;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .login_form h1 {
        font-family: 'Cinzel', serif;
    }

    .form_inputs {
        display: flex;
        flex-direction: column;
        margin: 50px 0 10px;
    }

    .form_buttons {
        display: flex;
        justify-content: space-between;
    }

    .input_container input {
        border: 0;
        border-bottom: 1px solid #555;
        background: transparent;
        width: 100%;
        padding: 8px 0 5px 0;
        font-size: 16px;
    }

    .input_container {
        position: relative;
        margin-bottom: 25px;
    }

    .input_container label {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 14px;
        transition: all 0.5s ease-in-out;
    }

    .input_container input:focus {
        border: none;
        outline: none;
        border-bottom: 1px solid #98835f;
    }

    .input_container input:focus ~ label,
    .input_container input:valid ~ label {
        top: -12px;
        font-size: 14px;
        color: #98835f;
    }

    .input_container input:focus ~ svg {
        fill: #98835f;
    }

    .input_container svg {
        position: absolute;
        width: 25px;
        height: 21px;
        right: 3px;
        top: 5px;
    }

    .form_buttons button {
        background-color: #c4c1c6;
        padding: 10px 30px;
        border: none;
    }

    .form_buttons button:hover {
        background-color: #98835f;
        color: white;
    }

    @media (max-width: 767px) {
        .login_container {
            width: 100%;
            height: 100%;
            flex-direction: column;
            box-shadow: none;
            top: 0;
            left: 0;
            transform: translate(0, 0);
        }
        .left_content {
            width: 100%;
            background-position: center;
        }
        .right_content {
            width: 100%;
            padding: 0;
            margin-top: -50px;
        }
        .login_form {
            margin-bottom: 20px;
            padding: 0 25px 0;
        }
        .form_inputs {
            margin: 10px 0;
        }
    }

    @media (min-width: 767px) and (max-width: 1199px) {
        .left_content {
            width: 60%;
            background-position: center;
            display: flex;
            flex: 0 1 60%;
        }
        .right_content {
            width: 40%;
            display: flex;
            flex: 0 1 61%;
        }
    }
</style>