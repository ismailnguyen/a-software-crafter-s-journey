
<template>
    <footer class="footer has-background-light">
        <div class="content has-text-centered">
            &copy; {{ currentYear }}
            <br>
            <small>A Software Crafter's Journey</small> <strong>x</strong> <small>La Combe du Lion Vert</small>
        </div>
    </footer>
</template>

<script>
    export default {
        computed: {
            currentYear: function () {
                return new Date().getFullYear();
            }
        }        
    }
</script>