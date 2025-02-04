package config

import (
    "os"
    "github.com/joho/godotenv"
)

type Config struct {
    Port        string
    MongoURI    string
    Environment string
    JWTSecret   string
    AWSS3Bucket string
    AWSRegion   string
}

func Load() *Config {
    godotenv.Load()
    
    return &Config{
        Port:        getEnv("PORT", "5000"),
        MongoURI:    getEnv("MONGODB_URI", "mongodb://localhost:27017"),
        Environment: getEnv("ENV", "development"),
        JWTSecret:   getEnv("JWT_SECRET", "your-secret-key"),
        AWSS3Bucket: getEnv("AWS_S3_BUCKET", ""),
        AWSRegion:   getEnv("AWS_REGION", "us-west-2"),
    }
}

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}