package handler

import (
	"net/http"
	
	"github.com/gin-gonic/gin"
	"github.com/ruilinlin/PetAvatarGenerator/internal/model"
	"github.com/ruilinlin/PetAvatarGenerator/internal/service"
)

type AssetHandler struct {
	assetService *service.AssetService
}

func NewAssetHandler(as *service.AssetService) *AssetHandler {
	return &AssetHandler{assetService: as}
}

// GetAssets godoc
// @Summary 获取所有资产
// @Description 获取所有资产列表
// @Tags assets
// @Accept json
// @Produce json
// @Success 200 {array} model.Asset
// @Router /api/assets [get]
func (h *AssetHandler) GetAssets(c *gin.Context) {
	// 获取查询参数
	page := c.DefaultQuery("page", "1")
	limit := c.DefaultQuery("limit", "10")
	
	assets, pagination, err := h.assetService.GetAssets(c, page, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{
		"data": assets,
		"pagination": pagination,
	})
}

// CreateAsset godoc
// @Summary 创建新资产
// @Description 创建新的资产记录
// @Tags assets
// @Accept json
// @Produce json
// @Param asset body model.AssetCreate true "资产信息"
// @Success 201 {object} model.Asset
// @Router /api/assets [post]
func (h *AssetHandler) CreateAsset(c *gin.Context) {
	var input model.AssetCreate
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	asset, err := h.assetService.CreateAsset(c, &input)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusCreated, asset)
}
