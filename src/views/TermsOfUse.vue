<template>
  <div class="pg-terms">
    <div class="container mx-auto pt-20 pb-32 max-w-7xl px-4">
      <h1 class="text-neutral-base text-3xl text-center font-bold">
        Termos de Uso
      </h1>
      <div class="text-neutral-light text-xl text-justify mt-4">
        <p>
          A equipe desenvolvedora da plataforma Cuidando do Meu Bairro está
          empenhada em proteger os dados pessoais dos usuários e voluntários que
          utilizam a mesma. Ao registar-se solicitamos dados pessoais como nome
          e endereço de email. Também coletamos endereços de IP (um endereço
          Internet Protocol, ou o endereço IP é um número identificador de cada
          computador ou dispositivo conectado à Internet). Não publicaremos os
          dados a não ser que nos seja legalmente exigido.
        </p>
        <p>
          As páginas da Web contêm links para páginas de propriedade e/ou
          operados por terceiros. Não nos responsabilizamos pelo conteúdo de
          sites externos: a sua utilização é, portanto, de responsabilidade do
          usuário.
        </p>
        <p>
          Os datos utilizados neste aplicativo são providos pela administração
          pública municipal de São Paulo seja aqueles obtidos através do portal
          de transparência da cidade que são publicados em cumprimento da Lei
          Complementar 131/2009, sejam as informações obtidas através da Lei
          12.527/2011. Salvo indicação contrária, a informação contida no portal
          será considerada de caráter público.
        </p>
        <p>
          Nós criamos esta ferramenta para de facilitar o acesso à informações
          sobre o gasto público na cidade de São Paulo. Cuidando do Meu Bairro
          faz chegar a você as respostas que os órgão públicos devem dar dentro
          do prazo estabelecido em lei. Todo o processo é transparente e público
          de modo que você e outros interessados possam acompanhar o pedido.
          Também é projetado para melhorar o trabalho dos servidores públicos,
          pois as respostas que eles dão são publicadas na ferramenta e poderão
          servir os outros que procuram a mesma informação. Portanto, evite
          pedidos duplicados e os esforços serão poupados.
        </p>
        <p>
          Cuidando do Meu Bairro além de oferecer uma forma de solicitar
          informações aos órgãos públicos, também oferecer um espaço democrático
          para a livre troca de ideias, manifestação de opiniões e interação
          entre as pessoas. Como se sabe, democracia não exclui divergências. Às
          vezes, conversas podem causar mal-entendidos.
        </p>
        <p>
          Acreditamos na liberdade de expressão e oferecemos um espaço rico para
          troca de ideias. Em contrapartida, as pessoas devem se manifestar com
          responsabilidade e respeito às leis brasileiras. Desta forma, textos
          ou quaisquer materiais em desacordo com esses preceitos poderão ser
          removidos.
        </p>
        <h3 class="text-neutral-base my-5 text-2xl text-center font-bold">
          Mecanismo de eliminação de conteúdo
        </h3>
        <p>
          À equipe reserva-se o direito de eliminar sem consulta toda e qualquer
          postagem de conteúdo, no todo ou em parte, que fira diretamente as
          regras acima estabelecidas.
        </p>
      </div>
    </div>
    <FooterInfo />
  </div>
</template>

<script>
import FooterInfo from '../components/FooterInfo.vue';

export default {
  components: { FooterInfo },
};
</script>

<style scoped>
.pg-terms {
  min-height: 100vh; /* Garante que a página ocupe toda a altura da janela */
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1; /* Permite que o conteúdo ocupe o espaço disponível */
}

.pb-32 {
  padding-bottom: 8rem; /* Adiciona espaço no final da página para o footer */
}
</style>
