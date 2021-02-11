import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    guessMode: localStorage.getItem('guessMode'),
    token: localStorage.getItem('token') || '',
    movies: localStorage.getItem('movies'),
    term: localStorage.getItem('term_id'),
    score: localStorage.getItem('score'),
    total: localStorage.getItem('total'),
    percentage: localStorage.getItem('percentage'),
    authError: []
  },
  mutations: {
    updateMode(state, newMode) {
      state.guessMode = newMode;
    },
    authSuccess(state, authObject) {
      state.guessMode = 'SEARCH';
      state.token = authObject.token;
      localStorage.setItem('guessMode', 'SEARCH');  
      localStorage.setItem('token', authObject.token);
      localStorage.setItem('user', JSON.stringify(authObject.user));
    },
    authError(state, error){
      state.authError = error
    },
    searchResults(state, results) {
      state.movies = JSON.stringify(results.movies);
      localStorage.setItem('guessMode', 'PLAY')
      localStorage.setItem('movies', JSON.stringify(results.movies));
      localStorage.setItem('term_id', JSON.stringify(results.term));
    },
    scoreQuiz(state, response) {
      state.guessMode = 'RESULT';
      state.percentage = response.percentage;
      state.score = response.score;
      state.total = response.total;
      localStorage.setItem('guessMode', 'RESULT')

      localStorage.setItem('score', response.score)
      localStorage.setItem('total', response.total)
      localStorage.setItem('percentage', response.percentage)      
    },
    guessMode(state, guessMode) {
      state.guessMode = guessMode
    },
    logout(state) {
      localStorage.clear();      
      state.token = ''
    },
  },
  actions: {
    login({commit}, user){
        return new Promise((resolve, reject) => {
          
          axios({ url: 'http://0.0.0.0:9191/api/auth/login', data: user, method: 'POST' })
            .then(response => {
              
              if (Vue.lodash.has(response.data, 'message') && response.status == 200) {              
                commit('authError', [response.data.message])
                reject(response.data.message)
              }else if (response.status == 200 && Vue.lodash.has(response.data, 'user')) {                
                  const authObject = {
                    user: response.data.user,
                    token: response.data.access_token
                  }
                 commit('authSuccess', authObject)
                 resolve(authObject)    
              }
            }).catch(error => {
              
              const errors = Vue.lodash.flatten(Object.values({ ...error.response.data.errors }));      
              commit('authError', errors);
              reject(error.response.data)
          })
        })
    },
    
    register({ commit }, user) {

      return new Promise((resolve, reject) => {
          
          axios({url: 'http://0.0.0.0:9191/api/auth/register', data: user, method: 'POST' })
            .then(response => {
              
              if (Vue.lodash.has(response.data, 'message') && response.status == 200) {              
                commit('authError', [...response.data.message])
              }else if (response.status == 200 && Vue.lodash.has(response.data, 'user')) {                  
                  const authObject = {
                    user: response.data.user,
                    token: response.data.access_token
                  }
                 commit('authSuccess', authObject)
                 resolve(authObject)    
              }
            }).catch(error => {
              const errors = Vue.lodash.flatten(Object.values({ ...error.response.data.errors }));      
              commit('authError', errors);
              reject(error.response.data)
          })
        })
    },

    search({ commit }, term) {
      return new Promise((resolve, reject) => {
        const url = 'http://0.0.0.0:9191/api/quiz/search?term=' + term
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.token

        axios({url: url, method: 'GET' })
          .then(response => {
          
            if (response.data.results.length > 0) {
              const movieTermData = {
                movies: response.data.results,
                term: response.data.term_id
              }
              commit('searchResults', movieTermData)
            }
            resolve(response)
        })
          .catch(error => {            
            reject(error.response);
        })
      })
    },
    guessMode({ commit }, guessMode) {
      localStorage.setItem('guessMode', guessMode)  
      commit('guessMode', guessMode)
    },
    logout({commit}){
      return new Promise((resolve) => {
        commit('logout')
        resolve('')
      })
    },
    scoreQuiz({ commit }, scores) {
      const data = {
        ...scores,
        'term_id': this.state.term
      }
      
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.token
        axios({url: 'http://0.0.0.0:9191/api/quiz/score', data, method: 'POST' })
          .then(response => {            
            commit('scoreQuiz', response.data);
            resolve(response)
        })
        .catch(err => {
          reject(err)
        })
      }) 
    },
    fetchResults({ commit }) {
       
       return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.token
        axios({url: 'http://0.0.0.0:9191/api/quiz/results', method: 'GET' })
          .then(response => {
            resolve(response)
        })
        .catch(err => {
          reject(err)
        })
      }) 
    },
    resetQuiz() {
        this.state.guessMode = 'SEARCH'
        localStorage.setItem('guessMode', 'SEARCH')
        localStorage.removeItem('score')
        localStorage.removeItem('total')
        localStorage.removeItem('percentage')
        localStorage.removeItem('movies')
    }
  },
  getters: {
    guessMode: state => state.guessMode,
    movies: state => state.movies,
    isLoggedIn: state => !!state.token,  
    score: state => state.score,
    total: state => state.total,
    percentage: state => state.percentage,
    authError: state => state.authError
  }
})
