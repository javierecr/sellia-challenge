// store.js
export const store = {
  state: {
    messages: [],
  },
  mutations: {
    setMessages(state, messages) {
      state.messages = messages
    },
  },
  actions: {
    fetchMessages({ commit }) {
      axios.get('https://api.example.com/messages').then((response) => {
        commit('setMessages', response.data)
      })
    },
  },
}
