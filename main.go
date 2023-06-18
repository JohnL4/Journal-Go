package main

import (
	"github.com/gin-gonic/gin"
	// static "github.com/raggaer/gin-static"
)

func main() {
	r := gin.Default()

	r.GET("/api/tab", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "nine",
		})
	})
	r.GET("/api/panic", func(c *gin.Context) {
		panic("aaaaaaaaaaaaaa!")
	})

	r.Static("/ng", "./ng/dist/journal") // Serve a static base directory under the given path.
	r.Static("/static", "./static")      // Serve a static base directory under the given path.

	// All weird routes (in Angular app) need a default fallback, per
	// https://angular.io/guide/deployment#routed-apps-must-fall-back-to-indexhtml
	r.NoRoute(func(c *gin.Context) {
		c.Redirect(302, "/ng/index.html")
	})
	r.Run()
	// listen and serve on 0.0.0.0:8080
}
