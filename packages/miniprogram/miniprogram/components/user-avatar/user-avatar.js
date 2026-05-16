Component({
  properties: {
    src: {
      type: String,
      value: ''
    },
    size: {
      type: String,
      value: 'medium' // small, medium, large
    },
    showDefault: {
      type: Boolean,
      value: true
    }
  },

  data: {
    imageError: false
  },

  methods: {
    onImageError() {
      this.setData({
        imageError: true
      });
    },

    onImageLoad() {
      this.setData({
        imageError: false
      });
    }
  }
});
