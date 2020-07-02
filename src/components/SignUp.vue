<template>
    <div class="login_container">
        <div class="left_content">
            <!--<img src="../../public/images/main-image.jpg" alt="Picture">-->
        </div>
        <div class="right_content">
            <form class="login_form" @submit.prevent="submit">
                <h1>Welcome</h1>
                <div class="form_inputs">
                    <div class="input_container">
                        <input type="text" required="" v-model.trim="$v.form.name.$model"/>
                        <label>Name</label>
                        <svg>
                            <use xlink:href="#user"></use>
                        </svg>
                        <div class="error" v-if="$v.form.name.$error">
                            <template v-if="!$v.form.name.required">Field is required</template>
                            <template v-if="!$v.form.name.minLength">Field must have at least
                                {{$v.form.name.$params.minLength.min}} symbols
                            </template>
                        </div>
                    </div>

                    <div class="input_container">
                        <input type="email" required="" v-model.trim="$v.form.email.$model"
                               @input="clearServerError($v.form.$model, 'email')"/>
                        <label>Email</label>
                        <svg>
                            <use xlink:href="#email"></use>
                        </svg>
                        <div class="error" v-if="$v.form.email.$error">
                            <template v-if="!$v.form.email.required">Field is required</template>
                            <template v-if="!$v.form.email.email">This field needs to be a valid email</template>
                            <template v-if="$v.form.email.serverError === false">
                                {{form.serverErrors.email}}
                            </template>
                        </div>
                    </div>

                    <div class="input_container">
                        <input type="password" required="" autocomplete="on" v-model.trim="$v.form.password.$model"/>
                        <label>Password</label>
                        <svg>
                            <use xlink:href="#password"></use>
                        </svg>
                        <div class="error" v-if="$v.form.password.$error">
                            <template v-if="!$v.form.password.required">Field is required</template>
                            <template v-if="!$v.form.password.minLength">Field must have at least
                                {{$v.form.password.$params.minLength.min}} symbols
                            </template>
                        </div>
                    </div>
                </div>
                <div class="form_buttons">
                    <button type="submit" @click="login">Sign in</button>
                    <button type="submit" :disabled="$v.$invalid">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {required, minLength, email} from 'vuelidate/lib/validators';
    import merge from 'lodash-es/merge'

    const serverError = function (fieldName) {
        return (value, vm) => {
            return !(
                vm.hasOwnProperty("serverErrors") &&
                vm.serverErrors.hasOwnProperty(fieldName)
            );
        };
    };

    function removeProp(obj, propName) {
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                if (p === propName) {
                    delete obj[p];
                } else if (typeof obj[p] === "object") {
                    removeProp(obj[p], propName);
                }
            }
        }
        return obj;
    }

    export default {
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                },
                serverValidation: {},
                clientValidation: {
                    form: {
                        name: {
                            required,
                            minLength: minLength(3)
                        },
                        email: {
                            required,
                            email,
                        },
                        password: {
                            required,
                            minLength: minLength(6)
                        }
                    }
                },
            }
        },
        computed: {
            rules() {
                return merge({}, this.serverValidation, this.clientValidation);
            }
        },
        validations() {
            return this.rules;
        },
        methods: {
            login() {
                this.$router.push('/sign-in');
            },
            submit() {
                this.$v.$touch();
                this.clearServerErrors();

                if (this.$v.$invalid) {
                    alert("Form is invalid");
                } else {
                    const {name, email, password} = this.form;
                    this.$store.dispatch('signup', {name, email, password})
                        .then(() => {
                            this.$router.push('/');
                        })
                        .catch(error => {
                            const serverMessages = {
                                serverErrors: {
                                    email: error.message
                                }
                            };
                            merge(this.form, serverMessages);
                            this.serverValidation = {
                                form: {
                                    email: {
                                        serverError: serverError("email", false)
                                    }
                                }
                            }
                        });
                }

            },
            clearServerErrors() {
                this.serverValidation = {};
                removeProp(this.form, "serverErrors");
            },
            clearServerError(model, fieldName) {
                if (model.hasOwnProperty("serverErrors")) {
                    if (model.serverErrors.hasOwnProperty(fieldName)) {
                        delete model.serverErrors[fieldName];
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .error {
        color: orangered;
        font-size: 15px;
    }

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
        cursor: pointer;
    }

    .form_buttons button:hover {
        background-color: #98835f;
        color: white;
    }

    .form_buttons button:focus{
        outline: none;
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