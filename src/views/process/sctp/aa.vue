<template>
  <div class="lxpz_wrap">
    <h2 style="marginBottom:20px;fontSize:26px;">底水检验输入</h2>
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
        <el-table-column prop="textileNo" label="布编" align="center" width="80">
          <template slot-scope="scope">
            <div>{{scope.row.textileNo}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="batchNo" label="缸号" align="center" width="85">
          <template slot-scope="scope">
            <div>{{scope.row.batchNo}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="colorName" label="颜色" align="center" width="70">
          <template slot-scope="scope">
            <div>{{scope.row.colorName}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="length" label="整经长度" align="center" width="90">
          <template slot-scope="scope">
            <div>{{scope.row.length}}</div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="project" label="测试项目" align="center" width="100">
        <template slot-scope="scope">
          <div>{{scope.row.project}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="detail" label="项目明细" align="center" width="100">
        <template slot-scope="scope">
          <div>{{scope.row.detail}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="standard" label="工艺标准值" width="100" align="center">
        <template slot-scope="scope">
          <div>{{ scope.row.standard }}</div>
        </template>
      </el-table-column>
      <el-table-column v-for="(val,index) in colsArr" :key="index" label="测试位置" align="center" width="100">
        <template slot-scope="scope">
          <div v-if="scope.$index == 1">{{scope.row.col[index]}}</div>
          <div v-else-if="scope.$index == 21">-</div>
          <div v-else>
            <el-input v-model="scope.row.col[index]"></el-input>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="show_bottom">
      <el-button @click.native="bootClick" type="primary">开机</el-button>
      <el-button @click.native="machineClick" type="primary">了机</el-button>
      <el-button @click.native="addColumn" type="primary" :disabled="saveFlag">增加列</el-button>
      <el-button @click.native="saveClick" type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
import * as testApi from "@/api/testinputsApi.js";
import querystring from "querystring";

export default {
  name: "aa",
  data() {
    return {
      id: "",
      textileNo: "",
      saveFlag: false,
      detailData: [
        // {
        //   id: "原料",
        //   gh: "经纱",
        //   ys: "red",
        //   zjcd: "12345",
        //   csxm: "①经纱1",
        //   xmmx: "出轴  kg/百米用量",
        //   gybzz: "出轴  kg/百米用量",
        //   cswzs: ["12", "11", "42", "32"]
        // },
        // {
        //   csxm: "①经纱1",
        //   xmmx: "出轴  kg/百米用量",
        //   gybzz: "出轴  kg/百米用量",
        //   cswzs: ["12", "11", "42", "32"]
        // },
        // {
        //   csxm: "①经纱1",
        //   xmmx: "出轴  kg/百米用量",
        //   gybzz: "出轴  kg/百米用量",
        //   cswzs: ["12", "11", "42", "32"]
        // },
        // {
        //   csxm: "①经纱1",
        //   xmmx: "出轴  kg/百米用量",
        //   gybzz: "出轴  kg/百米用量",
        //   cswzs: ["12", "11", "42", "32"]
        // },
        // {
        //   csxm: "①经纱1",
        //   xmmx: "出轴  kg/百米用量",
        //   gybzz: "出轴  kg/百米用量",
        //   cswzs: ["12", "11", "42", "32"]
        // },
        // {
        //   csxm: "①经纱1",
        //   xmmx: "出轴  kg/百米用量",
        //   gybzz: "出轴  kg/百米用量",
        //   cswzs: ["12", "11", "42", "32"]
        // },
        // {
        //   csxm: "①经纱1",
        //   xmmx: "出轴  kg/百米用量",
        //   gybzz: "出轴  kg/百米用量",
        //   cswzs: ["12", "11", "42", "32"]
        // },
        // {
        //   csxm: "①经纱1",
        //   xmmx: "出轴  kg/百米用量",
        //   gybzz: "出轴  kg/百米用量",
        //   cswzs: ["12", "11", "42", "32"]
        // },
        // {
        //   csxm: "①经纱1",
        //   xmmx: "出轴  kg/百米用量",
        //   gybzz: "出轴  kg/百米用量",
        //   cswzs: ["12", "11", "42", "32"]
        // },
        // {
        //   csxm: "①经纱1",
        //   xmmx: "出轴  kg/百米用量",
        //   gybzz: "出轴  kg/百米用量",
        //   cswzs: ["12", "11", "42", "32"]
        // },
        // {
        //   csxm: "①经纱1",
        //   xmmx: "出轴  kg/百米用量",
        //   gybzz: "出轴  kg/百米用量",
        //   cswzs: ["12", "11", "42", "32"]
        // },
        // {
        //   csxm: "①经纱1",
        //   xmmx: "出轴  kg/百米用量",
        //   gybzz: "出轴  kg/百米用量",
        //   cswzs: ["12", "11", "42", "32"]
        // },
        // {
        //   csxm: "①经纱1",
        //   xmmx: "出轴  kg/百米用量",
        //   gybzz: "出轴  kg/百米用量",
        //   cswzs: ["12", "11", "42", "32"]
        // },
        // {
        //   csxm: "①经纱1",
        //   xmmx: "出轴  kg/百米用量",
        //   gybzz: "出轴  kg/百米用量",
        //   cswzs: ["12", "11", "42", "32"]
        // },
        // {
        //   csxm: "①经纱1",
        //   xmmx: "出轴  kg/百米用量",
        //   gybzz: "出轴  kg/百米用量",
        //   cswzs: ["12", "11", "42", "32"]
        // },
        // {
        //   csxm: "①经纱1",
        //   xmmx: "出轴  kg/百米用量",
        //   gybzz: "出轴  kg/百米用量",
        //   cswzs: ["12", "11", "42", "32"]
        // },
        // {
        //   csxm: "①经纱1",
        //   xmmx: "出轴  kg/百米用量",
        //   gybzz: "出轴  kg/百米用量",
        //   cswzs: ["12", "11", "42", "32"]
        // },
        // {
        //   csxm: "①经纱1",
        //   xmmx: "出轴  kg/百米用量",
        //   gybzz: "出轴  kg/百米用量",
        //   cswzs: ["12", "11", "42", "32"]
        // },
        // {
        //   csxm: "①经纱1",
        //   xmmx: "出轴  kg/百米用量",
        //   gybzz: "出轴  kg/百米用量",
        //   cswzs: ["12", "11", "42", "32"]
        // },
        // {
        //   csxm: "①经纱1",
        //   xmmx: "出轴  kg/百米用量",
        //   gybzz: "出轴  kg/百米用量",
        //   cswzs: ["12", "11", "42", "32"]
        // },
        // {
        //   csxm: "①经纱1",
        //   xmmx: "出轴  kg/百米用量",
        //   gybzz: "出轴  kg/百米用量",
        //   cswzs: ["12", "11", "42", "32"]
        // }
      ],
      colsArr: [] // 列数组
    };
  },
  beforeRouteUpdate(to, from, next) {
    //next方法使URL显示正常
    next();
    //数据改变的方法（此处为自定义的数据改变方法）
    this.id = to.query.id;
    this.loadInfo();
  },
  methods: {
    // 开机
    bootClick(row) {
      this.$confirm("确认开机?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let _data = {
            id: this.id,
          };
          testApi
            .startingUpMachine(querystring.stringify(_data))
            .then(res => {
              if (res.data == false) {
                this.$message({ message: res.tipInfo, duration: 2000 });
              } else {
                this.$message({ message: res.tipInfo, duration: 2000 });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    // 了机
    machineClick(row) {
      this.$confirm("确认了机?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let _data = {
            id: this.id,
          };
          testApi
            .closingMachine(querystring.stringify(_data))
            .then(res => {
              this.$message({ message: res.tipInfo, duration: 2000 });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    // 保存
    saveClick() {
      this.saveFlag = false;
      let _data = this.detailData;
      testApi
        .addshaoguanProcessCheckData(_data)
        .then(res => {
          this.$message({ message: res.msg, duration: 2000 });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 增加列
    addColumn() {
      this.saveFlag = true;
      let _data = {
        id: this.id,
        kind: 1
      };
      testApi
        .selectshaoguanProcessCheckOnAddPage(querystring.stringify(_data))
        .then(res => {
          this.detailData = res.data;
          this.colsArr = res.data[0].col;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 处理复杂表格合并
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 3) {
        if (rowIndex == 0) {
          return [22, 1];
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
          return [1, 1];
        } else if (rowIndex == 21) {
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
        .selectshaoguanProcessCheckOnAddPage(querystring.stringify(_data))
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
@import "./../../../assets/css/common.css";
</style>