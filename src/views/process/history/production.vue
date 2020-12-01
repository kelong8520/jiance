<template>
  <div class="lxpz_wrap">
    <h2 style="marginBottom:20px;fontSize:26px;">过程生产记录表</h2>
    <el-table
      :data="detailData"
      style="width: 100%"
      max-height="660"
      :border="true"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'0px'}"
      :span-method="arraySpanMethod"
    >
      <el-table-column label="基本资料" align="center">
        <el-table-column prop="textileNo" label="布编" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.textileNo}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="batchNo" label="缸号" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.batchNo}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="colorName" label="颜色" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.colorName}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="length" label="整经长度" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.length}}</div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="project" label="测试项目" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.project}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="detail" label="项目明细" align="center" width="150">
        <template slot-scope="scope">
          <div>{{scope.row.detail}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="standard" label="工艺标准值" align="center" width="110">
        <template slot-scope="scope">
          <div>{{ scope.row.standard }}</div>
        </template>
      </el-table-column>
      <el-table-column v-for="(val,index) in colsArr" :key="index" label="测试位置" align="center">
        <template slot-scope="scope">
          <div v-if="scope.$index<20">
            <div
              :style="{'color': (scope.row.standard == '-' ? '#606060':Number(scope.row.col[index])*100 >= (Number(scope.row.standardmin)*100)?(Number(scope.row.col[index])*100) <= (Number(scope.row.standardmax)*100)?'#606060':'red':'red')}"
            >{{scope.row.col[index]}}</div>
          </div>
          <div v-if="19 < scope.$index && scope.$index < 37">{{scope.row.col[index]}}</div>
          <div v-else-if="scope.$index == 37">-</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as testApi from "@/api/testinputsApi.js";
import querystring from "querystring";

export default {
  name: "production",
  data() {
    return {
      id: "",
      textileNo: "",
      detailData: [],
      colsArr: [] // 列数组
    };
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 3) {
        if (rowIndex == 0) {
          return [37, 1];
        } else {
          return [0, 0];
        }
      }
      if (columnIndex == 4) {
        if (rowIndex == 0) {
          return [2, 1];
        } else if (rowIndex == 2) {
          return [1, 1];
        } else if (rowIndex == 3) {
          return [3, 1];
        } else if (rowIndex == 6) {
          return [5, 1];
        } else if (rowIndex == 11) {
          return [5, 1];
        } else if (rowIndex == 16) {
          return [2, 1];
        } else if (rowIndex == 18) {
          return [2, 1];
        } else if (rowIndex == 20) {
          return [5, 1];
        } else if (rowIndex == 25) {
          return [3, 1];
        } else if (rowIndex == 28) {
          return [1, 1];
        } else if (rowIndex == 29) {
          return [2, 1];
        } else if (rowIndex == 31) {
          return [5, 1];
        } else if (rowIndex == 36) {
          return [1, 1];
        } else if (rowIndex == 37) {
          return [1, 1];
        } else {
          return [0, 0];
        }
      }
    },
    loadInfo() {
      let _data = {
        id: this.id,
        kind: 0
      };
      testApi
        .ShowshaoguanProcessCheckData1(querystring.stringify(_data))
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
    this.id = this.$route.query.id;
    this.loadInfo();
  }
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