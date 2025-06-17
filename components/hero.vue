<template>
  <div class="hero-carousel">
    <Carousel 
      :value="images" 
      :numVisible="1" 
      :numScroll="1" 
      circular 
      :autoplayInterval="4000"
      :showIndicators="true"
    >
      <template #item="{data}">
        <div class="relative w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden mt-10">
          <!-- Improved Image with Fallback -->
          <img
            :src="data.url"
            :alt="data.alt"
            class="object-cover w-full h-full transition-opacity duration-500  hover:opacity-95"
            loading="lazy"
            @error="handleImageError(data)"
          />
          <!-- Enhanced Overlay -->
          <div 
            v-if="data.caption" 
            class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end pb-10 justify-center"
          >
            <h2 class="text-white text-2xl md:text-4xl font-bold px-4 text-center">
              {{ data.caption }}
            </h2>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import Carousel from 'primevue/carousel';
import 'primevue/resources/themes/saga-blue/theme.css';


const images = ref([
  {
    url: "https://alhafidh.com/cdn/shop/files/Washing-Machines-Promotion-Mobile-a_2048x.jpg?v=1691761639",
  },
  {
    url: "https://ansons.ph/wp-content/uploads/2022/03/lg_digital_ansons-web_-01-main-banner-scaled.jpg",

  },
  {
    url: "https://s3.elryan.com/cms/large_eng_1_0e66ee6e8b.png",
  }
]);

// Handle broken images
const handleImageError = (data: any) => {
  console.error(`Failed to load image: ${data.url}`);
  // Fallback to placeholder if available
  if (!data.url.includes('placeholder')) {
    data.url = 'https://via.placeholder.com/1500x500?text=Image+Not+Available';
  }
};
</script>

<style scoped>
.hero-carousel {
  max-width: 1800px;
  margin: 0 auto;
  border-radius: 0.5rem;
}

/* Smooth transitions */
.p-carousel-item {
  transition: transform 0.3s ease;
}

/* Custom indicator styling */
:deep(.p-carousel-indicators .p-link) {
  background-color: rgba(255,255,255,0.5) !important;
}

:deep(.p-carousel-indicators .p-highlight .p-link) {
  background-color: white !important;
}
</style>