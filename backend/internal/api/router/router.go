package router

import (
	"github.com/gin-gonic/gin"
	"github.com/ruilinlin/PetAvatarGenerator/internal/api/handler"
	"github.com/ruilinlin/PetAvatarGenerator/internal/middleware"
	"github.com/ruilinlin/PetAvatarGenerator/internal/service"
)

func Setup(assetService *service.AssetService, initService *service.InitService) *gin.Engine {
	r := gin.Default()
	
	// 全局中间件
	r.Use(gin.Recovery())
	r.Use(middleware.CORS())
	
	// 健康检查
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})
	
	// API 路由组
	api := r.Group("/api")
	{
		// 资产相关路由
		assets := api.Group("/assets")
		{
			assetHandler := handler.NewAssetHandler(assetService)
			assets.GET("/", assetHandler.GetAssets)
			assets.POST("/", assetHandler.CreateAsset)
			assets.GET("/:id", assetHandler.GetAsset)
			assets.PUT("/:id", assetHandler.UpdateAsset)
			assets.DELETE("/:id", assetHandler.DeleteAsset)
		}
		
		// 初始化相关路由
		init := api.Group("/init")
		{
			initHandler := handler.NewInitHandler(initService)
			init.POST("/gallery", initHandler.InitializeGallery)
			init.GET("/status", initHandler.GetInitStatus)
		}
		
		// 上传相关路由
		upload := api.Group("/upload")
		upload.Use(middleware.AuthMiddleware()) // 需要认证
		{
			upload.POST("/", handler.UploadFile)
		}
	}
	
	return r
}
