// 展示界面
import api from "@/utils/http"

// 展示
// 展示界面数据查询
export const ShowshaoguanProcessCheckData = (data) => {
    return api({
        url: "/api/check/ShowshaoguanProcessCheckData",
        method: "post",
        data
    })
}
// 根据色号和浆染类型（绳染/片染）查询标准
export const getStandardData = (data) => {
    return api({
        url: "/api/check/getStandardData",
        method: "post",
        data
    })
}
// 获取textileNO
export const getTextileNoData = (data) => {
    return api({
        url: "/api/check/getTextileNoData",
        method: "post",
        data
    })
}



//  办公室汇总
// 品种-缸号数据
// export const ShowshaoguanProcessCheckDataAll = (data) => {
//     return api({
//         url: "/api/check/ShowshaoguanProcessCheckDataAll",
//         method: "post",
//         data
//     })
// }





// 韶关数据导出
// 浆染
export const getData = (data) => {
    return api({
        url: "/api/Jiangran/getData",
        method: "post",
        data
    })
}
// excel 数据
export const outExcelJR = (data) => {
    return api({
        url: "/api/Jiangran/outExcelJR",
        method: "post",
        data
    })
}


// 后整
export const getDataHouZheng = (data) => {
    return api({
        url: "/api/houzheng/getData",
        method: "post",
        data
    })
}
// excel 数据
export const outExcelHZ  = (data) => {
    return api({
        url: "/api/houzheng/outExcelHZ",
        method: "post",
        data
    })
}










