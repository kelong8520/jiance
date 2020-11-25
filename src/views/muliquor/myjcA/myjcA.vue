<template>
  <div class="lxpz_wrap">
    <h2 style="marginBottom:20px;fontSize:26px;">母液检验输入</h2>
    <el-table
      :data="detailData"
      style="width: 100%"
      max-height="660"
      :border="true"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'0px'}"
      :span-method="arraySpanMethod"
    >
      <el-table-column label="化料编码" align="center" width="110">
        <template slot-scope="scope">
          <div>{{scope.row.serialNo}}</div>
        </template>
      </el-table-column>
      <el-table-column label="化料桶号" align="center" width="110">
        <template slot-scope="scope">
          <div>{{scope.row.barrelNo}}</div>
        </template>
      </el-table-column>
      <el-table-column label="配方号" align="center" width="110">
        <template slot-scope="scope">
          <div>{{scope.row.recipeNo}}</div>
        </template>
      </el-table-column>
      <el-table-column label="项目明细" align="center" width="110">
        <template slot-scope="scope">
          <div>{{scope.row.detail}}</div>
        </template>
      </el-table-column>
      <el-table-column label="工艺标准值" align="center" width="110">
        <template slot-scope="scope">
          <div>{{ scope.row.standard }}</div>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(val,index) in colsArr"
        :key="index"
        label="测试输入"
        align="center"
        width="110"
      >
        <template slot-scope="scope">
          <div v-if="scope.$index == 7">-</div>
          <div v-if="0 < scope.$index && scope.$index < 6">
            <div
              :style="{'color': (scope.row.standard == '-' ? '#ccc':Number(scope.row.col[index])*100 >= (Number(scope.row.standardmin)*100)?(Number(scope.row.col[index])*100) <= (Number(scope.row.standardmax)*100)?'#ccc':'red':'red')}"
            >{{scope.row.col[index]}}</div>
          </div>
          <div v-else>
            <div>{{scope.row.col[index]}}</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as muyeApi from "@/api/muyeApi.js";
import querystring from "querystring";

export default {
  name: "myjcA",
  data() {
    return {
      textileNo: "",
      detailData: [],
      colsArr: [{}, {}, {}, {}] // 列数组
    };
  },
  methods: {
    // 处理复杂表格合并
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 3) {
        if (rowIndex == 0) {
          return [8, 1];
        } else {
          return [0, 0];
        }
      }
    },
    loadInfo() {
      muyeApi
        .selectshaoguanLiquorCheckOntime()
        .then(res => {
          this.detailData = res.data;
          this.colsArr = res.data[0].col;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {},
  mounted() {
    this.loadInfo();
  }
};
</script>

<style scoped>
@import "./../../../assets/css/common.css";

.table1 {
  width: 500px;
}
.table1 tr td tr td {
  border-left: none;
  border-right: none;
}
.table1 tr td tr td:last-child {
  border-bottom: none;
}
.table1 tr td tr td:first-child {
  border-top: none;
}
.table2 {
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.table2 tr td {
  height: 18px;
  border-left: none;
  border-top: none;
}
.table3 {
  width: 900px;
}
.table3 tr td {
  height: 18px;
  border-left: none;
}
.table3 tr td tr td {
  border-left: none;
}
.table3 tr td tr td:last-child {
  border-bottom: none;
}
.table3 tr td tr td:first-child {
  border-top: none;
}
.table3 th {
  border-left: none;
}
td,
th {
  text-align: center;
  border: 1px solid;
}
.table_header th {
  width: 200px;
}
tr td {
  width: 300px;
  text-align: -webkit-center;
}
td tr {
  text-align: center;
  margin: auto;
}
</style>