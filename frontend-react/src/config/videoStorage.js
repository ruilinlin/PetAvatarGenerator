// 视频存储：使用 Bunny.net
// - 起步价格实惠：每GB $0.01
// - 全球CDN分发
// - 支持视频转码
export const bunnyConfig = {
  apiKey: process.env.REACT_APP_BUNNY_API_KEY,
  storageZone: process.env.REACT_APP_BUNNY_STORAGE_ZONE
}; 