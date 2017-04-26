'use babel';

import PickmanView from './pickman-view';
import { CompositeDisposable } from 'atom';

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
    if(cursorPosition.length === 1){
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
			<el-form-item label="部门">
				<el-select placeholder="请选择"  v-model="filter.section">
					<el-option
						v-for="item in options"
						:label="item.label"
						:value="item.value" :key="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="时间">
				<el-date-picker
					v-model="filter.month"
					type="month"
					format="yyyyMM"
					placeholder="选择月">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="操作人">
				<el-input v-model="input" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item>
					<el-button type="primary" @click="getConditionList">查询</el-button>
			</el-form-item>
	</el-form>
	<el-button type="primary" class="" @click=""><el-icon name="plus"></el-icon>创建</el-button>
	<el-button type="primary" class="" @click="">跳转</el-button>
	<el-button type="primary" class="" @click="">日志</el-button>
	<el-table
			:data="tableData"
			border
			style="width: 100%">
					<el-table-column
						label="预算部门"
						prop="section_name">
					</el-table-column>
					<el-table-column
						label="生效时间"
						prop="month">
					</el-table-column>
					<el-table-column label="预算金额">
					 	<template scope="scope">
							<span>{{ scope.row.amount }}</span>
							<template v-if="!(scope.$index === tableData.length-1) && !(scope.row.state_str === '已完成')">
								<el-button  size="small" icon="edit"
	  							@click="handleEdit(scope.$index, scope.row)"></el-button>
							</template>
						</template>
					</el-table-column>
					<el-table-column
							prop="used"
							label="实时消耗">
					</el-table-column>
					<el-table-column
							prop="state_str"
							label="状态">
					</el-table-column>
					<el-table-column
							prop="operator"
							label="最后编辑人">
					</el-table-column>
	</el-table>
	<el-dialog title="设置0预算T级商圈" v-model="businessGradeDialogVisible">
		  <el-checkbox-group v-model="grade">
		  	<el-checkbox v-for="business in aoiData" :label="business">T{{business}}商圈</el-checkbox>
		  </el-checkbox-group>
		  <el-button type="primary" class="editBudget" @click="setBusinessGrade">确定</el-button>
	</el-dialog>
	<el-dialog title="修改预算金额" v-model="updateBudgetDialogVisible" label-width="100px" class="demo-ruleForm">
		<el-form :model="ruleEditForm" :rules="editRules" ref="ruleEditForm">
			<el-input type="hidden" v-model="ruleEditForm.wid" class="inputWidth"></el-input>
			<el-form-item label="城市总预算" prop="changedAmount" required>
				 <el-input v-model="ruleEditForm.changedAmount" type="number" class="inputWidth"></el-input>
			</el-form-item>
			<el-form-item>
					<el-button type="primary" class="editBudget" @click="updateAmount('ruleEditForm')">确定</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</el-col>

`;
        editor.deleteToBeginningOfLine()
        editor.insertText(temp2)
        break;
      case 'el-js':
        let temp3 =
`
/**
 * @static
 * @description 引用模板文件
 */
const template = __inline('./vue.tpl');
/**
 * @static
 * @description 引用vue-ajax方法
 */
require('nerve_cfecommon:static/utils/vue-ajax.js');

const utils = require('nerve_cfecommon:static/utils/utils.js');

module.exports = {

    init: function(res) {
        const data = res;
        new Vue({
            el: '#content',
            template: template,
            data: function() {
                return {

                };
            },
            created: function() {

            },
            methods: {

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
