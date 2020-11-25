<template>
  <div class="box1">
    <div style="borderBottom: 1px solid #ccc;">
      <el-form :inline="true" class="demo-form-inline" :model="ruleForm">
        <el-form-item label="测试时间">
          <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.timeStart" @change="dateChange1"></el-date-picker>
        </el-form-item>
        <el-form-item label="——">
          <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.timeEnd" @change="dateChange2"></el-date-picker>
        </el-form-item>
        <el-form-item label="品种">
          <el-input v-model="ruleForm.colorNo"></el-input>
        </el-form-item>
        <el-form-item label="缸号">
          <el-input v-model="ruleForm.batchNo"></el-input>
        </el-form-item>
        <el-form-item label="颜色">
          <el-input v-model="ruleForm.colorName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click.native="searchList">检索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      highlight-current-row
      style="width: 100%;"
      max-height="600"
      :border="true"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'0px'}"
      :data="tablelist"
      ref="table"
    >
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <el-table-column property="machineNo" label="机台号" align="center"></el-table-column>
      <el-table-column property="textileNo" label="布编" align="center"></el-table-column>
      <el-table-column property="batchNo" label="缸号" align="center"></el-table-column>
      <el-table-column property="colorName" label="颜色" align="center"></el-table-column>
      <el-table-column property="length" label="整经长度m" align="center"></el-table-column>
      <el-table-column property="dyeingType" label="类型" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.dyeingType ==1?"绳染":"片染"}}</div>
        </template>
      </el-table-column>
      <el-table-column property="num" label="测试异常数据" align="center"></el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button
            @click.native="seeClick(scope.row)"
            type="primary"
            size="mini"
            style="margin:2px;"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="fy"
      background
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>

<script>
import * as testApi from "@/api/testinputsApi.js";
import querystring from "querystring";
import store from "@/store";

export default {
  name: "history",
  data() {
    return {
      total: 1000, //默认数据总数
      pageSize: 20, //每页的数据条数
      currentPage: 1, //默认开始页面
      tablelist: [],
      ruleForm: {}
    };
  },
  methods: {
    //处理默认选中当前日期
    getNowTime() {
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth(); //得到月份
      var date = now.getDate(); //得到日期
      month = month + 1;
      month = month.toString().padStart(2, "0");
      date = date.toString().padStart(2, "0");
      var defaultDate1 = `${year}-${month}-${date-1}`;
      var defaultDate2 = `${year}-${month}-${date}`;
      this.$set(this.ruleForm, "timeStart", defaultDate1);
      this.$set(this.ruleForm, "timeEnd", defaultDate2);
    },
    dateChange1() {},
    dateChange2() {},
    // 分页
    currentChange(currentPage) {
      this.$refs.table.bodyWrapper.scrollTop = 0;
      this.currentPage = currentPage;
      this.loadInfo();
    },
    searchList() {
      this.currentPage = 1;
      this.loadInfo();
    },
    // 编辑内容
    seeClick(row) {
      let name = "production";
      let arr = this.$store.state.tabArr.filter(item=>item.name == name).map(item=>item.id);
      let title = "生产表录入";
      
      if (arr.includes(row.id)) {
        this.$router.push({
          path: name,
          query: {
            id: row.id
          }
        });
        store.commit("modifyTabName", `${name}?${row.id}`);
      } else {
        store.commit("addTabArr", {
          name,
          title,
          id: row.id
        });
        this.$router.push({
          path: name,
          query: {
            id: row.id
          }
        });
        store.commit("modifyTabName", `${name}?${row.id}`);
      }
    },
    // 加载主界面表格信息
    loadInfo() {
      let _data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        timeStart: this.ruleForm.timeStart,
        timeEnd: this.ruleForm.timeEnd,
        colorNo: this.ruleForm.colorNo,
        batchNo: this.ruleForm.batchNo,
        colorName: this.ruleForm.colorName,
      };
      testApi
        .getHistoryProgressMain(querystring.stringify(_data))
        .then(res => {
          this.tablelist = res.data;
          this.total = res.count;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getNowTime();
    this.loadInfo();
  }
};
</script>

<style scoped>
.fy {
  text-align: center;
  margin-top: 20px;
}
</style>