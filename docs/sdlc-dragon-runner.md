# SDLC Dragon Runner

This repo's `SDLC issue to GitHub Pages` workflow runs on a self-hosted GitHub
Actions runner with labels:

```text
self-hosted, sdlc, dragon
```

The runner must run on `dragon` under a user that already has:

```bash
~/bin/bashy --version
codex --version
```

Codex must be logged in interactively for that same runner user so the workflow
uses the operator subscription session instead of API-key billing.

Register the runner from GitHub:

1. Open `Settings -> Actions -> Runners -> New self-hosted runner`.
2. Select macOS and copy the generated download/configure commands.
3. Add labels when configuring:

```bash
./config.sh --url https://github.com/qiangli/qiangli.github.io --token <TOKEN> --labels sdlc,dragon
```

Run it as a foreground process for the first test:

```bash
./run.sh
```

After the test passes, install it as a service if desired:

```bash
./svc.sh install
./svc.sh start
```

Test trigger:

1. Create a GitHub issue in this repo.
2. The workflow should start on `dragon`.
3. The workflow calls `bashy sdlc tick` with the issue title/body.
4. Codex implements the change.
5. The workflow builds, commits to `main`, deploys GitHub Pages, verifies the
   deployed page, and comments back on the issue.
