<template>
  <footer class="c-footer bottom-0 bg-gray-700">
    <div class="container flex flex-col md:flex-row items-center justify-between w-full h-auto md:h-20 p-4">
      <router-link to="/" id="home-button" class="navbar-brand mb-4 md:mb-0">
        <img :src="$assets.logo" class="w-40 md:w-56" alt="Cuidando do Meu Bairro" />
      </router-link>
      <div class="flex flex-col md:flex-row items-center md:items-start">
        <div class="flex flex-col md:flex-row items-center md:items-start mb-4 md:mb-0">
          <router-link class="mr-0 md:mr-5 underline text-white text-xs hover:text-secondary-light hover:bg-opacity-80 hover:rounded mb-2 md:mb-0" to="/termos-de-uso">
            Termos de Uso
          </router-link>
          <a class="mr-0 md:mr-5 underline text-white text-xs hover:text-secondary-light hover:bg-opacity-80 hover:rounded mb-2 md:mb-0" href="https://gitlab.com/cuidandodomeubairro">
            Gitlab
          </a>
          <a class=" md:mr-5 underline text-white text-xs hover:text-secondary-light hover:bg-opacity-80 hover:rounded" href="mailto:ola@cuidando.vc">
            E-mail
          </a>
        </div>
        <div>
          <img :src="$assets.cc" class="w-16 md:w-20 inline-block" alt="Cuidando do Meu Bairro" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>
