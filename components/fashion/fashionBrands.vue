<template>
  <div class="py-8 bg-gray-50">
    <h1 class="text-3xl md:text-2xl font-bold ml-4 text-gray-800 mb-6">
      Shop by Fashion Brand
    </h1>

    <Carousel
      :value="fashionBrands"
      :numVisible="4"
      :numScroll="2"
      circular
      :autoplayInterval="2500"
      :responsiveOptions="responsiveOptions"
    >
      <template #item="{ data }">
        <NuxtLink
          :to="`/brands/${data.name.toLowerCase()}`"
          :aria-label="`View ${data.name} products`"
          class="block h-full"
        >
          <div
            class="flex items-center justify-center mx-2 h-32 rounded-lg shadow p-4 transition transform duration-300 hover:scale-105
            bg-cover bg-[url('https://img.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg')]"
          >
            <img
              :src="data.logo || '/fallback-logo.png'"
              :alt="data.name"
              loading="lazy"
              class="h-20 object-contain"
            />
          </div>
        </NuxtLink>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
const fashionBrands = [
  {
    name: "Gucci",
    logo: "https://images.seeklogo.com/logo-png/6/2/gucci-logo-png_seeklogo-64069.png"
  },
  {
    name: "Lacoste",
    logo: "https://d2bzx2vuetkzse.cloudfront.net/fit-in/0x450/unshoppable_producs/749ae0d7-3a3c-44a3-8926-b7bdc2eb0ade.png"
  },
  {
    name: "Polo",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/Ralph_Lauren_Logo.png"
  },
  {
    name: "DeFacto",
    logo: "https://files.sikayetvar.com/lg/cmp/28/289966.png?1695584475"
  },
  {
    name: "Zara",
    logo: "https://download.logo.wine/logo/Zara_(retailer)/Zara_(retailer)-Logo.wine.png"
  },
  {
    name: "LC Waikiki",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/LC_Waikiki_logo.svg/2560px-LC_Waikiki_logo.svg.png"
  },
  {
    name: "Nike",
    logo: "https://purepng.com/public/uploads/large/purepng.com-nike-logologobrand-logoiconslogos-2515199407298sbym.png"
  },
  {
    name: "Puma",
    logo: "https://companieslogo.com/img/orig/PUM.DE_BIG-3030b719.png?t=1720244493"
  },
  {
    name: "Adidas",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Adidas_logo.png"
  },
];

const responsiveOptions = [
  {
    breakpoint: '1024px',
    numVisible: 4,
    numScroll: 2
  },
  {
    breakpoint: '768px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '560px',
    numVisible: 1,
    numScroll: 1
  }
];
</script>
