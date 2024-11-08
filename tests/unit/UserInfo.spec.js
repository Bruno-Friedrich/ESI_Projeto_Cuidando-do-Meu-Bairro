import { shallowMount, mount } from "@vue/test-utils";
import UserInfo from "../../src/components/user/UserInfo.vue";
import Vue from "vue";
import Vuex from "vuex";
import ButtonSpinner from "../../src/components/ButtonSpinner.vue";

Vue.use(Vuex);

describe("UserInfo.vue", () => {
  let wrapper;
  let store;
  let actions;

  beforeEach(() => {
    actions = {
      sendEditMyUserInfo: jest.fn(),
      addError: jest.fn(),
    };

    store = new Vuex.Store({
      state: {
        auth: {
          userInfo: {
            username: "testuser",
            description: "User description",
            email: "user@example.com",
          },
          username: "testuser",
          pending: { sendEdit: false },
        },
      },
      actions,
    });

    wrapper = mount(UserInfo, {
      store,
      mocks: {
        $t: (msg) => msg, // Mock para função de tradução
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders user information correctly", () => {
    expect(wrapper.find("h2").text()).toBe("testuser");
    expect(wrapper.find(".text-neutral-light").text()).toContain(
      "User description"
    );
  });

  it("shows empty text if description is missing", async () => {
    await wrapper.setData({ description: "" });
    expect(wrapper.find(".text-neutral-light").text()).toContain(" ");
  });

  it("enters edit mode for description", async () => {
    await wrapper.setData({ isEditting: "description" });
    await wrapper.setData({
      description: store.state.auth.userInfo.description,
    });

    const descriptionTextarea = wrapper.find("textarea#user-edit-description");
    expect(descriptionTextarea.exists()).toBe(true);
    expect(descriptionTextarea.element.value).toBe(
      store.state.auth.userInfo.description
    );
  });

  it("saves edited description", async () => {
    await wrapper.setData({
      isEditting: "description",
      description: "New description",
    });

    const saveButton = wrapper.findComponent(ButtonSpinner);
    await saveButton.trigger("click");

    expect(actions.sendEditMyUserInfo).toHaveBeenCalled();
    expect(actions.sendEditMyUserInfo.mock.calls[0][1]).toEqual({
      username: "testuser",
      description: "New description",
    });
  });

  it("enters edit mode for email", async () => {
    await wrapper.setData({
      isEditting: "email",
      email: store.state.auth.userInfo.email,
    });

    const emailInput = wrapper.find("input#user-edit-email");
    expect(emailInput.exists()).toBe(true);
    expect(emailInput.element.value).toBe(store.state.auth.userInfo.email);
  });

  it("saves edited email", async () => {
    await wrapper.setData({
      isEditting: "email",
      email: "newuser@example.com",
    });

    const saveButton = wrapper.findComponent(ButtonSpinner);
    await saveButton.trigger("click");

    expect(actions.sendEditMyUserInfo).toHaveBeenCalled();
    expect(actions.sendEditMyUserInfo.mock.calls[0][1]).toEqual({
      username: "testuser",
      email: "newuser@example.com",
    });
  });

  it("saves edited password if confirmation matches", async () => {
    await wrapper.setData({
      isEditting: "password",
      oldPassword: "oldpass",
      newPassword: "newpass",
      newPasswordConfirm: "newpass",
    });

    const saveButton = wrapper.findComponent(ButtonSpinner);
    await saveButton.trigger("click");

    expect(actions.sendEditMyUserInfo).toHaveBeenCalled();
    expect(actions.sendEditMyUserInfo.mock.calls[0][1]).toEqual({
      username: "testuser",
      password: "oldpass",
      new_password: "newpass",
    });
  });

  it("cancels editing and reverts to display mode", async () => {
    await wrapper.setData({ isEditting: "description" });

    const cancelButton = wrapper
      .findAll("button")
      .filter((button) => button.text() === "Cancel")
      .at(0);
    expect(cancelButton.text()).toBe("Cancel"); // Verifica se o texto é "Cancel"
    await cancelButton.trigger("click"); // Dispara o evento de click

    expect(wrapper.vm.isEditting).toBeNull();
    expect(wrapper.find("textarea#user-edit-description").exists()).toBe(false);
  });
});
