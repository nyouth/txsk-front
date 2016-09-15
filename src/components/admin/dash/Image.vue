<template>
  <section class="content">
    <div class="row center-block">
      <h2>数据管理</h2>
      <div class="col-md-12">
        <div class="box">

          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">

              <div class="row">
                <div class="col-sm-12">
                  <table aria-describedby="example1_info" role="grid" id="example1" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" style="width: 167px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">id</th>
                        <th aria-label="Platform(s): activate to sort column ascending" style="width: 182px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">thumb</th>
                        <th aria-label="CSS grade: activate to sort column ascending" style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">描述</th>
                        <th aria-label="CSS grade: activate to sort column ascending" style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="odd" role="row" v-for="(index,style) in result">
                        <td class="sorting_1">{{style.id}}</td>
                        <td><img style="width:50px;height:50px;" src="http://store.xiaovdingzhi.com/{{style.thumb}}" /></td>
                        <td>{{style.description}}</td>
                        <td><button v-on:click='show(style)' class="btn btn-info" data-toggle="modal" data-target="#myModal"><i class="fa fa-pencil fa-fw"></i></button>&nbsp;&nbsp;<button v-on:click="delete(style)" class="btn btn-danger btn-del"><i class="fa fa-trash fa-fw"></i></button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col-sm-12 imageInput">
                  <vue-file-upload url="http://localhost:9001/api/slide" v-bind:files.sync="files" v-bind:filters="filters" v-bind:events="cbEvents" v-bind:request-options="reqopts"></vue-file-upload>
                  <table>
                    <thead>
                      <tr>
                        <th>文件名</th>
                        <th>大小</th>
                        <th>进度</th>
                        <th>状态</th>
                        <th>action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="file in files">
                        <td v-text="file.name"></td>
                        <td v-text="file.size"></td>
                        <td v-text="file.progress"></td>
                        <td v-text="onStatus(file)"></td>
                        <td>
                          <button type="button" @click="uploadItem(file)">上传</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button type="button" @click="uploadAll">上传所有文件</button>
                  </div>
                </div>
              </div>
            </div>
           <!-- <vue-nav :cur.sync="cur" :all.sync="all" v-on:btn-click="loadData" v-on:next="loadData"></vue-nav>
            <p>{{msg}}</p> -->
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VueFileUpload from 'vue-file-upload';
export default{
  data(){
    return{
      files:[],
      imageUrl: 'http://localhost:9001/api/images',
      response: null,
      error: null,
      //文件过滤器，只能上传图片
      filters:[
        {
          name:"imageFilter",
          fn(file){
              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
        }
      ],
      //回调函数绑定
      cbEvents:{
        onCompleteUpload:(file,response,status,header)=>{
          console.log(file);
          console.log("finish upload;")
        }
      },
      //xhr请求附带参数
      reqopts:{
        formData:{
          tokens:'tttttttttttttt'
        },
        responseType:'json',
        withCredentials:false
      }
    }
  },
  methods:{
    onStatus(file){
      if(file.isSuccess){
        return "上传成功";
      }else if(file.isError){
        return "上传失败";
      }else if(file.isUploading){
        return "正在上传";
      }else{
        return "待上传";
      }
    },
    uploadItem(file){
      //单个文件上传
      file.upload();
    },
    uploadAll(){
      //上传所有文件
      this.$broadcast('DO_POST_FILE');
    },
    callImages: function () {
      var repo = this
      console.log('repo', repo)
      this.$parent.$parent.callAPI('GET', this.imageUrl).then(function (response) {
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
  components:{
    VueFileUpload
  },
  ready: function () {
    console.log('Inside ready')
    if (this.response === null) {
      this.callImages()
    } else {
      console.log('respsonse already there', this.response)
    }
  }
}
</script>

<style>
</style>
