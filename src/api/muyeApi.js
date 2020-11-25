// 韶关母液
import api from "@/utils/http"

// 母液检测
// 首界面展示
export const getMainData = (data) => {
    return api({
        url: "/api/liquor/getMainData",
        method: "post",
        data
    })
}
// 检测合格
export const finishModulation = (data) => {
    return api({
        url: "/api/liquor/finishModulation",
        method: "post",
        data
    })
}
// 编辑展示界面
export const selectshaoguanLiquorCheckOnAddPage = (data) => {
    return api({
        url: "/api/liquor/selectshaoguanLiquorCheckOnAddPage",
        method: "post",
        data
    })
}
// 母液检测保存
export const addShaoguanLiquorCheckData = (data) => {
    return api({
        url: "/api/liquor/addShaoguanLiquorCheckData",
        method: "post",
        data
    })
}
// 机台展示界面
export const selectshaoguanLiquorCheckOntime = (data) => {
    return api({
        url: "/api/liquor/selectshaoguanLiquorCheckOntime",
        method: "post",
        data
    })
}



