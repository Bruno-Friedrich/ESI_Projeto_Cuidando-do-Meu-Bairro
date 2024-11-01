<template>
  <div>
    <div class="modal-body py-5">
      <transition name="fade" mode="out-in">
        <p v-if="view === 'forgot2'">
            {{ $t('login_form_use_reset_code', { minutes: expResetCode / 60 }) }}
        </p>
      </transition>
        <form class="form px-6 pb-4 lg:px-8 sm:pb-6 xl:pb-8">
          <h3 class="text-xl font-medium text-neutral-base">Acesse nossa plataforma</h3>

          <!-- Username -->
          <div class="form-group mt-5">
            <label for="login-form-username" class="block mb-2 text-sm font-medium text-neutral-base">{{ $t('Username') }}</label>
            <input type="text"
              :class="['form-control lg', checkFieldError('username')]"
              class="bg-gray-50 border border-gray-300 text-neutral-base text-sm rounded-lg focus:ring-primary-dark focus:border-primary-dark block w-full p-2.5" 
              id="login-form-username"
              ref="username"
              v-model="username"
              :placeholder="$t('Username')"
            />
          </div>

           <!-- Password -->
          <transition name="fade" mode="out-in">
            <div class="form-group mt-3" v-if="view !== 'forgot1'">
                <label class="block mb-2 text-sm font-medium text-neutral-base" for="login-form-password">
                    {{ $t('Password') }}
                </label>
                <input type="password"
                  :class="['form-control', checkFieldError('password')]"
                  class="bg-gray-50 border border-gray-300 text-neutral-base text-sm rounded-lg focus:ring-primary-dark focus:border-primary-dark block w-full p-2.5"
                  id="login-form-password"
                  v-model="password"
                  :placeholder="$t('Password')"
                />
            </div>
          </transition>

          <!-- Confirm Password -->
            <transition name="fade" mode="out-in">
              <div class="form-group mt-3" v-if="view === 'register' || view === 'forgot2'">
                <label class="block mb-2 text-sm font-medium text-neutral-base" for="login-form-confirm-password">
                    {{ $t('Confirm Password') }}
                </label>
                <input type="password"
                  :class="['form-control', checkFieldError('confirm-password')]"
                  id="login-form-confirm-password"
                  class="bg-gray-50 border border-gray-300 text-neutral-base text-sm rounded-lg focus:ring-primary-dark focus:border-primary-dark block w-full p-2.5"
                  v-model="passwordConf"
                  :placeholder="$t('Confirm Password')"
                />
              </div>
          </transition>

          <!-- Email -->
          <transition name="fade" mode="out-in">
            <div class="form-group mt-3" v-if="view !== 'login'">
              <label class="block mb-2 text-sm font-medium text-neutral-base" for="login-form-email">
                  {{ $t('E-mail') }}
              </label>
              <input type="email"
                :class="['form-control', checkFieldError('email')]"
                class="bg-gray-50 border border-gray-300 text-neutral-base text-sm rounded-lg focus:ring-primary-dark focus:border-primary-dark block w-full p-2.5"
                id="login-form-email"
                v-model="email"
                :placeholder="$t('E-mail')"
              />
            </div>
          </transition>

          <!-- Reset Code -->
          <transition name="fade" mode="out-in">
            <div class="form-group mt-3" v-if="view === 'forgot2'">
              <label class="block mb-2 text-sm font-medium text-neutral-base" for="login-form-code">
                  {{ $t("Code") }}
              </label>
              <input type="text"
                :class="['form-control', checkFieldError('code')]"
                class="bg-gray-50 border border-gray-300 text-neutral-base text-sm rounded-lg focus:ring-primary-dark focus:border-primary-dark block w-full p-2.5"
                id="login-form-code"
                autocomplete="off"
                v-model="code"
                :placeholder="$t('Code')"
              />
            </div>
          </transition>

          

          <div class="mt-3 flex justify-between text-sm font-medium text-neutral-base">
            <div class="text-sm font-medium text-neutral-base">
              <span v-if="view === 'login'">Não registrado?</span>
              <a class="text-primary-base cursor-pointer hover:underline" @click="view = 'register'" v-if="view === 'login'">
                {{ $t('Register') }}
              </a>
            </div>
            <div>
              <a class="text-primary-base cursor-pointer hover:underline" @click="view = 'forgot1'" v-if="view === 'login'">
                {{ $t('Forgot password') }}?
              </a>
            </div>       
          </div>

          <!-- Login Button Submit -->
          <transition name="fade" mode="out-in">
            <button-spinner
              v-if="view === 'login'"
              type="submit"
              class="w-full mt-5 text-white cursor-pointer bg-secondary-light hover:bg-secondary-base focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              @click.prevent.native="sendLogin"
              :condition="pending.username"
              :disabled="anyEmpty(username, password)">
                {{ $t('Login') }}
            </button-spinner>

            <!-- Request Register -->
            <button-spinner
              v-if="view === 'register'"
              type="submit"
              class="w-full mt-5 cursor-pointer text-white bg-secondary-light hover:bg-secondary-base focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              @click.prevent.native="sendRegister"
              :condition="pending.username"
              :disabled="anyEmpty(username, password, passwordConf, email)">
                {{ $t('Register') }}
            </button-spinner>

            <!-- Request Reset Code -->
            <button-spinner
              v-if="view === 'forgot1'"
              type="submit"
              class="w-full mt-5 cursor-pointer text-white bg-secondary-light hover:bg-secondary-base focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              @click.prevent.native="sendForgot"
              :condition="pending.expResetCode"
              :disabled="anyEmpty(username, email)">
              {{ $t('Request reset code') }}
            </button-spinner>

            <!-- Request Reset -->
            <button-spinner
              v-if="view === 'forgot2'"
              type="submit"
              class="w-full mt-5 cursor-pointer text-white bg-secondary-light hover:bg-secondary-base focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              @click.prevent.native="sendReset"
              :disabled="anyEmpty(username, password, passwordConf, email, code)">
              {{ $t('Change password and login') }}
            </button-spinner>
          </transition>
        </form>

        <transition name="fade" mode="out-in">
        <!-- Error messages -->
        <p v-if="errorData" class="px-6 pb-4 lg:px-8 sm:pb-6 xl:pb-8 text-sm text-red-600">
          {{ $t(errorData.message) }}
        </p>
      </transition>
        
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'login-form',
  data () {
    return {
      view: 'login',
      username: '',
      password: '',
      passwordConf: '',
      code: '',
      email: ''
    }
  },
  computed: {
    ...mapState({
      pending: state => state.auth.pending,
      expResetCode: state => state.auth.expResetCode,
      errorData: state => state.auth.errorData
    })
  },
  mounted () {
    this.clearError()
    this.$refs.username.focus()
  },
  methods: {
    anyEmpty (...args) {
      for (let arg of args) {
        if (!arg.length) return true
      }
      return false
    },
    clearError () {
      this.setAuthError(null)
    },
    changeView (view, event) {
      this.clearError()
      this.view = {}
      this.view[view] = true
      // TODO precisa?
      // acme to avoid closing modal
      // if (event) event.ignoreEvent = true
    },
    checkFieldError (field) {
      if (this.errorData && this.errorData.fields.includes(field)) {
        return 'incorrect-field'
      } else return ''
    },
    async sendLogin () {
      try {
        await this.loginUser({ data: { username: this.username, password: this.password } })
        this.closeModal()
      } catch (e) {}
    },
    async sendRegister (e) {
      if (this.password !== this.passwordConf) {
        this.setAuthError({ message: 'Different passwords', fields: ['password', 'confirm-password'] })
        return false
      }
      try {
        await this.registerUser({
          data: {
            username: this.username,
            password: this.password,
            email: this.email
          }
        })
        this.closeModal()
      } catch (e) {}
    },
    async sendForgot () {
      try {
        await this.forgotPassword({ data: { username: this.username, email: this.email } })
        this.view = 'forgot2'
        this.clearError()
      } catch (e) {}
    },
    async sendReset () {
      if (this.password !== this.passwordConf) {
        this.setAuthError({ message: 'Different passwords', fields: ['password', 'confirm-password'] })
        return false
      }
      try {
        await this.resetPassword({
          data: {
            username: this.username,
            password: this.password,
            email: this.email,
            code: this.code
          }
        })
        this.closeModal()
      } catch (e) {}
    },
    ...mapActions([
      'resetPassword',
      'registerUser',
      'loginUser',
      'forgotPassword'
    ]),
    ...mapMutations(['closeModal', 'setAuthError'])
  }
}
</script>