package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func main() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Printf("Warning: .env file not found")
	}

	// Set Gin mode
	gin.SetMode(gin.ReleaseMode)
	if os.Getenv("GIN_MODE") == "debug" {
		gin.SetMode(gin.DebugMode)
	}

	// Connect to MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	mongoURI := os.Getenv("MONGODB_URI")
	if mongoURI == "" {
		mongoURI = "mongodb://localhost:27017"
	}

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatal("Failed to connect to MongoDB:", err)
	}
	defer client.Disconnect(ctx)

	// Ping the database
	if err := client.Ping(ctx, readpref.Primary()); err != nil {
		log.Fatal("Could not ping MongoDB:", err)
	}
	log.Println("Successfully connected to MongoDB")

	// Initialize router
	r := gin.Default()

	// Configure CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"} // 前端地址
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept"}
	r.Use(cors.New(config))

	// Basic route for testing
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
			"database": "connected",
		})
	})

	// Health check endpoint
	r.GET("/health", func(c *gin.Context) {
		err := client.Ping(ctx, readpref.Primary())
		if err != nil {
			c.JSON(500, gin.H{
				"status": "error",
				"database": "disconnected",
				"error": err.Error(),
			})
			return
		}

		c.JSON(200, gin.H{
			"status": "ok",
			"database": "connected",
		})
	})

	// API routes
	api := r.Group("/api")
	{
		// Assets endpoints
		api.GET("/assets", func(c *gin.Context) {
			// Get query parameters
			page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
			limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
			assetType := c.Query("type")
			search := c.Query("search")

			// Calculate skip
			skip := (page - 1) * limit

			// Create filter
			filter := bson.M{}
			if assetType != "" {
				filter["type"] = assetType
			}
			if search != "" {
				filter["$or"] = []bson.M{
					{"title": bson.M{"$regex": search, "$options": "i"}},
					{"description": bson.M{"$regex": search, "$options": "i"}},
				}
			}

			// Get assets from MongoDB
			collection := client.Database("petavatar").Collection("assets")
			
			// Get total count
			total, err := collection.CountDocuments(ctx, filter)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			// Get assets
			cursor, err := collection.Find(ctx, filter, options.Find().
				SetSkip(int64(skip)).
				SetLimit(int64(limit)).
				SetSort(bson.D{{Key: "createdAt", Value: -1}}))
			
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			defer cursor.Close(ctx)

			var assets []bson.M
			if err = cursor.All(ctx, &assets); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			c.JSON(http.StatusOK, gin.H{
				"data": assets,
				"pagination": gin.H{
					"current": page,
					"limit": limit,
					"total": total,
					"pages": (total + int64(limit) - 1) / int64(limit),
				},
			})
		})
	}

	// Get port from environment variable or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "5000" // 修改为与前端代码匹配的端口
	}

	// Start server
	log.Printf("Server starting on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}