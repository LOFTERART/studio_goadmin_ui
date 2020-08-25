import request from '@/utils/request'

// 查询YsEnterStudio列表
export function listYsEnterStudio(query) {
return request({
url: '/api/v1/ysenterstudioList',
method: 'get',
params: query
})
}

// 查询YsEnterStudio详细
export function getYsEnterStudio (enterStudioId) {
return request({
url: '/api/v1/ysenterstudio/' + enterStudioId,
method: 'get'
})
}


// 新增YsEnterStudio
export function addYsEnterStudio(data) {
return request({
url: '/api/v1/ysenterstudio',
method: 'post',
data: data
})
}

// 修改YsEnterStudio
export function updateYsEnterStudio(data) {
return request({
url: '/api/v1/ysenterstudio',
method: 'put',
data: data
})
}

// 删除YsEnterStudio
export function delYsEnterStudio(enterStudioId) {
return request({
url: '/api/v1/ysenterstudio/' + enterStudioId,
method: 'delete'
})
}

