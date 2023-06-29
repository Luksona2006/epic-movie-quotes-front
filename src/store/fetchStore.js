import { defineStore } from 'pinia'

export const useFetchStore = defineStore({
  id: 'fetch',
  state: () => ({
    isFetching: false,
    page: 1,
    allPagesFetched: false
  }),

  actions: {
    clearFetchStore() {
      this.$state.isFetching = false
      this.$state.page = 1
      this.$state.allPagesFetched = false
    },
    startFetch() {
      this.$state.isFetching = true
    },

    finishFetch() {
      this.$state.isFetching = false
    },
    increasePageNum() {
      this.$state.page = this.$state.page + 1
    },

    allDataFetched() {
      this.$state.allPagesFetched = true
    }
  },

  persist: true
})
