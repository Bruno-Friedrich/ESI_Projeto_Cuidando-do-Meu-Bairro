import Vapi from 'vuex-rest-api'
import { baseUrls } from '@/configs'
import { http, addToStore } from '@/utils'

const baseURL = baseUrls.comments

// Comments
export default addToStore(new Vapi({
  axios: http,
  baseURL,
  state: {
    updates: [],
    commentsPage: []
  }
}).get({
  action: 'getCommentsUpdates',
  property: 'updates',
  path: `/comment`,
  onSuccess (state, payload, axios) {
    // Substitute strings for Dates
    let updates = payload.data.comments
    for (let row of updates) {
      row.created = new Date(row.created)
      row.modified = new Date(row.modified)
    }

    let threads = []
    // TODO pegar infos sobre os pontos para mostrar os assuntos
    // falta só arrumar o triggerChange abaixo
    // Group comments by thread
    var threadsMap = updates.reduce((_threads, curr) => {
      if (_threads[curr.thread_name]) {
        _threads[curr.thread_name].push(curr)
      } else {
        let comments = [curr]
        _threads[curr.thread_name] = comments
        threads.push({
          date: curr.created,
          thread_name: curr.thread_name,
          comments
        })
      }
      return _threads
    }, {})

    // eslint-disable-next-line
    let codes = Object.keys(threadsMap)
    // this.triggerChange('multiPontinfo', {key: 'a', codes})

    state.updates = threads
  }
}).get({
  action: 'getComments',
  path: ({ key }) => `/thread/${key}`,
  onSuccess (state, payload) {
    function commentCompare (a, b) { return a.created < b.created ? 1 : -1 }
    function orderComments (comments) {
      // Substitute strings for Dates
      for (let comment of comments) {
        comment.created = new Date(comment.created)
        comment.modified = new Date(comment.modified)
      }
      comments.sort(commentCompare)
      for (let com of comments) {
        if (com.replies) orderComments(com.replies)
      }
      return comments
    }
    orderComments(payload.data.comments)
    state.commentsPage = payload.data
  }
}).getStore(),
{
  actions: {
    async sendComment ({ dispatch, commit }, { key, text }) {
      let url = `${baseURL}/thread/${key}`
      let data = {
        token: await dispatch('getMicroToken'),
        text
      }
      let a = await http.get(url, { data })
      console.log(a)
      // TODO bypass cache!
      return dispatch('getComments', key)
    }
  }
})
