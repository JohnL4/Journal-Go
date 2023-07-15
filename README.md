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

# Storyboard

So, the overall idea is to throw a form up in front of the user that makes it easy to log the things the user wants to
track (e.g., did I clean the kitty litter, empty the dishwasher, mow the lawn, have a fight with my spouse, have
something sad or happy happen with my kids, etc.; whatever the user wants to track).  There'd be checkboxes (e.g.,
yes/no), scale selectors (e.g., 1-5 sad-happy), enumeration selectors (maybe??), which would be defined by the user,
depending on what they want to track.

With history, multiple edits throughout the day, possibly sharing with a partner.

## Initial UI -- blank journal form for today

From top down:

Today's date (maybe this would be the one fixed element).  Date picker?

Dropdown for form type (day of week, like M-Th is one form, Friday could be another, Sat & Sun could each be their own;
or everything could be the same).  Also:  work vs. personal?  Could be a long-ish list, if a cross-product.

### Config-driven form

Checkboxes and short text-entry fields (e.g., 2 digits, 10 chars, 30 chars?)

Finally, free-form text box (allow markdown, preserve linefeeds).

*Alternatively*:

Free-form text field at top, followed by checkboxes and short text entries underneath.

### UI-driven form layout?

Rather than have to create a JSON file? 

## History, in table form

Displays all entries (or last *n* or since *date*) in table form:  each short field (checkbox, short text) in a column,
plus long text field, either raw (i.e., display markdown) or processed via markdown processor.

If columns were added over the data range, they are also displayed correctly (i.e., the set of columns displayed is the
union of all columns defined over the time period).

## Edit user settings

Primarily the encryption key.  I guess if the key is changed, all data must be re-encrypted with the new key, so that'll
be an expensive operation.  Maybe we should disallow that.  Or rate-limit it (e.g., only change key once/day).

Maybe also let the user choose timezone?  Or pick timezone from browser (is that possible?)?

**Possibly a separate UI**

Also, upload new form definition (which gets time-stamped).

# Encryption on browser?

Need some things:

- Form config based on date, so forms can be versioned (e.g., last May, I removed such-and-such a field and added
  such-and-such another field to track different data).  So, historical display (or table-based display??) would be
  decoded according to the correctly corresponding form.
- Entire JSON blob of form contents will need to be encrypted and stored as an encrypted blob on the server.
- Table formatting and CSV export will need to happen *on the browser* (in the front end).
- Need a unique symmetric encryption key known only to user (i.e., key does not leave browser and is constant between
  sessions).
- Maybe the thing to do is to store the encryption key in something like Auth0 ``app_metadata``.

Allow user to choose how symmetric key is generated:

- Generate from user id.  Advantage: easy to recover.  Disadvantage:  if the encryption/generation algorithm is known,
  it might be easier to hack.  (If we did something like encrypt the user id, we'd use a salt, so it'd be a bit
  challenging to recover.)
- Generate randomly.  More secure, but if it gets lost, the user is screwed.  No way to recover.
- Or we could just let the user choose an encryption key (e.g., three-word phrase).
