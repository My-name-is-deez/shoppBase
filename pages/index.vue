<template>
    <div>
        <hero/>
        <categorys/>
        <phoneHero/>
        <phoneCarousel/>
        <acHero/>
        <brands/>
        <productCarousel/>
        <tvHero/>
        <tvCarousel/>
        <fashionHero/>
        <fashionBrands/>
        <FashionCarousel/>
        <pList/>
    </div>
</template>

<script setup lang="ts">

const productStore= useProductsStore();
onMounted(async()=>{
  await  productStore.fetchProducts();
})

</script>

<style scoped>

</style>