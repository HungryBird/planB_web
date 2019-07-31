<template>
    <el-container>
        <el-header>
            <el-form :model="form.data">
                <el-form-item>
                    <el-input v-model="form.Key" placeholder="输入用户名，手机号码，真实姓名拼音简写，邮箱" style="width: 100%;">
                        <el-button slot="append" :loading="form.loading" type="primary" @click="roleList">
                            搜索
                        </el-button>
                    </el-input>
                </el-form-item>
            </el-form>
        </el-header>
        <el-main>
            <el-table :data="table.data" border v-loading="table.loading">
                <el-table-column v-for="tc in table.column" :key="tc.prop" :prop="tc.prop" :label="tc.label">
                    <template slot-scope="scope">
                        <div v-if="tc.prop === 'action'">
                            <el-button type="warning" size="small" @click="openDialog('edit', scope.row)" style="margin-right: 6px;">
                                编辑
                            </el-button>
                            <el-popover v-model="scope.row.visible" placement="top">
                                <p>您确定删除吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
                                    <el-button type="primary" size="mini" @click="del(scope.row.Id)">确定</el-button>
                                </div>
                                <el-button type="danger" size="small" slot="reference">
                                    删除
                                </el-button>
                            </el-popover>
                        </div>
                        <div v-else>
                            {{ scope.row[tc.prop] }}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer>
            <div class="pagination-fixed">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="table.PageIndex"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="table.PageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="table.Total">
                </el-pagination>
            </div>
        </el-footer>
        <el-dialog :title="dialog.title" :visible.sync="dialog.visible" @close="dialogClose">
            <el-form :model="dialog.form" :rules="dialog.rules" ref="dialogForm" label-width="120px">
                <el-form-item label="角色名称：" prop="RoleName">
                    <el-input v-model="dialog.form.RoleName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否管理员：" prop="IsAdmin">
                    <el-select v-model="dialog.form.IsAdmin">
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="confirm" :loading="dialog.loading">确 定</el-button>
            </div>
        </el-dialog>
    </el-container>
</template>

<script>
import ajax from '@/api/role'

export default {
    data() {
        return {
            dialog: {
                title: '新增',
                action: 'add',
                loading: false,
                visible: false,
                rules: {
                    RoleName: [
                        {required: true, message: '角色名不能为空'}
                    ]
                },
                form: {
                    IsAdmin: 0,
                    Id: null,
                    RoleName: '',
                }
            },
            form: {
                loading: false,
                Key: '',
            },
            table: {
                PageIndex: 1,
                PageSize: 10,
                Total: 0,
                loading: false,
                data: [],
                column: [
                    {
                        label: '角色名',
                        prop: 'RoleName',
                    },
                    {
                        label: '是否管理员',
                        prop: 'IsAdmin',
                    },
                    {
                        label: '操作',
                        prop: 'action',
                    },
                ]
            }
        }
    },
    mounted() {
        this.roleList();
    },
    methods: {
        handleSizeChange(size) {
            this.table.PageSize = size;
            this.roleList();
        },
        handleCurrentChange(page) {
            this.table.PageIndex = page;
            this.roleList();
        },
        roleList() {
            this.form.loading = true;
            const data = {
                Key: this.form.Key,
                PageIndex: this.table.PageIndex,
                PageSize: this.table.PageSize,
            }
            ajax.roleList(data).then(res => {
                if (res.Success) {
                    this.table.data = res.List.map(item => {
                        item.visible = false;
                        return item;
                    });
                    this.table.Total = res.Total;
                }
                else {
                    this.$message.error(res.Msg);
                }
                this.form.loading = false;
            })
        },
        openDialog(action, row = null) {
            this.dialog.action = action;
            this.dialog.title = action === 'add' ? '新增' : '编辑'
            this.dialog.visible = true;
            this.$nextTick(() => {
                this.$refs.dialogForm.resetFields();
                this.dialog.form.Id = null;
                if (action === 'edit') {
                    Object.assign(this.dialog.form, row);
                }
            })
        },
        dialogClose() {
            // 
        },
        confirm() {
            this.$refs.dialogForm.validate(async valid => {
                if (valid) {
                    this.dialog.loading = true;
                    const res = this.dialog.action === 'add' ? await ajax.roleAdd(this.dialog.form) : await ajax.roleUpdate(this.dialog.form);
                    if (res.Success) {
                        this.$message.success(res.Msg)
                        this.dialog.visible = false;
                        this.roleList();
                    }
                    else {
                        this.$message.error(res.Msg);
                    }
                    this.dialog.loading = false;
                }
            })
        },
        del(Id) {
            this.table.loading = true;
            ajax.roleDelete({
                Id,
            }).then(res => {
                if (res.Success) {
                    this.$message.success(res.Msg)
                    this.roleList();
                }
                else {
                    this.$message.error(res.Msg);
                }
                this.table.loading = false;
            })
        }
    }
}
</script>

<style>

</style>
