<template>
  <div class="col-md-4">
    <h1>团学速递</h1>
    <ul class="newslist">
      <li v-for='new in response.data.txsd'>
        <a :href="new.href">{{new.title}}</a>
      </li>
    </ul>
  </div>
  <div class="col-md-4">
    <h1>院系团训</h1>
    <ul class="newslist">
      <li v-for='new in response.data.yxdt'>
        <a :href="new.href">{{new.title}}</a>
      </li>
    </ul>
  </div>
  <div class="col-md-4">
    <h1>通知公告</h1>
    <ul class="newslist">
      <li v-for='new in response.data.tzgg'>
        <a :href="new.href">{{new.title}}</a>
      </li>
    </ul>
  </div>
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
.newslist li {
  display:block;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 95%;
}
.newslist a {
  overflow: hidden;
  display: block;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  float: left;
}
</style>
