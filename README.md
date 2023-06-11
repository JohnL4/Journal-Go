# Journal
Copied from HelloGin (hoursing around w/Go and Angular)

# Serving an Angular front end

The key to serving an Angular (or any, probably) front end is this:

In index.html, specify your base as the base of your generated web app:

```html
<base href="/web/dist/journal/">
```

(After you do this, ```ng serve``` will probably not work.)

In your back end, also specify the base path like so:

```go
	r := gin.Default()
	r.Static("/web/dist/journal", "./web/dist/journal") // Serve a static base directory under the given path.
	// All weird routes need a default fallback, per
	// https://angular.io/guide/deployment#routed-apps-must-fall-back-to-indexhtml
	r.NoRoute(func(c *gin.Context) {
		c.Redirect(302, "/web/dist/journal/index.html")
		// c.Redirect(302, "/")
		// c.Request.URL.Path = "/"
		// c.File("./static/index.html")
	})
```

# Build and run

## Angular (front end)

Open a new PowerShell prompt.

```powershell
cd $rootDir/web     # Where $rootDir is the root of this project, where the go code is.
ng build --watch
```

## Go (back end)

Open a new PowerShell prompt.

```powershell
cd $rootDir         # Where $rootDir is the root of this project, where the go code is.
go build; if ($?) { .\journal-go.exe }
```

(The name "journal-go" is set in go.mod.)

Off to the races!