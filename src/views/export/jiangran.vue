<template>
  <div>
    <div class="box1">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="日期选择">
          <el-date-picker v-model="time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="searchList">检索</el-button>
        </el-form-item>
        <el-form-item>
          <download-excel :data="json_data" :fields="json_fields" :name="filename">
            <el-button type="primary">导出</el-button>
          </download-excel>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      highlight-current-row
      style="width: 100%"
      max-height="600"
      :border="true"
      :row-style="{height:'30px'}"
      :cell-style="{padding:'0px'}"
      :data="tableList"
    >
      <el-table-column property="jt" label="机台" align="center"></el-table-column>
      <el-table-column property="time" label="时间" align="center"></el-table-column>
      <el-table-column property="ylZls" label="自来水用量" align="center"></el-table-column>
      <el-table-column property="ylHys" label="回用水用量" align="center"></el-table-column>
      <el-table-column property="ylZq" label="蒸汽用量" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as displayApi from "@/api/displayinterfaceApi.js";
import querystring from "querystring";

export default {
  name: "jiangran",
  data() {
    return {
      time: "",
      newStr:"",
      filename: "浆染能耗单",
      tableList: [],
      json_fields: {
        日期: "time", //常规字段
        时间段: "interval", //常规字段
        自来水量: "zls", //常规字段
        回用水用量: "hys", //常规字段
        蒸汽用量: "zq", //常规字段
        机台: "equipmentMachine" //常规字段
      },
      json_data: [],
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 "
          }
        ]
      ]
    };
  },
  methods: {
    // 检索
    searchList() {
      let _data = {
        time: this.time
      };
      displayApi
        .getData(querystring.stringify(_data))
        .then(res => {
          this.tableList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      this.outExcel();
      const str = this.time;
      let tempArr1 = [];
      tempArr1 = str.split("-");
      this.newStr = tempArr1.join("");
      if(this.newStr == ""){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var time = year+"-"+month+"-"+day
        let tempArr2 = [];
        tempArr2 = time.split("-");
        this.newStr = tempArr2.join("");
      }else{
        this.newStr = this.newStr;
      }
      this.filename = "浆染能耗单" + this.newStr;
    },
    // 导出excel
    outExcel() {
      let _data = {
        time: this.time
      };
      displayApi
        .outExcelJR(querystring.stringify(_data))
        .then(res => {
          this.json_data = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.searchList();
  }
};
</script>

<style scoped>
</style>