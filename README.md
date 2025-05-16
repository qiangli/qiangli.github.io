# Qiang Li

This is a resume written in Next.js which can be deployed to GitHub Pages as a static site.

 It is created with the help from a custom build of [Continue](https://github.com/openaide/awesome/tree/main/docker/continue) and the command line tool [AI](https://github.com/qiangli/ai) based on the repos listed in the credits section.

`Continue` is used for general coding advices and `AI` is used for converting screenshots into html/css for some of the initial content.

## Live resume site

[http://qiang.li/](http://qiang.li)

## Build and Run

Build locally

```bash
pnpm install
pnpm run format
pnpm run lint
pnpm run build
```

Serve the out/ directory locally after the build

```bash
go run server/main.go
```

Visit http://localhost:8080/


## Credits

Next.js Template

+ [https://github.com/nextjs/deploy-github-pages](https://github.com/nextjs/deploy-github-pages)

Cool Resume Repos

+ [https://github.com/colinhemphill/nextjs-resume](https://github.com/colinhemphill/nextjs-resume)

+ [https://github.com/guilhermeborgesbastos/live-resume](https://github.com/guilhermeborgesbastos/live-resume)

+ [https://github.com/tthugy/resume-template-nextJS](https://github.com/tthugy/resume-template-nextJS)

Cool Icons

+ [https://icons.getbootstrap.com/](https://icons.getbootstrap.com/)

+ [https://simpleicons.org/](https://simpleicons.org/)

+ [https://fontawesome.com/](https://fontawesome.com/)


## License

MIT LICENSE except for my personal information in the source files. Feel free to use this repo as your starting point.