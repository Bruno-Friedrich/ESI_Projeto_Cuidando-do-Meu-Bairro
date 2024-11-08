<template>
  <div class="activities">
    <h2 class="text-neutral-base sm: text-2xl md:text-3xl font-bold mb-3">{{ $t('Recent Activities') }}</h2>
    <p class="text-neutral-light md:text-xl sm: text-lg mb-10">
      Acompanhe as últimas atividades da plataforma Cuidando do Meu Bairro
    </p>
    <ol class="relative border-l border-gray-200">                  
      <li class="mb-10 ml-4" v-for="(activity, i) of activitiesLoaded" :key="i">
          <div class="absolute w-6 h-6 bg-white rounded-full mt-0.5 -left-3 border border-white">
            <img :src="getIcon(activity)">
          </div>
          <time class="text-sm  font-normal leading-none text-gray-400">{{ formatDate(activity.date) }}</time>
          <span v-if="activity.comments">
            <h3 class="text-lg font-semibold text-neutral-base flex mt-2">
               Um novo comentário
            </h3>
            <p class="mb-4 text-base font-normal text-neutral-light">
              {{ $tc('comments_about', activity.comments.length, {count: activity.comments.length}) }}
              {{ multiPontinfo[activity.thread_name]['ds_projeto_atividade'] }}
            </p>
            <a 
              class="inline-flex cursor-pointer items-center py-2 px-4 text-sm font-medium text-secondary-base bg-transparent rounded-lg border border-secondary-base hover:bg-secondary-base hover:text-white"
              @click="routeDespesa(activity.thread_name)"
            > Saiba mais 
              <svg class="ml-2 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </a>
          </span>
          <span v-if="activity.pedido">
            <h3 class="text-lg font-semibold text-neutral-base flex mt-2">
              Atualização de pedido de informação
            </h3>
            <p class="mb-4 text-base font-normal text-neutral-light">
              {{ activity.pedido.justification }}
            </p>
            <a 
              class="inline-flex cursor-pointer items-center py-2 px-4 text-sm font-medium text-secondary-base bg-transparent rounded-lg border border-secondary-base hover:bg-secondary-base hover:text-white"
              @click="routeDespesa(activity.code)"
            > Saiba mais 
              <svg class="ml-2 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </a>
          </span>
          <span v-if="activity.data">
            <div v-if="activity.event === 'modified'">
              <h3 class="text-lg font-semibold text-neutral-base flex mt-2">
                Uma despesa foi atualizada
              </h3>
              <p class="mb-4 text-base font-normal text-neutral-light">
                {{activity.description}} mudou de {{activity.data.state[0]}} para <b>{{activity.data.state[1]}}</b>
              </p>
              <a 
                class="inline-flex items-center cursor-pointer py-2 px-4 text-sm font-medium text-secondary-base bg-transparent rounded-lg border border-secondary-base hover:bg-secondary-base hover:text-white"
                @click="routeDespesa(activity.code)"
              > Saiba mais 
                <svg class="ml-2 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
            <div v-if="activity.event === 'created'">
              <h3 class="text-lg font-semibold text-neutral-base flex mt-2">
                Uma nova despesa foi planejada
              </h3>
              <p class="mb-4 text-base font-normal text-neutral-light">
                {{activity.description}}
              </p>
              <a 
                class="inline-flex cursor-pointer items-center py-2 px-4 text-sm font-medium text-secondary-base bg-transparent rounded-lg border border-secondary-base hover:bg-secondary-base hover:text-white"
                @click="routeDespesa(activity.code)"
              > Saiba mais 
                <svg class="ml-2 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </span>
      </li>
    </ol>
    <button class="btn btn-color-sec inline-flex items-center text-right text-white px-3 py-2 cursor-pointer bg-secondary-light font-light hover:bg-secondary-base rounded" @click="loadMore">
      Carregar mais
      <svg class="w-4 h-4 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { formatDate } from '@/utils'

export default {
  name: 'recent-activities',
  components: {
  },
  async mounted () {
    this.getMoneyUpdates()
    this.getPedidosUpdates()
    await this.getCommentsUpdates()
    let threadsMap = this.threads.reduce((threads, curr) => {
      if (threads[curr.thread_name]) {
        threads[curr.thread_name].push(curr)
      } else {
        let comments = [curr]
        threads[curr.thread_name] = comments
      }
      return threads
    }, {})
    let codes = Object.keys(threadsMap)
    this.getMultiPointInfo({ data: { codes } })
  },
  computed: {
    activities () {
      return this.pedidos.concat(this.money).concat(this.threads).sort(this.dateCompare)
    },
    ...mapState({
      money: state => state.money.updates,
      pedidos: state => state.esic.updates,
      threads: state => state.comments.updates,
      multiPontinfo: state => state.money.multiPontinfo
    }),
    activitiesLoaded() {
      return this.activities.slice(0, this.activitiesToShow);
    },
  },
  data() {
    return {
      activitiesToShow: 5
    };
  },
  methods: {
    formatDate,
    dateCompare (a, b) { return a.date < b.date ? 1 : -1 },
    getIcon (item) {
      if (item.data) {
        // Is a money update
        let currState = item.event === 'modified' ? item.data.state[1] : item.data.state
        if (currState === 'empenhado') return this.$assets.aEmp
        if (currState === 'liquidado') return this.$assets.aLiq
        if (currState === 'orcado' || currState === 'atualizado') return this.$assets.aPla
      } else if (item.comments) {
        // Is a comments update
        if (item.comments.length > 4) return this.$assets.aComExtra
        else return this.$assets.aCom
      } else if (item.pedido) {
        // Is a pergunta update
        return this.$assets.aPer
      }
      return ''
    },
    routeDespesa (code) {
      this.$router.push({ name: 'despesa', params: { code } })
    },
    ...mapActions([
      'getMoneyUpdates',
      'getPedidosUpdates',
      'getCommentsUpdates',
      'getMultiPointInfo'
    ]),
    loadMore() {
      if (this.activitiesToShow > this.activitiesLoaded.length) return;
      this.activitiesToShow = this.activitiesToShow + 5;
    }
  }
}
</script>
