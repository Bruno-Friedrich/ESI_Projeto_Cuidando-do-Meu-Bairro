<template>
  <div v-if="userInfo">
    <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
      <div class="flex flex-col pt-10 px-5 pb-14">
        <h2 class="text-neutral-base text-2xl font-bold">
          {{ userInfo.username }}
        </h2>
        <div class="w-full">
          <!-- Description -->
          <div
            v-if="isEditting !== 'description'"
            class="text-neutral-light text-base mt-2"
          >
            <p v-if="userInfo.description">
              {{ userInfo.description }}
            </p>
            <p v-else>
              {{ $t("No user description") }}
            </p>
            <button
              v-if="isUser && !isEditting"
              class="self-center mt-3 py-2 px-4 text-sm font-medium text-center text-white bg-secondary-light rounded-lg hover:bg-secondary-base"
              @click="openEdit('description')"
            >
              {{ $t("edit") }}
            </button>
          </div>
          <!-- Edit Description -->
          <div v-else class="mt-2">
            <div class="form-group form flex flex-col">
              <label class="sr-only" for="user-edit-description">
                {{ $t("Description") }}
              </label>
              <textarea
                rows="4"
                class="form-control block p-2.5 w-full text-sm text-neutral-base bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-base focus:border-primary-base"
                id="user-edit-description"
                maxlength="500"
                v-model="description"
                :placeholder="$t('Description')"
              />
              <div class="control-buttons">
                <button-spinner
                  type="submit"
                  :condition="pending.sendEdit"
                  @click.prevent.native="sendEdit"
                  class="cursor-pointer self-center mt-3 py-2 px-3 text-sm font-medium text-center text-white bg-secondary-light rounded-lg hover:bg-secondary-base"
                >
                  {{ $t("Save") }}
                </button-spinner>

                <button
                  class="self-center mt-3 py-2 px-3 text-sm font-medium text-center text-secondary-light border border-secondary-light rounded-lg hover:bg-secondary-base hover:text-white"
                  @click.prevent="isEditting = null"
                >
                  {{ $t("Cancel") }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="top-bar bottom-bar private-info mt-8 pt-3 border-t border-gray-150 w-full"
          v-if="isUser"
        >
          <h3 class="text-neutral-base font-semibold text-lg mt-2">
            Informações pessoais
          </h3>
          <h4 class="text-neutral-light text-sm mb-2">
            Elas estão visíveis apenas para você
          </h4>

          <!-- Email -->
          <div v-if="isEditting !== 'email'">
            <span class="text-neutral-base font-medium"
              ><b>{{ $t("Email") }}:</b> {{ userInfo.email }}</span
            >
            <button
              v-if="!isEditting"
              @click="openEdit('email')"
              class="underline text-secondary-base text-sm"
            >
              {{ $t("edit") }}
            </button>
          </div>
          <!-- Edit Email -->
          <div v-else>
            <div class="form-group form">
              <label class="sr-only" for="user-edit-email">
                {{ $t("E-mail") }}
              </label>
              <input
                type="text"
                class="bg-gray-50 border border-gray-300 text-neutral-base text-sm rounded-lg focus:ring-primary-dark focus:border-primary-dark block w-full p-2.5"
                id="user-edit-email"
                v-model="email"
                :placeholder="$t('E-mail')"
              />
              <div class="control-buttons">
                <button-spinner
                  type="submit"
                  :condition="pending.sendEdit"
                  @click.prevent.native="sendEdit"
                  class="cursor-pointer self-center mt-3 py-2 px-3 text-sm font-medium text-center text-white bg-secondary-light rounded-lg hover:bg-secondary-base"
                >
                  {{ $t("Save") }}
                </button-spinner>
                <button
                  class="self-center mt-3 py-2 px-3 text-sm font-medium text-center text-secondary-light border border-secondary-light rounded-lg hover:bg-secondary-base hover:text-white"
                  @click.prevent="isEditting = null"
                >
                  {{ $t("Cancel") }}
                </button>
              </div>
            </div>
          </div>

          <!-- Password -->
          <div v-if="isEditting !== 'password'">
            <span class="text-neutral-base font-medium"
              ><b>{{ $t("Password") }}</b></span
            >
            <button
              v-if="!isEditting"
              @click="openEdit('password')"
              class="underline text-secondary-base text-sm"
            >
              {{ $t("edit") }}
            </button>
          </div>

          <!-- Edit Password -->
          <div v-else>
            <form class="form pessoa-edit-password-form">
              <div class="form-group form-inline">
                <label class="sr-only" for="user-edit-curr-password">
                  {{ $t("Current password") }}
                </label>
                <input
                  type="password"
                  class="mt-2 bg-gray-50 border border-gray-300 text-neutral-base text-sm rounded-lg focus:ring-primary-dark focus:border-primary-dark block w-full p-2.5"
                  id="user-edit-curr-password"
                  v-model="oldPassword"
                  :placeholder="$t('Current password')"
                />
              </div>

              <div class="form-group form-inline">
                <label class="sr-only" for="user-edit-new-password">
                  {{ $t("New password") }}
                </label>
                <input
                  type="password"
                  class="mt-2 bg-gray-50 border border-gray-300 text-neutral-base text-sm rounded-lg focus:ring-primary-dark focus:border-primary-dark block w-full p-2.5"
                  id="user-edit-new-password"
                  v-model="newPassword"
                  :placeholder="$t('New password')"
                />
              </div>

              <div class="form-group form-inline">
                <label class="sr-only" for="user-edit-confirm-password">
                  {{ $t("Confirm new password") }}
                </label>
                <input
                  type="password"
                  class="mt-2 bg-gray-50 border border-gray-300 text-neutral-base text-sm rounded-lg focus:ring-primary-dark focus:border-primary-dark block w-full p-2.5"
                  id="user-edit-confirm-password"
                  v-model="newPasswordConfirm"
                  :placeholder="$t('Confirm new password')"
                />
              </div>

              <button-spinner
                type="submit"
                :condition="pending.sendEdit"
                @click.prevent.native="sendEdit"
                class="cursor-pointer self-center mt-3 py-2 px-3 text-sm font-medium text-center text-white bg-secondary-light rounded-lg hover:bg-secondary-base"
              >
                {{ $t("Save") }}
              </button-spinner>
              <button
                class="self-center mt-3 py-2 px-3 text-sm font-medium text-center text-secondary-light border border-secondary-light rounded-lg hover:bg-secondary-base hover:text-white"
                @click.prevent="isEditting = null"
              >
                {{ $t("Cancel") }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ButtonSpinner from "../ButtonSpinner.vue"; // Ajuste o caminho conforme sua estrutura de diretórios

export default {
  name: "user-info",
  components: {
    ButtonSpinner,
  },
  data() {
    return {
      email: "",
      description: " ",
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
      isEditting: null,
    };
  },
  computed: {
    isUser() {
      return this.username === this.userInfo.username;
    },
    ...mapState({
      userInfo: (state) => state.auth.userInfo,
      username: (state) => state.auth.username,
      pending: (state) => state.auth.pending,
    }),
  },
  methods: {
    openEdit(field) {
      // Populate field value before openning
      if (field !== "password") {
        this[field] = this.userInfo[field];
      }
      this.isEditting = field;
    },
    async sendEdit() {
      let data = { username: this.userInfo.username };
      if (this.isEditting === "email") {
        data.email = this.email;
      } else if (this.isEditting === "description") {
        data.description = this.description != "" ? this.description : " ";
      } else if (this.isEditting === "password") {
        if (this.newPassword !== this.newPasswordConfirm) {
          this.addError("Different passwords");
          return false;
        } else {
          data.password = this.oldPassword;
          data["new_password"] = this.newPassword;
        }
      }
      await this.sendEditMyUserInfo(data);
      this.isEditting = null;
    },
    ...mapActions(["sendEditMyUserInfo", "addError"]),
  },
};
</script>
