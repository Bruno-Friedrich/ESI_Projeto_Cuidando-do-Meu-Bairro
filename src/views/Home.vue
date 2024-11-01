<template>
  <div>
    <slot/>
    <div class="home pb-20 -mt-3">
      <div class="c-home__distribution lg:grid lg:grid-cols-2">
        <div class="c-home__distribution-descrition bg-gray-100 mx-auto p-28 flex flex-col justify-center">
          <h2 class="text-neutral-base text-5xl font-bold mb-5">Quantidade e<br/> distribuição de recursos <br />por tipo em {{ year }}</h2>
          <p class="text-neutral-light text-xl">Aqui estão todas as informações sobre os gastos públicos na cidade de São Paulo. Elas são obtidas através do <a href="https://orcamento.sf.prefeitura.sp.gov.br/orcamento/execucao.php" target="_blank" class="underline text-secondary-base">portal de transparência</a>.</p>
          <p class="text-neutral-light text-xl">Nossa equipe buscou por termos para poder realizar a geolocalização dos mesmos, mas nem sempre isso é possível. Aqui mostramos as estatísticas do que está mapeado e do que não está tanto em termos absolutos (número de atividades) ou relativos à quantidade de recursos.</p>
        </div>
        <div class="c-home__distribution-data container mx-auto p-28 flex flex-col justify-center bg-gray-50">
            <div class="text-center">
              <year-charts/>
            </div>
        </div>
      </div>
      <div class="c-home__distribution-data-table container mx-auto py-20 -mt-2">
        <h2 class="text-neutral-base text-3xl font-bold text-center mb-3">Tabela de distribuição de recursos</h2>
        <p class="text-neutral-light text-center text-xl pb-3">Na tabela abaixo estão relacionados todos os gastos e clicando sobre a linha correspondente <br />você poderá obter mais detalhes e também solicitar as informações que deseja.</p>
        <dynamic-table />
        <div class="container mx-auto flex justify-center">
          <a class="px-10 py-5 border-2 hover:bg-secondary-base font-xl text-xs leading-tight uppercase rounded border-secondary-light hover:border-secondary-base bg-secondary-light text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          href="http://devcolab.each.usp.br/dadosorcamentarios"
          target="_blank">
              <span class="download-arrow"/>
              {{ $t("Download table") }}
          </a>
        </div>
      </div>
      <div class="bg-gray-50">
        <div class="container mx-auto p-16">
          <recent-activities/>
        </div>
      </div>
      <div class="bg-white">
      <div class="container mx-auto p-16">
        <partners/>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RecentActivities from '@/components/RecentActivities.vue'
import DynamicTable from '@/components/DynamicTable.vue'
import YearCharts from '@/components/chart/YearCharts.vue'
import FooterInfo from '@/components/FooterInfo.vue'
import Partners from '@/components/Partners.vue'

export default {
  name: 'home-view',
  components: {
    RecentActivities,
    YearCharts,
    DynamicTable,
    FooterInfo,
    Partners
},
  data () {
    return {
      showMore: false
    }
  },
  computed: mapState({
    year: state => state.route.params.year
  })
}
</script>