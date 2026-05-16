/**
 * 音效管理工具
 * 可选音效反馈：翻牌/抽牌
 */

let audioCtx = null;
let soundEnabled = false;

function init() {
  soundEnabled = wx.getStorageSync('soundEnabled') || false;
}

function setSoundEnabled(enabled) {
  soundEnabled = enabled;
  wx.setStorageSync('soundEnabled', enabled);
}

function isSoundEnabled() {
  return soundEnabled;
}

function playFlip() {
  if (!soundEnabled) return;
  wx.vibrateShort({ type: 'heavy' });
}

function playDraw() {
  if (!soundEnabled) return;
  wx.vibrateShort({ type: 'medium' });
}

function playFavorite() {
  if (!soundEnabled) return;
  wx.vibrateShort({ type: 'light' });
}

module.exports = {
  init,
  setSoundEnabled,
  isSoundEnabled,
  playFlip,
  playDraw,
  playFavorite
};
