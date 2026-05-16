Component({
  properties: {
    user: {
      type: Object,
      value: {
        nickname: '',
        avatar: '',
        bio: '',
        interests: []
      }
    },
    compact: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    onCardTap() {
      this.triggerEvent('tap', {
        user: this.data.user
      });
    }
  }
});
