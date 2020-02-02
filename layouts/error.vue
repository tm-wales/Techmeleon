<template>
    <div class="page">
        <div class="under-construction center">
            <p>Our website is currently under construction while we prioritise clients.</p>
            <p>Follow our own website development by checking back in a few days!</p>
            <p>Alternatively you can contact us directly via the link below:</p>
            <br>
            <nuxt-link to="/contact" class="btn">
                Contact
            </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        error: {
            type: Number,
            required: true
        }
    },
    mounted() {
        const boom = document.getElementsByClassName('app')[0]
        setTimeout(() => {
            if (typeof boom !== 'undefined') {
                boom.classList.remove('transition')
            }
        }, 1000)
    }
}
</script>

<script>
export default {
    props: {
        error: {
            type: Number,
            required: true
        }
    },
    mounted() {
        const boom = document.getElementsByClassName('app')[0]
        setTimeout(() => {
            if (typeof boom !== 'undefined') {
                boom.classList.remove('transition')
            }
        }, 1000)
    }
}
</script>
