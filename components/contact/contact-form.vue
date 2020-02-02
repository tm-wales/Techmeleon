<template>
    <div class="contact-form">
        <transition name="fade" mode="out-in">
            <div
                v-if="sectionNumber === 1"
                key="1"
                class="contact-form__section"
            >
                <div class="contact-form__section__title">
                    Contact Details
                </div>

                <form class="contact-form__form">
                    <div class="contact-form__group" :class="{ 'contact-form__group--error': $v.name.$error }">
                        <input
                            id="name"
                            v-model.trim="$v.name.$model"
                            name="name"
                            placeholder="Name*"
                            type="text"
                            required
                            class="contact-form__input"
                            title="Your name"
                        >
                        <label for="name" class="contact-form__label">
                            Name*
                            <span v-if="$v.name.$error"> - </span> <!-- eslint-disable-line -->
                            <span v-if="!$v.name.required" class="contact-form__input--error">
                                Field is required
                            </span> <!-- eslint-disable-line -->
                            <span v-if="!$v.name.minLength" class="contact-form__input--error">
                                Name must have at least {{ $v.name.$params.minLength.min }} letters.
                            </span>
                        </label>
                    </div>
                    <div class="contact-form__group">
                        <input
                            id="company"
                            v-model.trim="$v.company.$model"
                            name="company"
                            placeholder="Company"
                            type="text"
                            class="contact-form__input"
                            title="Your Company name"
                        >
                        <label for="company" class="contact-form__label">
                            Company
                        </label>
                    </div>
                    <div class="contact-form__group" :class="{ 'contact-form__group--error': $v.email.$error }">
                        <input
                            id="email"
                            v-model.trim="$v.email.$model"
                            name="email"
                            placeholder="Email*"
                            required
                            type="email"
                            class="contact-form__input"
                            title="Your Email"
                        >
                        <label for="email" class="contact-form__label">
                            Email*
                            <span v-if="$v.email.$error"> - </span> <!-- eslint-disable-line -->
                            <span v-if="!$v.email.required" class="contact-form__input--error">
                                Field is required
                            </span> <!-- eslint-disable-line -->
                            <span v-if="!$v.email.email" class="contact-form__input--error">
                                Must be a valid email address
                            </span> <!-- eslint-disable-line -->
                        </label>
                    </div>
                    <div class="contact-form__group">
                        <input
                            id="telephone"
                            v-model.trim="$v.telephone.$model"
                            type="text"
                            name="telephone"
                            placeholder="Telephone"
                            class="contact-form__input"
                            title="Your Telephone number"
                        >
                        <label for="telephone" class="contact-form__label">
                            Telephone
                        </label>
                    </div>
                </form>

                <div class="next">
                    <div class="back hide" @click="sectionNumber -= 1">
                        <span>Back</span>
                    </div>
                    <div class="forward" :disabled="formInvalid" @click="!formInvalid ? sectionNumber += 1 : sectionNumber -= 0">
                        <span>Next</span>
                    </div>
                </div>
            </div>
            <div
                v-if="sectionNumber === 2"
                key="2"
                class="contact-form__section"
            >
                <div class="contact-form__section__title">
                    Project Details
                </div>
                <form class="contact-form__form">
                    <div class="contact-form__group">
                        <select
                            id="solution"
                            v-model.trim="$v.service.$model"
                            name="service"
                            placeholder="Select a solution"
                            class="contact-form__input"
                            title="Select a solution"
                        >
                            <option value disabled selected>
                                Select a solution
                            </option>
                            <option
                                v-for="(solution, index) in getSolutions"
                                :key="index"
                                :value="solution.short"
                            >
                                {{ solution.name }}
                            </option>
                        </select>
                    </div>
                    <div class="contact-form__group">
                        <select
                            id="budget"
                            v-model.trim="$v.budget.$model"
                            name="budget"
                            class="contact-form__input"
                            title="Select a budget"
                        >
                            <option value disabled selected>
                                Select your budget range
                            </option>
                            <option value="small">
                                £1,000 to £4,000
                            </option>
                            <option value="medium">
                                £4,000 to £10,000
                            </option>
                            <option value="large">
                                £10,000 +
                            </option>
                        </select>
                    </div>
                    <div class="contact-form__group textarea">
                        <textarea
                            v-model.trim="$v.message.$model"
                            rows="4"
                            class="contact-form__input"
                            title="Leave us a message"
                        >Describe your project and objectives</textarea>
                    </div>
                </form>
                <div class="next">
                    <div class="back" @click="sectionNumber -= 1">
                        <span>Back</span>
                    </div>
                    <div class="forward" @click="sectionNumber += 1">
                        <span>Next</span>
                    </div>
                </div>
            </div>

            <div
                v-if="sectionNumber === 3"
                key="3"
                class="contact-form__section"
            >
                <div class="contact-form__section__title">
                    Almost done!<br>Just book a callback time if you wish
                </div>
                <datetime
                    v-model.trim="$v.date.$model"
                    type="datetime"
                    :class="{off: date !== ''}"
                    title="Book a date & time"
                />
                <div class="next">
                    <div class="back" @click="sectionNumber -= 1">
                        <span>Back</span>
                    </div>
                    <div class="forward" @click="sendMail">
                        <span>Send!</span>
                    </div>
                </div>
            </div>
            <div
                v-if="sectionNumber === 4"
                key="4"
                class="contact-form__section"
            >
                <div class="please-wait" />
                <div class="contact-form__section__title finished" v-html="returnMessage" />  <!-- eslint-disable-line -->
            </div>
        </transition>
    </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            sectionNumber: 1,
            inprogress: false,
            returnMessage: 'Sent!<br>We will send a confirmation Soon!',
            name: '',
            email: '',
            company: '',
            telephone: '',
            service: '',
            budget: '',
            message: '',
            date: ''
        }
    },
    validations: {
        name: {
            required,
            minLength: minLength(4)
        },
        email: {
            required,
            email
        },
        company: {},
        telephone: {},
        service: {},
        budget: {},
        message: {},
        date: {}
    },
    computed: {
        getSolutions() {
            return this.$store.state.solutions.list
        },
        formInvalid() {
            this.$v.$touch()
            return this.$v.$invalid
        }
    },
    methods: {
        sendMail() {
            this.sectionNumber += 1
            if (!this.inprogress) {
                const _this = this
                const url =
                    window.location.href.replace(window.location.pathname, '') +
                    '/api/contact'
                this.inprogress = true
                console.log(url) //eslint-disable-line
                this.$axios
                    .$post(url, {
                        data: {
                            name: this.name,
                            email: this.email,
                            company: this.company,
                            telephone: this.telephone,
                            service: this.service,
                            budget: this.budget,
                            message: this.message,
                            date: this.date
                        }
                    })
                    .then(response => {
                        console.log(response) //eslint-disable-line
                        if (response.message !== 'Success') {
                            this.returnMessage =
                                'Submission failed!<br>Please contact us directly.'
                        }
                        this.returnMessage =
                            'Sent!<br>We will send a confirmation Soon!'
                        _this.inprogress = false
                    })
                    .catch(err => {
                        this.returnMessage =
                            'Submission failed!<br>Please contact us directly.'
                        _this.inprogress = false
                        console.log(err) //eslint-disable-line
                    })
            }
        }
    }
}
</script>
