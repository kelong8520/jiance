// 登录
import api from "@/utils/http"

export const login = (data) => {
    return api({
        url: "/api/login/login",
        method: "post",
        data
    })
}
