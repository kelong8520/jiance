<template>
  <div class="lxpz_wrap">
    <h2 style="marginBottom:20px;fontSize:26px;">母液生产记录表</h2>
    <el-table
      :data="detailData"
      style="width: 100%"
      max-height="660"
      :border="true"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'0px'}"
      :span-method="arraySpanMethod"
    >
      <el-table-column prop="id" label="配方号" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.id}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="gh" label="化料流水号" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.gh}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="ys" label="机台" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.ys}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="csxm" label="项目明细" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.csxm}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="xmmx" label="工艺标准值" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.xmmx}}</div>
        </template>
      </el-table-column>
      <el-table-column v-for="(val,index) in colsArr" :key="index" label="测试位置" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.cswzs[index]}}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as displayApi from "@/api/displayinterfaceApi.js";
import querystring from "querystring";

export default {
  name: "mproduction",
  data() {
    return {
      textileNo: "",
      detailData: [
        {
          id: "原料",
          gh: "经纱",
          ys: "red",
          zjcd: "12345",
          csxm: "①经纱1",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          cswzs: ["12", "11", "42", "32"]
        },
        {
          csxm: "①经纱1",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          cswzs: ["12", "11", "42", "32"]
        },
        {
          csxm: "①经纱1",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          cswzs: ["12", "11", "42", "32"]
        },
        {
          csxm: "①经纱1",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          cswzs: ["12", "11", "42", "32"]
        },
        {
          csxm: "①经纱1",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          cswzs: ["12", "11", "42", "32"]
        },
        {
          csxm: "①经纱1",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          cswzs: ["12", "11", "42", "32"]
        },
        {
          csxm: "①经纱1",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          cswzs: ["12", "11", "42", "32"]
        },
      ],
      colsArr: [{}, {}, {}, {}] // 列数组
    };
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 2) {
        if (rowIndex == 0) {
          return [7, 1];
        } else if (rowIndex == 7) {
          return [7, 1];
        } else if (rowIndex == 14) {
          return [7, 1];
        } else {
          return [0, 0];
        }
      }
    }
  },
  created() {}
};
</script>

<style scoped>
@import './../../../assets/css/common.css';

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