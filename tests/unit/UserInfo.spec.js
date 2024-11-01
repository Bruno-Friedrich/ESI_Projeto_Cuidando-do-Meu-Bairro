import { mount, shallowMount } from "@vue/test-utils";
import UserInfo from "../../src/components/user/UserInfo.vue";
import ButtonSpinner from "../../src/components/ButtonSpinner.vue"; // Importa o ButtonSpinner
import Vue from "vue"; 
import Vuex from "vuex";

Vue.use(Vuex);

describe("UserInfo Component", () => {
  let store;
  let state;
  let actions;

  beforeEach(() => {
    const $t = jest.fn((key) => key); // Mock simples que retorna a chave

    state = {
      userInfo: {
        username: "testUser",
        description: "User description",
        email: "test@example.com",
      },
      username: "testUser",
      pending: {
        sendEdit: false,
      },
    };

    actions = {
      sendEditMyUserInfo: jest.fn(),
      addError: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        auth: {
          namespaced: true,
          state,
          actions,
        },
      },
    });
    
    // Injetar o mock do $t nos testes
    Vue.prototype.$t = $t;
  });

  it("renders user info correctly", () => {
    const wrapper = shallowMount(UserInfo, { store });
    expect(wrapper.text()).toContain(store.state.auth.userInfo.username);
    expect(wrapper.text()).toContain(store.state.auth.userInfo.description);
  });

  it("shows edit button for description if user is viewing own profile", () => {
    const wrapper = shallowMount(UserInfo, { store });
    const editButton = wrapper.find("button");
    expect(editButton.exists()).toBe(true);
    expect(editButton.text()).toBe("edit");
  });

  it("enters edit mode for description", async () => {
    const wrapper = mount(UserInfo, { store });
    await wrapper.setData({ isEditting: "description" });

    const descriptionTextarea = wrapper.find("textarea#user-edit-description");
    expect(descriptionTextarea.exists()).toBe(true);
    expect(descriptionTextarea.element.value).toBe(
      store.state.auth.userInfo.description
    );
  });

  it("saves description change", async () => {
    const wrapper = shallowMount(UserInfo, { 
      store,
      components: {
        ButtonSpinner, // Registra o ButtonSpinner
      },
    });
    await wrapper.setData({ isEditting: "description", description: "New description" });

    const saveButton = wrapper.find("button-spinner");
    await saveButton.trigger("click");

    expect(actions.sendEditMyUserInfo).toHaveBeenCalledWith(
      expect.any(Object),
      { username: "testUser", description: "New description" },
      undefined
    );
    expect(wrapper.vm.isEditting).toBe(null);
  });

  it("enters edit mode for email", async () => {
    const wrapper = mount(UserInfo, { store });
    wrapper.vm.openEdit("email");

    await wrapper.vm.$nextTick();
    const emailInput = wrapper.find("input#user-edit-email");
    expect(emailInput.exists()).toBe(true);
    expect(emailInput.element.value).toBe(store.state.auth.userInfo.email);
  });

  it("displays error if new passwords do not match", async () => {
    const wrapper = mount(UserInfo, { store });
    wrapper.vm.isEditting = "password";
    wrapper.setData({
      oldPassword: "oldPassword123",
      newPassword: "newPassword",
      newPasswordConfirm: "differentPassword",
    });

    await wrapper.vm.sendEdit();
    expect(actions.addError).toHaveBeenCalledWith(expect.any(Object), "Different passwords", undefined);
    expect(actions.sendEditMyUserInfo).not.toHaveBeenCalled();
  });

  it("saves new password if it matches confirmation", async () => {
    const wrapper = shallowMount(UserInfo, { store });
    wrapper.vm.isEditting = "password";
    wrapper.setData({
      oldPassword: "oldPassword123",
      newPassword: "newPassword",
      newPasswordConfirm: "newPassword",
    });

    await wrapper.vm.sendEdit();

    expect(actions.sendEditMyUserInfo).toHaveBeenCalledWith(
      expect.any(Object),
      {
        username: "testUser",
        password: "oldPassword123",
        new_password: "newPassword",
      },
      undefined
    );
  });

  it("cancels editing mode", async () => {
    const wrapper = shallowMount(UserInfo, { store });
    await wrapper.setData({ isEditting: "email" });
    const cancelButton = wrapper.find("button").findAll((button) =>
      button.text().includes("Cancel")
    )[0];
    await cancelButton.trigger("click");
    expect(wrapper.vm.isEditting).toBe(null);
  });
});
