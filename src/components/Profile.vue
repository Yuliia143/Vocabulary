<template>
    <div class="container">
        <div class="user__info">
            <div class="user__photo">
                <div class="photo__wrapper">
                    <img src="../../public/images/profile.jpg" alt="Photo">
                </div>
            </div>
            <div class="user__info">
                <div class="user__block mainInfo">
                    <h2>Basic information</h2>
                    <div class="user__mainInfo">
                        <div class="user__row">
                            <p>Full name:</p>
                            <p>{{this.getUser.name}}</p>
                            <button>
                                <svg>
                                    <use xlink:href="#edit"></use>
                                </svg>
                            </button>
                        </div>
                        <div class="user__row">
                            <p>Email address:</p>
                            <p>{{this.getUser.email}}</p>
                            <button>
                                <svg>
                                    <use xlink:href="#edit"></use>
                                </svg>
                            </button>
                        </div>
                        <div class="user__row">
                            <p>Password:</p>
                            <p>{{this.getUser.password}}</p>
                            <button>
                                <svg>
                                    <use xlink:href="#edit"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="user__block additionalInfo">
                    <h2>Additional information</h2>
                    <div class="user__mainInfo">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Profile",
        computed: {
            ...mapGetters([
                'getUser',
            ]),
        }
    }
</script>

<style scoped>
    .container {
        width: 90%;
        margin: 24px auto;
    }

    .user__photo {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .photo__wrapper {
        max-width: 300px;
    }

    .user__photo img {
        border-radius: 50%;
        width: 100%;
        height: auto;
    }

    .user__info {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
    }

    .user__block {
        display: flex;
        flex-direction: column;
        width: 40%;
    }

    .user__block h2 {
        text-align: center;
        font-weight: lighter;
    }

    .user__block:nth-child(odd) {
        margin-right: 50px;
    }

    .user__mainInfo {
        display: flex;
        flex-direction: column;
        padding: 10px 20px;
        border: 1px solid #a6c2c3;
    }

    .user__row {
        display: flex;
    }

    .user__row > *:first-child {
        width: 25%;
        margin-right: 40px;
    }

    .user__row > *:nth-child(2) {
        /*border-bottom: 1px solid #98835f;*/
        text-decoration: underline;
        text-decoration-color: #98835f;
        margin-right: 10px;
    }

    .user__row svg{
        width: 20px;
        height: 20px;
    }

    button {
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
    }


    @media (max-width: 767px) {
        .user__block{
            width: 100%;
        }
        .user__block:first-child{
            margin-right: 0;
        }
    }

</style>