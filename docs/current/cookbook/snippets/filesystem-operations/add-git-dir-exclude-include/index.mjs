import { connect } from "@dagger.io/dagger"

// create Dagger client
connect(
  async (client) => {
    // get repository at specified branch
    const project = client
      .git("https://github.com/dagger/dagger")
      .branch("main")
      .tree()

    // return container with repository
    // at /src path
    // include all *.md files except README.md
    const contents = await client
      .container()
      .from("alpine:latest")
      .withDirectory("/src", project, {
        include: ["*.md"],
        exclude: ["README.md"],
      })
      .withWorkdir("/src")
      .withExec(["ls", "/src"])
      .stdout()

    console.log(contents)
  },
  { LogOutput: process.stderr }
)