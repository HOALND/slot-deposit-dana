'use babel';

import LagilagiboskuView from './lagilagibosku-view';
import { CompositeDisposable } from 'atom';

export default {

  lagilagiboskuView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.lagilagiboskuView = new LagilagiboskuView(state.lagilagiboskuViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.lagilagiboskuView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'lagilagibosku:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.lagilagiboskuView.destroy();
  },

  serialize() {
    return {
      lagilagiboskuViewState: this.lagilagiboskuView.serialize()
    };
  },

  toggle() {
    console.log('Lagilagibosku was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
