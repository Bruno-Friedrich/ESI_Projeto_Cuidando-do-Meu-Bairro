<template>
    <nav class="c-navbar w-full h-16 flex items-center bg-primary-base fixed">
      <div class="container my-0 flex justify-between">
        <div class="navbar-header flex">
          <button type="button menu-mobile"
                  class="navbar-toggle collapsed"
                  @click="isExpanded = !isExpanded"
                  data-toggle="collapse"
                  data-target="#navbar"
                  :aria-expanded="isExpanded"
                  aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
          </button>
          <router-link to="/" id="home-button" class="navbar-brand">
            <img :src="$assets.logo" class="w-56" alt="Cuidando do Meu Bairro" />
            <span class="beta-mark text-white uppercase text-sm font-bold align-top">São Paulo</span>
          </router-link>
         
        </div>
        <div id="navbar"
              :class="{ collapse: true, 'navbar-collapse': true, in: isExpanded }"
              class="text-white font-semibold text-sm flex items-center">
            <ul class="nav navbar-nav navbar-right flex items-center">
              <li>
                <router-link class="p-4 mx-1 hover:py-2 hover:bg-primary-dark hover:bg-opacity-80 hover:rounded" to="/sobre">{{ $t('About') }}</router-link>
              </li>
              <li>
                <router-link class="p-4 mx-1 hover:py-2 hover:bg-primary-dark hover:bg-opacity-80 hover:rounded" to="/glossario">Aprenda +</router-link>
              </li>
              <li>
                <router-link class="p-4 mx-1 hover:py-2 hover:bg-primary-dark hover:bg-opacity-80 hover:rounded" to="/analises">{{ $t('Analysis') }}</router-link>
              </li>
              <li>
                <a href="http://blog.cuidando.vc" class="p-4 mx-1 hover:py-2 hover:bg-primary-dark hover:bg-opacity-80 hover:rounded" target="_blank">Blog</a>
              </li>
              <li v-if="username">
                <button
                  class="text-white bg-transparent border border-white font-medium rounded text-sm w-full px-2 py-2 text-center inline-flex items-center justify-between"
                  type="button"
                  v-click-outside="closeListUser"
                  @click="toggleListUser"
                >
                  {{ username }}
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div v-if="openUserList" class="absolute z-10 overflow-scroll scroll-smooth bg-primary-base divide-y divide-primary-dark rounded shadow w-48">
                    <ul class="py-1 text-sm text-white">
                      <li>
                        <router-link class="block px-4 py-2 hover:bg-primary-dark cursor-pointer" :to="{ name: 'pessoa', params: { viewingUser: username } }">
                          Perfil
                        </router-link>
                      </li>
                      <li>
                        <a class="block px-4 py-2 hover:bg-primary-dark cursor-pointer" @click="sendLogout" >
                          {{ $t("Logout") }}
                        </a>
                      </li>
                    </ul>
                </div>
              </li>
              <li v-if="!username">
                <a @click="openLoginModal" class="px-4 mx-1 cursor-pointer py-2 border border-white hover:bg-primary-dark rounded">
                {{ $t("Login") }}
                </a>
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
