package middleware

import (
    "net/http"
    "strings"
    
    "github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "No authorization header"})
            c.Abort()
            return
        }

        // Bearer token
        token := strings.Replace(authHeader, "Bearer ", "", 1)
        // 验证token的逻辑...
        
        c.Next()
    }
}
