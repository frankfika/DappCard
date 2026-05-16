Component({
  properties: {
    icon: {
      type: String,
      value: '📭'
    },
    title: {
      type: String,
      value: '暂无内容'
    },
    description: {
      type: String,
      value: ''
    },
    btnText: {
      type: String,
      value: '去看看'
    },
    showBtn: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    onActionTap() {
      this.triggerEvent('action');
    }
  }
});
