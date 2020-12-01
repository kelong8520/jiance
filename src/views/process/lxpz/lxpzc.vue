<template>
  <div class="lxpz_wrap">
    <h2 style="marginBottom:20px;fontSize:26px;">C机过程测试跟踪</h2>
    <el-table
      :data="detailData"
      style="width: 100%"
      :border="true"
      :row-style="{height:'20px'}"
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
      <el-table-column prop="project" label="测试项目" align="center" width="110">
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
      <el-table-column
        v-for="(val,index) in colsArr"
        :key="index"
        label="测试位置"
        align="center"
        width="120px"
      >
        <template slot-scope="scope">
          <div v-if="scope.$index<20">
            <div
              :style="{'color': (scope.row.standard == '-' ? '#606060':Number(scope.row.col[index])*100 >= (Number(scope.row.standardmin)*100)?(Number(scope.row.col[index])*100) <= (Number(scope.row.standardmax)*100)?'#606060':'red':'red')}"
            >{{scope.row.col[index]}}</div>
          </div>
          <div v-if="19 < scope.$index && scope.$index < 31">
            <el-input v-model="scope.row.col[index]"></el-input>
          </div>
          <div v-if="30 < scope.$index && scope.$index < 36 && index < 10">
            <!-- <el-input v-if="index % 2 == 0" v-model="scope.row.col[index]"></el-input>
            <div v-else>{{scope.row.col[index]}}</div> -->
            <div v-if="index % 2 == 0">{{scope.row.col[index]}}</div>
            <el-input v-else v-model="scope.row.col[index]"></el-input>
          </div>
          <div v-if="scope.$index == 36">-</div>
        </template>
      </el-table-column>
    </el-table>
    <div class="show_bottom">
      <el-button @click.native="saveClick" type="primary" style="width:150px;">保存</el-button>
    </div>
    <!-- <el-table
      :data="colorData"
      style="width: 100%;margin:20px 0 0"
      max-height="500"
      :border="true"
      :row-style="{height:'20px'}"
      :show-header="false"
      :span-method="colorSpanMethod"
    >
      <el-table-column prop="project" align="center"></el-table-column>
      <el-table-column prop="project" align="center"></el-table-column>
      <el-table-column prop="project" align="center"></el-table-column>
      <el-table-column align="center" width="100">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">
            <el-select v-model="scope.row.shifo">
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>

          </div>
          <div v-if="scope.$index == 1">
            <el-select v-model="scope.row.a">
              <el-option label="偏深" value="1"></el-option>
              <el-option label="偏浅" value="2"></el-option>
            </el-select>
          </div>
          <div v-if="scope.$index == 2">
            <el-select v-model="scope.row.b">
              <el-option label="轻微" value="1"></el-option>
              <el-option label="严重" value="2"></el-option>
            </el-select>
          </div>
          <div v-if="scope.$index == 3">
            <el-select v-model="scope.row.c">
              <el-option label="青光" value="1"></el-option>
              <el-option label="红光" value="2"></el-option>
            </el-select>
          </div>
          <div v-if="scope.$index == 4">
            <el-select v-model="scope.row.d">
              <el-option label="轻微" value="1"></el-option>
              <el-option label="严重" value="2"></el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="project" align="center"></el-table-column>

      <el-table-column prop="project" align="center" width="100">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">
            <el-input-number v-model="scope.row.project" :controls="false" :min="0"></el-input-number>
          </div>
          <div v-if="scope.$index == 1">
            <el-select v-model="scope.row.a">
              <el-option label="偏深" value="1"></el-option>
              <el-option label="偏浅" value="2"></el-option>
            </el-select>
          </div>
          <div v-if="scope.$index == 2">
            <el-select v-model="scope.row.b">
              <el-option label="轻微" value="1"></el-option>
              <el-option label="严重" value="2"></el-option>
            </el-select>
          </div>
          <div v-if="scope.$index == 3">
            <el-select v-model="scope.row.c">
              <el-option label="青光" value="1"></el-option>
              <el-option label="红光" value="2"></el-option>
            </el-select>
          </div>
          <div v-if="scope.$index == 4">
            <el-select v-model="scope.row.d">
              <el-option label="轻微" value="1"></el-option>
              <el-option label="严重" value="2"></el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="project" align="center" width="100">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">
            <el-input-number v-model="scope.row.project" :controls="false" :min="0"></el-input-number>
          </div>
          <div v-if="scope.$index == 1">
            <el-select v-model="scope.row.a">
              <el-option label="偏深" value="1"></el-option>
              <el-option label="偏浅" value="2"></el-option>
            </el-select>
          </div>
          <div v-if="scope.$index == 2">
            <el-select v-model="scope.row.b">
              <el-option label="轻微" value="1"></el-option>
              <el-option label="严重" value="2"></el-option>
            </el-select>
          </div>
          <div v-if="scope.$index == 3">
            <el-select v-model="scope.row.c">
              <el-option label="青光" value="1"></el-option>
              <el-option label="红光" value="2"></el-option>
            </el-select>
          </div>
          <div v-if="scope.$index == 4">
            <el-select v-model="scope.row.d">
              <el-option label="轻微" value="1"></el-option>
              <el-option label="严重" value="2"></el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="project" align="center" width="100">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">{{scope.row.mi}}</div>
          <div v-if="scope.$index == 1">
            <el-select v-model="scope.row.a">
              <el-option label="偏深" value="1"></el-option>
              <el-option label="偏浅" value="2"></el-option>
            </el-select>
          </div>
          <div v-if="scope.$index == 2">
            <el-select v-model="scope.row.b">
              <el-option label="轻微" value="1"></el-option>
              <el-option label="严重" value="2"></el-option>
            </el-select>
          </div>
          <div v-if="scope.$index == 3">
            <el-select v-model="scope.row.c">
              <el-option label="青光" value="1"></el-option>
              <el-option label="红光" value="2"></el-option>
            </el-select>
          </div>
          <div v-if="scope.$index == 4">
            <el-select v-model="scope.row.d">
              <el-option label="轻微" value="1"></el-option>
              <el-option label="严重" value="2"></el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="project" align="center" width="100">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">
            <el-input-number v-model="scope.row.project" :controls="false" :min="0"></el-input-number>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="project" align="center" width="100">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">
            <el-input-number v-model="scope.row.project" :controls="false" :min="0"></el-input-number>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="project" align="center" width="100">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">{{scope.row.mi}}</div>
        </template>
      </el-table-column>

      <el-table-column prop="project" align="center" width="100">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">
            <el-input-number v-model="scope.row.project" :controls="false" :min="0"></el-input-number>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="project" align="center" width="100">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">
            <el-input-number v-model="scope.row.project" :controls="false" :min="0"></el-input-number>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="project" align="center" width="100">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">{{scope.row.mi}}</div>
        </template>
      </el-table-column>
    </el-table> -->
    <el-table
      :data="colorData"
      style="width: 100%;margin:20px 0 0"
      max-height="500"
      :border="true"
      :row-style="{height:'20px'}"
      :show-header="false"
      :span-method="colorSpanMethod"
    >
      <el-table-column prop="project" align="center"></el-table-column>
      <el-table-column prop="xiangmuMain" align="center"></el-table-column>
      <el-table-column prop="mingxi" align="center"></el-table-column>
      <el-table-column align="center" width="160">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">
            <el-radio v-model="scope.row.mingxiValue" label="1">是</el-radio>
            <el-radio v-model="scope.row.mingxiValue" label="2">否</el-radio>
          </div>
          <div v-if="scope.$index == 1">
            <el-radio v-model="scope.row.mingxiValue" label="1">偏深</el-radio>
            <el-radio v-model="scope.row.mingxiValue" label="2">偏浅</el-radio>
          </div>
          <div v-if="scope.$index == 2">
            <el-radio v-model="scope.row.mingxiValue" label="1">轻微</el-radio>
            <el-radio v-model="scope.row.mingxiValue" label="2">严重</el-radio>
          </div>
          <div v-if="scope.$index == 3">
            <el-radio v-model="scope.row.mingxiValue" label="1">青光</el-radio>
            <el-radio v-model="scope.row.mingxiValue" label="2">红光</el-radio>
          </div>
          <div v-if="scope.$index == 4">
            <el-radio v-model="scope.row.mingxiValue" label="1">轻微</el-radio>
            <el-radio v-model="scope.row.mingxiValue" label="2">严重</el-radio>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="empty" align="center"></el-table-column>

      <el-table-column align="center" width="100">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">
            <el-input-number v-model="scope.row.xiangmuMin1" :controls="false" :min="0"></el-input-number>
          </div>
          <div v-if="scope.$index == 1">
            <el-radio v-model="scope.row.xiangmuMin1" label="1">偏深</el-radio>
            <el-radio v-model="scope.row.xiangmuMin1" label="2">偏浅</el-radio>
          </div>
          <div v-if="scope.$index == 2">
            <el-radio v-model="scope.row.xiangmuMin1" label="1">轻微</el-radio>
            <el-radio v-model="scope.row.xiangmuMin1" label="2">严重</el-radio>
          </div>
          <div v-if="scope.$index == 3">
            <el-radio v-model="scope.row.xiangmuMin1" label="1">青光</el-radio>
            <el-radio v-model="scope.row.xiangmuMin1" label="2">红光</el-radio>
          </div>
          <div v-if="scope.$index == 4">
            <el-radio v-model="scope.row.xiangmuMin1" label="1">轻微</el-radio>
            <el-radio v-model="scope.row.xiangmuMin1" label="2">严重</el-radio>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">
            <el-input-number v-model="scope.row.xiangmuMax1" :controls="false" :min="0"></el-input-number>
          </div>
          <div v-if="scope.$index == 1">
            <el-radio v-model="scope.row.xiangmuMin2" label="1">偏深</el-radio>
            <el-radio v-model="scope.row.xiangmuMin2" label="2">偏浅</el-radio>
          </div>
          <div v-if="scope.$index == 2">
            <el-radio v-model="scope.row.xiangmuMin2" label="1">轻微</el-radio>
            <el-radio v-model="scope.row.xiangmuMin2" label="2">严重</el-radio>
          </div>
          <div v-if="scope.$index == 3">
            <el-radio v-model="scope.row.xiangmuMin2" label="1">青光</el-radio>
            <el-radio v-model="scope.row.xiangmuMin2" label="2">红光</el-radio>
          </div>
          <div v-if="scope.$index == 4">
            <el-radio v-model="scope.row.xiangmuMin2" label="1">轻微</el-radio>
            <el-radio v-model="scope.row.xiangmuMin2" label="2">严重</el-radio>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">{{scope.row.danwei1}}</div>
          <div v-if="scope.$index == 1">
            <el-radio v-model="scope.row.xiangmuMin3" label="1">偏深</el-radio>
            <el-radio v-model="scope.row.xiangmuMin3" label="2">偏浅</el-radio>
          </div>
          <div v-if="scope.$index == 2">
            <el-radio v-model="scope.row.xiangmuMin3" label="1">轻微</el-radio>
            <el-radio v-model="scope.row.xiangmuMin3" label="2">严重</el-radio>
          </div>
          <div v-if="scope.$index == 3">
            <el-radio v-model="scope.row.xiangmuMin3" label="1">青光</el-radio>
            <el-radio v-model="scope.row.xiangmuMin3" label="2">红光</el-radio>
          </div>
          <div v-if="scope.$index == 4">
            <el-radio v-model="scope.row.xiangmuMin3" label="1">轻微</el-radio>
            <el-radio v-model="scope.row.xiangmuMin3" label="2">严重</el-radio>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">
            <el-input-number v-model="scope.row.xiangmuMin2" :controls="false" :min="0"></el-input-number>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">
            <el-input-number v-model="scope.row.xiangmuMax2" :controls="false" :min="0"></el-input-number>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">{{scope.row.danwei2}}</div>
        </template>
      </el-table-column>

      <el-table-column  align="center" width="100">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">
            <el-input-number v-model="scope.row.xiangmuMin3" :controls="false" :min="0"></el-input-number>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">
            <el-input-number v-model="scope.row.xiangmuMax3" :controls="false" :min="0"></el-input-number>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0">{{scope.row.danwei3}}</div>
        </template>
      </el-table-column>
    </el-table>
    <div class="show_bottom">
      <el-button @click.native="saveColorClick" type="primary" style="width:150px;">保存</el-button>
    </div>
  </div>
</template>

<script>
import * as testApi from "@/api/testinputsApi.js";
import querystring from "querystring";

export default {
  name: "lxpzc",
  data() {
    return {
      textileNo: "",
      detailData: [],
      colorData: [
        { project: 55, shifo: "是", mi: "米" },
        { project: 55, a: "偏深" },
        { project: 55, b: "严重", project: 55 },
        { project: 55, c: "青光", project: 55 },
        { project: 55, d: "轻微", project: 55 }
      ],
      colsArr: [] // 列数组
    };
  },
  methods: {
     // 下半部分保存
    saveColorClick() {
      this.colorData.forEach((item,index)=>{
        this.$set(item,"machineNo","C")
      })
      let _data = this.colorData;
      testApi
        .AddshaoguanProcessColorCheckData(_data)
        .then(res => {
          this.$message({ message: res.tipInfo, duration: 2000 });
          this.loadColorInfo();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 下半部分表格处理
    colorSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 1) {
        if (rowIndex == 0) {
          return [5, 1];
        } else {
          return [0, 0];
        }
      }
      if (columnIndex == 4) {
        if (rowIndex == 0) {
          return [5, 1];
        } else {
          return [0, 0];
        }
      }
      if (columnIndex == 2) {
        if (rowIndex == 0) {
          return [1, 1];
        } else if (rowIndex == 1) {
          return [2, 1];
        } else if (rowIndex == 3) {
          return [2, 1];
        } else if (rowIndex == 5) {
          return [1, 1];
        } else {
          return [0, 0];
        }
      }
      if (columnIndex >= 4) {
        if (rowIndex >= 1) {
          return [1, 3];
        } else {
          return [1, 1];
        }
      }
    },
    // 上半部分表格处理
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
        } else {
          return [0, 0];
        }
      }
    },
    // 上半部分保存
    saveClick() {
      let _data = this.detailData;
      testApi
        .addShowshaoguanProcessCheckData(_data)
        .then(res => {
          this.$message({ message: res.tipInfo, duration: 2000 });
          this.loadInfo();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 下半部分 
    loadColorInfo(){
      let _data = {
        machineNo: "C"
      };
      testApi
        .ShowshaoguanProcessColorCheckData(querystring.stringify(_data))
        .then(res => {
          this.colorData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 上半部分
    loadInfo() {
      let _data = {
        machineNo: "C"
      };
      testApi
        .ShowshaoguanProcessCheckData(querystring.stringify(_data))
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
    this.loadColorInfo();
  }
};
</script>

<style scoped>
@import "./../../../assets/css/common.css";
</style>