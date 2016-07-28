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
</script>

<style>
</style>
