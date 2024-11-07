<template>
  <nav :class="['c-navbar', 'w-full', 'flex', 'bg-primary-base', 'fixed',  isExpanded ? 'h-auto' : 'h-16']">
    <div class="container flex flex-col lg:flex-row justify-between items-center w-full">
      <div class="navbar-header flex items-center w-full lg:w-auto sm: mt-3 lg:mt-0">
        <!-- Toggle Button for Mobile -->
        <button
          type="button"
          class="navbar-toggle flex flex-col items-center p-2 lg:hidden ml-2"
          @click="isExpanded = !isExpanded"
          :aria-expanded="isExpanded"
          aria-controls="navbar"
        >
          <span class="icon-bar w-6 h-1 bg-white mb-1"></span>
          <span class="icon-bar w-6 h-1 bg-white mb-1"></span>
          <span class="icon-bar w-6 h-1 bg-white"></span>
        </button>

        <router-link to="/" class="navbar-brand flex items-center ml-1">
          <img :src="$assets.logo" class="w-56" alt="Cuidando do Meu Bairro" />
          <span class="beta-mark text-white uppercase text-sm font-bold">São Paulo</span>
        </router-link>
      </div>

      <!-- Navbar Menu -->
      <div
        id="navbar"
        :class="[
          'text-white font-semibold text-sm',
          isExpanded ? 'flex flex-col mt-4 mb-4' : 'hidden',
          'lg:flex lg:flex-row lg:items-center'
        ]"
      >

        <ul class="nav navbar-nav navbar-right flex flex-col gap-4 lg:gap-0 lg:flex-row items-center">
          <li>
            <router-link class="p-4 mx-1 hover:bg-primary-dark hover:bg-opacity-80 hover:rounded" to="/sobre">{{ $t('About') }}</router-link>
          </li>
          <li>
            <router-link class="p-4 mx-1 hover:bg-primary-dark hover:bg-opacity-80 hover:rounded" to="/glossario">Aprenda +</router-link>
          </li>
          <li>
            <router-link class="p-4 mx-1 hover:bg-primary-dark hover:bg-opacity-80 hover:rounded" to="/analises">{{ $t('Analysis') }}</router-link>
          </li>
          <li>
            <a href="http://blog.cuidando.vc" class="p-4 mx-1 hover:bg-primary-dark hover:bg-opacity-80 hover:rounded" target="_blank">Blog</a>
          </li>
          <li v-if="username" class="relative">
            <!-- User Button for Profile and Logout -->
            <button @click="toggleListUser" class="text-white bg-transparent border border-white px-2 py-2 rounded">
              {{ username }}
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-if="openUserList" class="absolute z-10 bg-primary-base w-48 mt-2 rounded shadow-lg">
              <ul>
                <li>
                  <router-link class="block px-4 py-2 hover:bg-primary-dark" :to="{ name: 'pessoa', params: { viewingUser: username } }">
                    Perfil
                  </router-link>
                </li>
                <li>
                  <a class="block px-4 py-2 hover:bg-primary-dark cursor-pointer" @click="sendLogout">{{ $t("Logout") }}</a>
                </li>
              </ul>
            </div>
          </li>
          <li v-if="!username">
            <a @click="openLoginModal" class="px-4 py-2 border border-white rounded">{{ $t("Login") }}</a>
          </li>
          <li v-if="year">
                <styled-select class="btn-select-year" :options="optionYear" :value="parseInt(year)" @input="selectedYear"/>
              </li>
              <!-- <li>
                <styled-select 
                  class="year-selector separated-caret"
                  :options="options"
                  :value="parseInt(year)"
                  @input="selected"
                />
              </li> -->
        </ul>
      </div>
    </div>
    <modal-box modal-id="login">
          <login-form />
      </modal-box>
  </nav>
</template>


<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import LoginForm from '@/components/LoginForm.vue'
import ModalBox from '@/components/ModalBox.vue'
import StyledSelect from '@/components/StyledSelect.vue'

export default {
  name: 'main-menu',
  components: {
    LoginForm,
    ModalBox,
    StyledSelect
  },
  data () {
    return {
      langs: [
        { key: 'pt-br', value: 'Português' },
        { key: 'en', value: 'English' }
      ],
      isExpanded: false,
      openUserList: false
    }
  },
  computed: {
    shareLink () {
      let page = encodeURIComponent(location.origin + this.$route.fullPath)
      return `http://www.facebook.com/sharer.php?u=${page}`
    },
    optionYear () {
      return this.years.map((x) => { return { key: x, value: x } })
    },
    ...mapState({
      username: state => state.auth.username,
      years: state => state.money.years,
      year: state => state.route.params.year
    })
  },
  mounted () {
    this.getYears()
  },
  methods: {
    closeExpanded () {
      this.isExpanded = false
    },
    openLoginModal (event) {
      this.closeExpanded()
      this.openModal('login')
    },
    selectedLang (lang) {
      this.closeExpanded()
      this.$i18n.locale = lang
    },
    toggleListUser() {
      this.closeExpanded()
      this.openUserList = !this.openUserList
    },
    closeListUser () {
      this.openUserList = false
    },
    sendLogout () {
      this.closeExpanded()
      this.logout()
    },
    selectedYear (year) {
      this.$router.push({ name: 'home', params: { year } })
    },
    ...mapActions(['logout','getYears']),
    ...mapMutations(['openModal'])
  }
}
</script>

<style lang="scss" scoped>
  .c-navbar {
    z-index: 2000;
  }
  .navbar-brand{
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .navbar-brand > img {
  display: inline-block;
  }
  ::v-deep{ 
    .btn-select-year > *{
      color: #fff;
      border-color: #fff;
      padding: 0.5rem;
      margin: auto 1rem;
      justify-content: space-around;
    }
  }
</style>
