<template>
  <div>
    <div class="table-responsive">
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full">
                  <thead class="bg-white border-b">
                    <tr>
                      <th class="text-left text-neutral-base px-6 py-4">{{ $t('description') }}</th>
                      <th scope="col" class="text-sm font-medium text-neutral-base px-6 py-4 text-left">
                        {{ $t('planned') }}
                      </th>
                      <th scope="col" class="text-sm font-medium text-neutral-base px-6 py-4 text-left">
                        {{ $t('committed') }}
                      </th>
                      <th scope="col" class="text-sm font-medium text-neutral-base px-6 py-4 text-left">
                        {{ $t('finished') }}
                      </th>
                      <th scope="col" class="text-sm font-medium text-neutral-base px-6 py-4 text-left">
                        {{ $t('body') }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, i) in pageData.data" :key="i" class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-base underline">
                        <router-link :to="{ name: 'despesa', params: { code: row.code } }">
                          {{ row.ds_projeto_atividade }}
                        </router-link>
                      </td>
                      <td class="text-sm text-neutral-base font-light px-6 py-4 whitespace-nowrap">
                        {{ formatCur(calcPlanejado((row.sld_orcado_ano ? row.sld_orcado_ano : row.vl_orcado_ano), row.vl_atualizado)) }}
                      </td>
                      <td class="text-sm text-neutral-base font-light px-6 py-4 whitespace-nowrap">
                        {{ formatCur(row.vl_empenhadoliquido) }}
                      </td>
                      <td class="text-sm text-neutral-base font-light px-6 py-4 whitespace-nowrap">
                        {{ formatCur(row.vl_liquidado) }}
                      </td>
                      <td class="text-sm text-neutral-base font-light px-6 py-4 whitespace-nowrap">
                        {{ row.ds_orgao }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    </div>
    <nav aria-label="Table navigation" class="mt-5 mb-10 flex justify-end sm: mr-4">
      <ul class="inline-flex -space-x-px">
      <li aria-controls="my-table">
          <router-link :to="{ params: { page: 1 } }"
            class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            :class="{ 'bg-gray-100': currPage === 1 }">{{ $t('first') }}</router-link>
        </li>
        <li>
          <router-link v-for="num in pageIndexes" :key="num"
            :to="{ params: { page: num } }"
            :class="{ 'bg-gray-100': num === currPage }"
            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            role="button">{{ num }}</router-link>
        </li>
        <li>
          <router-link
            :to="{ params: { page: lastPage } }"
            class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            :class="{ 'bg-gray-100': currPage === lastPage }"
          >{{ $t('last') }}</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { formatCur } from '@/utils'

export default {
  name: 'dynamic-table',
  data () {
    return {
      per_page_num: 25
    }
  },
  computed: {
    lastPage () {
      // Calculate last page
      return Math.floor(this.pageData.totalRows / this.per_page_num)
    },
    pageIndexes () {
      // Page index numbers
      let numShownPages = 5
      return Array(...Array(numShownPages))
        .map((_, i) => i + this.currPage - Math.floor(numShownPages / 2))
        .filter(i => i > 1 && i < this.lastPage)
    },
    currPage () {
      return this.routePage !== undefined ? parseInt(this.routePage) : 1
    },
    ...mapState({
      pageData: state => state.money.page,
      routePage: state => state.route.params.page
    })
  },
  methods: {
    formatCur,
    calcPlanejado (orcado, atualizado) {
      return atualizado || orcado
    }
  }
}
</script>
