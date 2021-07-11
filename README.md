# Val's Personal Site

## Roadmap

### Version 1/MVP

- [x] naive config module (a single js file exporting an object called `config`)
- [x] nav bar
	- [x] Home, Blog, Links
	- [x] all leading back to "/" for now
- [x] about section
	- [x] picture (github avatar using github username from config)
	- [x] name
	- [x] bio
- [x] projects section
	- [x] dynamic list component
	- [ ] projects imported from config and rendered dynamically
- [ ] customize `public/`
	- [x] custom text for title
	- [ ] custom favicon
	- [ ] custom icons

## Git Workflow

As this is my personal project, I'm doing a lot of the initial work with small local branches and command line merges. Things like documentation **are** sometimes committed straight to main but **are not** any sort of code change. Even a config change needs to be merged in after testing.

It's just that I'll be doing some of this development offline so I have a local workflow that will be harder to inspect the usual GitHub way. To that end, let me know if I'm squashing out valuable information -- I won't be cleaning up my local branches or reusing them very often so rebuilding history should be possible? At least based on my growing understanding of git.
