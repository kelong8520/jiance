// 磊哥不好使接口测试
// export const excel2pdf = (data) => {
//     return api({
//         url: "/api/change/excel2pdf",
//         method: "post",
//         data
//     })
// }




// 韶关过程
import api from "@/utils/http"

// 过程检测输入
// 查询韶关浆染计划
export const getData = (data) => {
    return api({
        url: "/api/check/getData",
        method: "post",
        data
    })
}
// 查询检测数据(完成)
export const selectshaoguanProcessCheckOnAddPage = (data) => {
    return api({
        url: "/api/check/selectshaoguanProcessCheckOnAddPage",
        method: "post",
        data
    })
}
// 查询检测数据(完成)
export const addshaoguanProcessCheckData = (data) => {
    return api({
        url: "/api/check/addshaoguanProcessCheckData",
        method: "post",
        data
    })
}



// 过程检测机台展示
// 机台展示
export const ShowshaoguanProcessCheckData = (data) => {
    return api({
        url: "/api/check/ShowshaoguanProcessCheckData",
        method: "post",
        data
    })
}
// 机台添加
export const addShowshaoguanProcessCheckData = (data) => {
    return api({
        url: "/api/check/addShowshaoguanProcessCheckData",
        method: "post",
        data
    })
}
// 颜色评定查看
export const ShowshaoguanProcessColorCheckData = (data) => {
    return api({
        url: "/api/check/ShowshaoguanProcessColorCheckData",
        method: "post",
        data
    })
}
// 颜色评定添加
export const AddshaoguanProcessColorCheckData = (data) => {
    return api({
        url: "/api/check/AddshaoguanProcessColorCheckData",
        method: "post",
        data
    })
}


// 历史记录
// 历史记录首页
export const getHistoryProgressMain = (data) => {
    return api({
        url: "/api/history/getHistoryProgressMain",
        method: "post",
        data
    })
}
// 点击详情按钮
export const ShowshaoguanProcessCheckData1 = (data) => {
    return api({
        url: "/api/history/ShowshaoguanProcessCheckData",
        method: "post",
        data
    })
}





// 开机
export const startingUpMachine = (data) => {
    return api({
        url: "/api/check/startingUpMachine",
        method: "post",
        data
    })
}
// 了机
export const closingMachine = (data) => {
    return api({
        url: "/api/check/closingMachine",
        method: "post",
        data
    })
}



