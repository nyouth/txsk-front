<template>
  <h2>新闻</h2>
  <ul>
    <li v-for='new in response.data.txsd'>
      <a :href="new.href">{{new.title}}</a>
    </li>
  </ul>
</template>
<script>
export default {
  data: function () {
    return {
      newsUrl: 'http://localhost:9001/api/txsknews',
      response: null,
      error: null
    }
  },
  methods: {
    callNews: function () {
      var repo = this
      console.log('repo', repo)
      this.$parent.$parent.callAPI('GET', this.newsUrl).then(function (response) {
        console.log(response)

        repo.response = response

        if (response.status !== 200) {
          this.error = response.statusText
        }
      }, function (response) {
        console.log('error', response)
        this.error = response
      })
    }
  },
  ready: function () {
    console.log('Inside ready')

    if (this.response === null) {
      this.callNews()
    } else {
      console.log('response already there', this.response)
    }
  }

}
</script>

<style>
</style>
