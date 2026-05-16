Component({
  properties: {
    tags: {
      type: Array,
      value: []
    },
    selected: {
      type: Array,
      value: []
    },
    max: {
      type: Number,
      value: 5
    },
    mode: {
      type: String,
      value: 'multi' // single, multi
    }
  },

  data: {
    selectedIds: []
  },

  observers: {
    'selected': function(newVal) {
      this.setData({
        selectedIds: newVal || []
      });
    }
  },

  methods: {
    onTagTap(e) {
      const { id } = e.currentTarget.dataset;
      let selectedIds = [...this.data.selectedIds];

      if (this.data.mode === 'single') {
        selectedIds = [id];
      } else {
        const index = selectedIds.indexOf(id);
        if (index > -1) {
          selectedIds.splice(index, 1);
        } else {
          if (selectedIds.length >= this.data.max) {
            wx.showToast({
              title: `最多选择${this.data.max}个`,
              icon: 'none'
            });
            return;
          }
          selectedIds.push(id);
        }
      }

      this.setData({
        selectedIds
      });

      this.triggerEvent('change', {
        selected: selectedIds
      });
    },

    isSelected(id) {
      return this.data.selectedIds.includes(id);
    }
  }
});
