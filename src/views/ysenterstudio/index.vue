
<template>
    <BasicLayout>
        <template #wrapper>
            <el-card class="box-card">
                <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
                    <el-form-item label="画室名字" prop="title">
                                <el-input v-model="queryParams.title" placeholder="请输入画室名字" clearable
                                              size="small" @keyup.enter.native="handleQuery"/>
                            </el-form-item>
                        <el-form-item label="画室logo" prop="logo">
                                <el-input v-model="queryParams.logo" placeholder="请输入画室logo" clearable
                                              size="small" @keyup.enter.native="handleQuery"/>
                            </el-form-item>
                        
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                    </el-form-item>
                </el-form>

                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                                v-permisaction="['ysenterstudio:ysenterstudio:add']"
                                type="primary"
                                icon="el-icon-plus"
                                size="mini"
                                @click="handleAdd"
                        >新增
                        </el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                                v-permisaction="['ysenterstudio:ysenterstudio:edit']"
                                type="success"
                                icon="el-icon-edit"
                                size="mini"
                                :disabled="single"
                                @click="handleUpdate"
                        >修改
                        </el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                                v-permisaction="['ysenterstudio:ysenterstudio:remove']"
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                :disabled="multiple"
                                @click="handleDelete"
                        >删除
                        </el-button>
                    </el-col>
                </el-row>

                <el-table v-loading="loading" :data="ysenterstudioList" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" align="center"/><el-table-column label="画室名字" align="center" prop="title"
                                                 :show-overflow-tooltip="true"/><el-table-column label="画室logo" align="center" prop="logo"
                                                 :show-overflow-tooltip="true"/>
                    <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                        <template slot-scope="scope">
                            <el-button
                                    v-permisaction="['ysenterstudio:ysenterstudio:edit']"
                                    size="mini"
                                    type="text"
                                    icon="el-icon-edit"
                                    @click="handleUpdate(scope.row)"
                            >修改
                            </el-button>
                            <el-button
                                    v-permisaction="['ysenterstudio:ysenterstudio:remove']"
                                    size="mini"
                                    type="text"
                                    icon="el-icon-delete"
                                    @click="handleDelete(scope.row)"
                            >删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <pagination
                        v-show="total>0"
                        :total="total"
                        :page.sync="queryParams.pageIndex"
                        :limit.sync="queryParams.pageSize"
                        @pagination="getList"
                />

                <!-- 添加或修改对话框 -->
                <el-dialog :title="title" :visible.sync="open" width="500px">
                    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                        
                                    <el-form-item label="画室名字" prop="title">
                                        <el-input v-model="form.title" placeholder="画室名字"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="画室logo" prop="logo">
                                        <el-input v-model="form.logo" placeholder="画室logo"
                                                      />
                                    </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="submitForm">确 定</el-button>
                        <el-button @click="cancel">取 消</el-button>
                    </div>
                </el-dialog>
            </el-card>
        </template>
    </BasicLayout>
</template>

<script>
    import {addYsEnterStudio, delYsEnterStudio, getYsEnterStudio, listYsEnterStudio, updateYsEnterStudio} from '@/api/ysenterstudio'

    export default {
        name: 'Config',
        data() {
            return {
                // 遮罩层
                loading: true,
                // 选中数组
                ids: [],
                // 非单个禁用
                single: true,
                // 非多个禁用
                multiple: true,
                // 总条数
                total: 0,
                // 弹出层标题
                title: '',
                // 是否显示弹出层
                open: false,
                isEdit: false,
                // 类型数据字典
                typeOptions: [],
                ysenterstudioList: [],
                
                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,
            title:
            undefined,
            logo:
            undefined,
            
        },
            // 表单参数
            form: {
            }
        ,
            // 表单校验
            rules: {title:
                [
                    {required: true, message: '画室名字不能为空', trigger: 'blur'}
                ],
                logo:
                [
                    {required: true, message: '画室logo不能为空', trigger: 'blur'}
                ],
                }
        }
        },
        created() {
            this.getList()
            },
        methods: {
            /** 查询参数列表 */
            getList() {
                this.loading = true
                listYsEnterStudio(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.ysenterstudioList = response.data.list
                        this.total = response.data.count
                        this.loading = false
                    }
                )
            },
            // 取消按钮
            cancel() {
                this.open = false
                this.reset()
            },
            // 表单重置
            reset() {
                this.form = {
                
                enterStudioId: undefined,
                title: undefined,
                logo: undefined,
            }
                this.resetForm('form')
            },
            

            /** 搜索按钮操作 */
            handleQuery() {
                this.queryParams.pageIndex = 1
                this.getList()
            },
            /** 重置按钮操作 */
            resetQuery() {
                this.dateRange = []
                this.resetForm('queryForm')
                this.handleQuery()
            },
            /** 新增按钮操作 */
            handleAdd() {
                this.reset()
                this.open = true
                this.title = '添加YsEnterStudio'
                this.isEdit = false
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.enterStudioId)
                this.single = selection.length !== 1
                this.multiple = !selection.length
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset()
                const enterStudioId =
                row.enterStudioId || this.ids
                getYsEnterStudio(enterStudioId).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '修改YsEnterStudio'
                    this.isEdit = true
                })
            },
            /** 提交按钮 */
            submitForm: function () {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.enterStudioId !== undefined) {
                            updateYsEnterStudio(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addYsEnterStudio(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('新增成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        }
                    }
                })
            },
            /** 删除按钮操作 */
            handleDelete(row) {
                const Ids = row.enterStudioId || this.ids
                this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    return delYsEnterStudio(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function () {
                })
            }
        }
    }
</script>
