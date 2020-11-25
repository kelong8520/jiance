// 历史数据
import api from "@/utils/http"

// 历史记录左边栏目  / 检索
export const getCheckMainList = (data) => {
    return api({
        url: "/api/check/getCheckMainList",
        method: "post",
        data
    })
}
// 标准 
export const selectshaoguanProcessCheck = (data) => {
    return api({
        url: "/api/check/selectshaoguanProcessCheck",
        method: "post",
        data
    })
}

