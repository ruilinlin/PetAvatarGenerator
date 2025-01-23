// 配置 CDN 缓存策略
export const cacheConfig = {
  // 浏览器缓存配置
  browserCache: {
    // 静态资源缓存时间
    maxAge: 60 * 60 * 24 * 7, // 7天
    // 是否允许浏览器缓存
    public: true,
    // 是否必须验证缓存
    mustRevalidate: true
  },
  
  // CDN 缓存配置
  cdnCache: {
    // CDN 缓存时间
    ttl: 60 * 60 * 24 * 30, // 30天
    // 缓存刷新策略
    purgeOnUpdate: true
  }
}; 