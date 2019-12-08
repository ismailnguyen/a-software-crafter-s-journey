<template>
    <div>
        <span class="tag level-item" v-for="(tag, index) in article.tags" :key="index">
            {{ tag }}
        </span>
    </div>
</template>

<script>
    export default {
        props: ['article']
    }
</script>