import { shallowMount } from "@vue/test-utils";
import About from "../../src/views/About.vue";

describe("About.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(About);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders the main title correctly", () => {
    const title = wrapper.find(".pg-about__title");
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe("Cuidando do Meu Bairro");
  });

  it("renders all team members names", () => {
    //Caso haja uma string em teamMember que não esteja na página, o teste falha.
    const teamMembers = [
      "Fernando Ferreira Diniz de Moraes",
      "Profª. Drª. Gisele da Silva Craveiro",
      "Andrés M. R. Martano",
      "Sol Lima",
      "Alexandre Souza",
      "Renan de Sousa Ferreira",
      "Vanessa Alves do Nascimento",
    ];

    teamMembers.forEach((name) => {
      expect(wrapper.text()).toContain(name);
    });
  });

  it("renders the collaboration section correctly", () => {
    //Caso haja uma string em collaborators que não esteja na página, o teste falha.
    const collaborators = [
      "Prof. Dr. Jorge A. S. Machado",
      "Dra. Jutta Schmidt Machado",
      "Tamiris de Jesus",
      "Peter Krauss",
    ];

    collaborators.forEach((name) => {
      expect(wrapper.text()).toContain(name);
    });
  });

  it("renders links with correct URLs", () => {
    const links = [
      {
        selector: 'a[href="https://ikotema.digital/andres/"]',
        text: "Andrés M. R. Martano",
      },
      {
        selector: 'a[href="https://github.com/vanessa-nascimento"]',
        text: "Vanessa Alves do Nascimento",
      },
      {
        selector:
          'a[href="http://www5.each.usp.br/noticias/projeto-cuidando-do-meu-bairro-recebe-mencao-honrosa-no-premio-luiz-fernando-de-computacao/"]',
        text: "aqui",
      },
      {
        selector:
          'a[href="https://colab.each.usp.br/blog/tag/cuidando-do-meu-bairro/"]',
        text: "aqui",
      },
      {
        selector: 'a[href="https://gitlab.com/cuidandodomeubairro"]',
        text: "Gitlab",
      },
      { selector: 'a[href="mailto:ola@cuidando.vc"]', text: "ola@cuidando.vc" },
    ];

    links.forEach((link) => {
      const element = wrapper.find(link.selector);
      expect(element.exists()).toBe(true);
      expect(element.text()).toBe(link.text);
    });
  });

  it("renders the Partners component", () => {
    const partners = wrapper.findComponent({ name: "Partners" });
    expect(partners.exists()).toBe(true);
  });
});
