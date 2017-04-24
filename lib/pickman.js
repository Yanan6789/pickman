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
      case 'el-table':
        let temp2 =
`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`;
        editor.deleteToBeginningOfLine()
        editor.insertText(temp2)
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
