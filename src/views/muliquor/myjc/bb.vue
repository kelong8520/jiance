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
      <el-table-column label="化料编码" align="center" width="80">
        <template slot-scope="scope">
          <div>{{scope.row.serialNo}}</div>
        </template>
      </el-table-column>
      <el-table-column label="化料桶号" align="center" width="85">
        <template slot-scope="scope">
          <div>{{scope.row.barrelNo}}</div>
        </template>
      </el-table-column>
      <el-table-column label="配方号" align="center" width="70">
        <template slot-scope="scope">
          <div>{{scope.row.recipeNo}}</div>
        </template>
      </el-table-column>
      <el-table-column label="项目明细" align="center" width="100">
        <template slot-scope="scope">
          <div>{{scope.row.detail}}</div>
        </template>
      </el-table-column>
      <el-table-column label="工艺标准值" align="center" width="100">
        <template slot-scope="scope">
          <div>{{ scope.row.standard }}</div>
        </template>
      </el-table-column>
      <el-table-column v-for="(val,index) in colsArr" :key="index" label="测试输入" align="center" width="100">
        <template slot-scope="scope">
          <div v-if="scope.$index == 7">-</div>
          <div v-else-if="scope.$index == 0">{{scope.row.col[index]}}</div>
          <div v-else>
            <el-input v-model="scope.row.col[index]"></el-input>
          </div>
        </template>
      </el-table-column>
      
    </el-table>
    <div class="show_bottom">
      <el-button @click.native="detectionClick" type="primary">检测合格</el-button>
      <el-button @click.native="addColumn" type="primary" :disabled="saveFlag">增加列</el-button>
      <el-button @click.native="saveClick" type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
import * as muyeApi from "@/api/muyeApi.js";
import querystring from "querystring";

export default {
  name: "bb",
  data() {
    return {
      textileNo: "",
      id:"",
      saveFlag: false,
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
        {
          csxm: "①经纱1",
          xmmx: "出轴  kg/百米用量",
          gybzz: "出轴  kg/百米用量",
          cswzs: ["12", "11", "42", "32"]
        }
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
    // 检测合格
    detectionClick(){
      let _data = {
        id: this.id,
      };
      muyeApi
        .finishModulation(querystring.stringify(_data))
        .then(res => {
          this.$message({ message: res.tipInfo, duration: 2000 });
          this.loadInfo();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 保存
    saveClick() {
      this.saveFlag = false;
      let _data = this.detailData;
      muyeApi
        .addShaoguanLiquorCheckData(_data)
        .then(res => {
          this.$message({ message: res.msg, duration: 2000 });
          this.loadInfo();
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
      muyeApi
        .selectshaoguanLiquorCheckOnAddPage(querystring.stringify(_data))
        .then(res => {
          this.detailData = res.data;
          this.colsArr = res.data[0].col;
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadInfo() {
      let _data = {
        id: this.id,
        kind: 0
      };
      muyeApi
        .selectshaoguanLiquorCheckOnAddPage(querystring.stringify(_data))
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