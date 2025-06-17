<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <button
        @click="login"
         class="bg-blue-500 text-white p-4 rounded-2xl cursor-pointer"
         >login with google</button>
    </div>

</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
async function login(){
    const {error}= await supabase.auth.signInWithOAuth({
        provider: 'google',
    });
    if(error){
        console.error('Login failed:', error.message)
    } else {
        console.log('Login successful')
        
    }
}

const user= useSupabaseUser()
</script>

<style scoped>

</style>