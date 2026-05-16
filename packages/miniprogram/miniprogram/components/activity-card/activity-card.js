Component({
  properties: {
    activity: {
      type: Object,
      value: {
        title: '',
        category: '',
        subcategory: '',
        datetime: '',
        location: '',
        currentParticipants: 0,
        maxParticipants: 0,
        creator: {}
      }
    }
  },

  methods: {
    onCardTap() {
      this.triggerEvent('tap', {
        activity: this.data.activity
      });
    },

    getCategoryIcon(category) {
      const icons = {
        '运动健身': '⚽',
        '美食探店': '🍜',
        '文化艺术': '🎭',
        '户外旅行': '🏕️',
        '学习交流': '📚',
        '游戏娱乐': '🎮',
        '其他': '✨'
      };
      return icons[category] || '📌';
    },

    formatDateTime(datetime) {
      if (!datetime) return '';
      const date = new Date(datetime);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(today.getTime() + 86400000);
      const activityDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

      let dateStr = '';
      if (activityDate.getTime() === today.getTime()) {
        dateStr = '今天';
      } else if (activityDate.getTime() === tomorrow.getTime()) {
        dateStr = '明天';
      } else {
        dateStr = `${date.getMonth() + 1}月${date.getDate()}日`;
      }

      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${dateStr} ${hours}:${minutes}`;
    },

    getParticipantRatio() {
      const { currentParticipants = 0, maxParticipants = 0 } = this.data.activity;
      if (maxParticipants === 0) return 0;
      return (currentParticipants / maxParticipants) * 100;
    }
  }
});
