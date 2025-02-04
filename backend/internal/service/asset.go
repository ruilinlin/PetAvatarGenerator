package service

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"github.com/ruilinlin/PetAvatarGenerator/internal/model"
)

type AssetService struct {
	db *mongo.Database
}

func NewAssetService(db *mongo.Database) *AssetService {
	return &AssetService{db: db}
}

func (s *AssetService) GetAssets(ctx context.Context, page, limit string) ([]model.Asset, *model.Pagination, error) {
	// 实现分页查询逻辑
}

func (s *AssetService) CreateAsset(ctx context.Context, input *model.AssetCreate) (*model.Asset, error) {
	asset := &model.Asset{
		Title:     input.Title,
		Type:      input.Type,
		URL:       input.URL,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	_, err := s.db.Collection("assets").InsertOne(ctx, asset)
	if err != nil {
		return nil, err
	}

	return asset, nil
}
