<template>
  <div class="recordType">
    <div class="record-list">
      <div class="row" v-for="(item,index) in dataList">

        <!--<div class="row-title">{{labelList[0]}}<span class="number">{{item.valList[0]}}</span></div>-->
        <!--<div class="row-content">-->
          <!--<div class="col-xs-4 text-left">-->
            <!--<div class="col-data text-orange">{{parseFloat(item.valList[1]).toFixed(2)}}</div>-->
            <!--<div class="col-name">{{labelList[1]}}</div>-->
          <!--</div>-->
          <!--<div class="col-xs-3 text-center">-->
            <!--<div class="col-data">{{parseFloat(item.valList[2]).toFixed(2)}}</div>-->
            <!--<div class="col-name">{{labelList[2]}}</div>-->
          <!--</div>-->
          <!--<div class="col-xs-4 text-right">-->
            <!--<div class="col-data text-red">{{parseFloat(item.valList[3]).toFixed(2)}}</div>-->
            <!--<div class="col-name">{{labelList[3]}}</div>-->
          <!--</div>-->
          <!--<div class="col-xs-1">-->
            <!--<div class="text-detail" @click="enter_detail(item.valList[4],defaultType)">-->
              <!--<i class="more-detail"></i>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>
    <div class="box-item" v-if="dataList.length==0">
      <p>暂无数据</p>
    </div>
    <div class="pagination-wrap" v-if="pages>=1">
      <pagination
        :page-index="currentPage"
        :pages="pages"
        :total="total"
        :page-size="pageSize"
        @change="pageChange">
      </pagination>
    </div>
  </div>
</template>

<script>
  import pagination from '../common/pagination'

  export default {
    name: "record-type",
    props: {
      dataList: {
        type: Array
      },
      labelList: {
        type: Array
      },
      valList: {
        type: Array
      },
      currentPage: {
        type: Number,
        default: 1
      },
      pages: {
        type: Number,
        default: 1
      },
      total: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 5
      }
    },
    created(){
      console.log('labelList',this.labelList[0])
    },
    data() {
      return {}
    },
    methods: {
      pageChange() {
        this.$emit('pageChange')
      }
    },
    components: {
      pagination
    },
  }
</script>

<style scoped>

</style>
