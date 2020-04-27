
<template>
    <footer class="footer" :style="`background-color: ${ backgroundColor } !important;`">
        <div class="content has-text-centered">
            &copy; {{ currentYear }}
            <br>
            <small>{{ siteName }}</small> <strong>x</strong> <small>{{ companyName }}</small>
        </div>
    </footer>
</template>

<script>
    export default {
        data() {
            return {
                siteName: process.env.siteName,
                companyName: process.env.companyName,
                backgroundColor: process.env.bodyBackgroundColor
            }
        },
        computed: {
            currentYear: function () {
                return new Date().getFullYear();
            }
        }        
    }
</script>