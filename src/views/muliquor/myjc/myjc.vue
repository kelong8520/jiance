<template>
  <div class="box1">
    <div style="borderBottom: 1px solid #ccc;">
      <el-form :inline="true" class="demo-form-inline" :model="ruleForm">
        <el-form-item label="化料编码">
          <el-input v-model="ruleForm.serialNo"></el-input>
        </el-form-item>
        <el-form-item label="配方号">
          <el-input v-model="ruleForm.recipeNo"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click.native="searchList">检索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      highlight-current-row
      style="width: 100%;"
      :border="true"
      :height="tableHeight"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'0px'}"
      :data="tablelist"
      ref="table"
    >
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <el-table-column property="addtime" label="时间" align="center"></el-table-column>
      <el-table-column property="recipeNo" label="配方号" align="center"></el-table-column>
      <el-table-column property="barrelNo" label="化料桶号" align="center"></el-table-column>
      <el-table-column property="serialNo" label="化料编码" align="center"></el-table-column>
      <el-table-column label="是否合格" align="center">
        <template slot-scope="scope">
          <div>
            {{scope.row.qualified == 0?"不合格":"合格"}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button
            @click.native="editorClick(scope.row)"
            type="primary"
            size="mini"
            style="margin:2px;"
          >编辑</el-button>
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
import * as muyeApi from "@/api/muyeApi.js";
import querystring from "querystring";
import store from "@/store";

export default {
  name: "myjc",
  data() {
    return {
      screenHeight: document.body.clientHeight, //屏幕高度
      tableHeight: window.innerHeight - 200, //table高度
      total: 1000, //默认数据总数
      pageSize: 20, //每页的数据条数
      currentPage: 1, //默认开始页面
      colorId: "",
      tablelist: [],
      ruleForm: {}
    };
  },
  methods: {
    // 分页
    currentChange(currentPage) {
      this.$refs.table.bodyWrapper.scrollTop = 0;
      this.currentPage = currentPage;
      this.loadMainInfo();
    },
    searchList() {
      this.currentPage = 1;
      this.loadMainInfo();
    },
    // 编辑内容
    editorClick(row) {
      console.log(row)
      let name = "bb";
      let arr = this.$store.state.tabArr.filter(item=>item.name == name).map(item=>item.id);
      let title = "母液检验输入";
      
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
    loadMainInfo() {
      let _data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        serialNo: this.ruleForm.serialNo,
        recipeNo: this.ruleForm.recipeNo,
      };
      muyeApi
        .getMainData(querystring.stringify(_data))
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
    window.onresize = () => {
      this.screenHeight = document.body.clientHeight;
      this.tableHeight = this.screenHeight - 300;
    };
    this.loadMainInfo();
  }
};
</script>

<style scoped>
.addbutton1 {
  margin-left: 30px;
}
.fy {
  text-align: center;
  margin-top: 20px;
}
</style>