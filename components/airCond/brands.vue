<template>
  <div class="py-8 bg-gray-50">
  <h1 class="text-3xl md:text-2xl font-bold ml-4 text-gray-800 mb-6">
  Buy Your AC by Brand
  </h1>

    <Carousel
      :value="brands"
      :numVisible="4"
      :numScroll="2"
      circular
      :autoplayInterval="2500"
      :responsiveOptions="responsiveOptions"
    >
      <template #item="{ data }">
        <NuxtLink
          :to="`/brands/${data.name}`"
          :aria-label="`View ${data.name} products`"
          class="block h-full"
        >
          <div class="flex items-center justify-center mx-2 h-32 rounded-lg shadow p-4 transition transform duration-300  hover:scale-120
           bg-cover bg-[url(https://img.freepik.com/free-vector/christmas-background-with-snowflake-border-design_1048-19561.jpg)] ">
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
const brands = [
  {
    name: "samsung",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/1280px-Samsung_Logo.svg.png"
  },
  {
    name: "lg",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/LG_logo_%282014%29.svg/2560px-LG_logo_%282014%29.svg.png"
  },
  {
    name: "midea",
    logo: "https://brandlogos.net/wp-content/uploads/2014/12/midea-logo_brandlogos.net_a826s.png"
  },
  {
    name: "alhafidh",
    logo: "https://cdn.miswag.me/images/images/miswag_2kTfaC.jpg"
  },
  {
    name: "gree",
    logo: "https://www.cdnlogo.com/logos/g/61/gree-electric-appliances.svg"
  },
  {
    name: "tosot",
    logo: "https://1000logos.net/wp-content/uploads/2020/09/Tosot-Logo.png"
  }
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
