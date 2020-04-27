
<template>
    <footer class="footer has-background-light">
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
                companyName: process.env.companyName
            }
        },
        computed: {
            currentYear: function () {
                return new Date().getFullYear();
            }
        }        
    }
</script>