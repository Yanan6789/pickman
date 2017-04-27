'use babel';

import PickmanView from './pickman-view';
import {
	CompositeDisposable
} from 'atom';

export default {

	pickmanView: null,
	modalPanel: null,
	subscriptions: null,

	activate(state) {
		this.pickmanView = new PickmanView(state.pickmanViewState);
		this.modalPanel = atom.workspace.addModalPanel({
			item: this.pickmanView.getElement(),
			visible: false
		});

		// Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
		this.subscriptions = new CompositeDisposable();

		// Register command that toggles this view
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'pickman:toggle': () => this.toggle()
		}));
	},

	deactivate() {
		this.modalPanel.destroy();
		this.subscriptions.dispose();
		this.pickmanView.destroy();
	},

	serialize() {
		return {
			pickmanViewState: this.pickmanView.serialize()
		};
	},

	toggle() {

		if (editor = atom.workspace.getActiveTextEditor()) {


			let selection = editor.getSelectedText()
			let cursorPosition = editor.getCursorBufferPositions()
			let currentRow = cursorPosition[0].row
			let current_text = ''
			if (cursorPosition.length === 1) {
				current_text = editor.lineTextForBufferRow(currentRow).trim()
			}

			console.log(current_text)
			switch (current_text) {
				case 'el-input':
					let temp1 = '<el-input v-model="input" placeholder="请输入内容"></el-input>'
					editor.deleteToBeginningOfLine()
					editor.insertText(temp1)
					break;
				case 'el-tep':
					let temp2 =
						`
<el-col class="content list">
  <el-form :inline="true" :model="filter" label-width="120px">
    <el-form-item label="操作类型">
        <el-select placeholder="请选择"  v-model="filter.opType">
          <el-option
            v-for="item in typeOptions"
            :label="item.label"
            :value="item.value" :key="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请部门">
        <el-select placeholder="请选择"  v-model="filter.section">
          <el-option
            v-for="item in sectionOptions"
            :label="item.label"
            :value="item.value" :key="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请状态">
        <el-select placeholder="请选择"  v-model="filter.status">
          <el-option
            v-for="item in statusOptions"
            :label="item.label"
            :value="item.value" :key="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作人">
        <el-input v-model="filter.operator"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="functionName">查询</el-button>
      </el-form-item>
  </el-form>
  <el-button type="primary" class="jumpBudgetSet" @click="functionName">新建按钮</el-button>
  <el-table
      :data="tableData"
      border
      style="width: 100%">
          <el-table-column
            label="编号"
            prop="id">
          </el-table-column>
          <el-table-column
            label="操作类型"
            prop="op_type">
          </el-table-column>
          <el-table-column
            label="申请部门"
            prop="section_name">
          </el-table-column>
          <el-table-column
            label="申请状态"
            prop="state_str">
          </el-table-column>
          <el-table-column
              prop="operate_time"
              label="提交时间" width="200">
          </el-table-column>
          <el-table-column
              prop="operator"
              label="操作人">
          </el-table-column>
          <el-table-column
              inline-template
              :context="_self"
              label="表单详情"
              width="200">
            <span>
              <el-button type="button" size="small"  @click="functionName(row.id)">查看</el-button>
            <template v-if="row.state == 3">
              <el-button type="button" size="small"  @click="functionName(row.id)">编辑</el-button>
            </template>
            <template v-if="row.state == 0">
              <el-button type="button" size="small"  @click="functionName(row.id)">撤回</el-button>
            </template>
            </span>
          </el-table-column>
  </el-table>
  <div class="page">
      <el-pagination
          @current-change="changePage"
          @size-change="changeSize"
          :current-page="pageData.page"
          :page-size="pageData.limit"
          :page-sizes="[5, 10, 20, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageData.total">
      </el-pagination>
  </div>
  <el-dialog title="提示" v-model="dialogVisible" size="tiny">
    <span>此处编辑弹框内容</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm_drop">确 定</el-button>
    </span>
  </el-dialog>
</el-col>

`;
					editor.deleteToBeginningOfLine()
					editor.insertText(temp2)
					break;
				case 'el-js':
					let temp3 =
						`
/*
 * @author pearyman
 * @file file description
 */

/**
 * @static
 * @description 引用模板文件
 */
const template = __inline('./vue.tpl')
/**
 * @static
 * @description 引用vue-ajax方法
 */
require('nerve_cfecommon:static/utils/vue-ajax.js')

const utils = require('nerve_cfecommon:static/utils/utils.js')

module.exports = {

    init: function(res) {
        const data = res;
        new Vue({
            el: '#content',
            template: template,
            data: function() {
                return {
                    typeOptions: [{
                        label: '全部',
                        value: ''
                    }, {
                        label: '设置',
                        value: '1'
                    }, {
                        label: '划拨',
                        value: '2'
                    }],
                    sectionOptions: [{
                        label: '城市预算',
                        value: '1001'
                    }],
                    statusOptions: [{
                        label: '全部',
                        value: ''
                    }, {
                        label: '审批中',
                        value: '0'
                    }, {
                        label: '通过',
                        value: '1'
                    }, {
                        label: '驳回',
                        value: '2'
                    }, {
                        label: '撤销审批',
                        value: '3'
                    }],
                    // operatoroptions: [],
                    filter: {
                        opType: '',
                        section: '1001',
                        operator: '',
                        status: ''
                    },
                    tableData: [],
                    pageData: {
                        page: data.page,
                        total: data.count,
                        limit: data.limit,
                        page_num: data.page_num
                    }
                };
            },
            created: function() {
                this.getList()
            },
            methods: {
                getList() {
                    const url = ''
                    const data = {
                        display: 'json'
                    };
                    this.$ajax({
                        url: url,
                        type: 'post',
                        data: data,
                        success: res => {
                            /**
                             * @description 判断是否成功，成功则渲染table，失败则返回错误文案
                             * @function
                             */
                            if (res.errno === 0) {
                                /**
                                 * @description 渲染table数据
                                 */
                                this.tableData = res.data.list
                                this.pageData.total = res.data.count
                            } else {
                                this.$message.error(res.errmsg)
                            }
                        },
                        error: error => {
                            this.$message.error('服务器不稳定，请重试')
                        }
                    });
                },
                /**
                 * @function
                 * @description 翻页触发事件
                 */
                changePage(val) {
                    this.pageData.page = val
                    this.getList()
                },
                /**
                 * @function
                 * @description 改变翻页size触发事件
                 */
                changeSize(val) {
                    this.pageData.limit = val
                    this.getList()
                }
            }
        });
    }
};

`
					editor.deleteToBeginningOfLine()
					editor.insertText(temp3)
					break;
			}

		}
	},
	getCurrentRow() {
		let cursorPosition = editor.getCursorBufferPositions()
		let currentRow = cursorPosition[0].row
		return currentRow
	}

};
