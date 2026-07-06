---
name: qiangli-site-deploy
description: deploy targets for qiangli.github.io — preview is safe (does NOT touch the live site); deploy-prod publishes to GitHub -> Pages -> qiang.li
---
# deploy
## Tasks
### build
Build the Next.js static export into out/.
Effects: write
```bash
pnpm install
pnpm build
```

### deploy-preview
Build + serve the static site locally (secrets-free; does NOT touch qiang.li). Detached so verify can reach it.
Requires: build
Effects: write
```bash
out="${BUILD_OUT:-out}"; port="${PREVIEW_PORT:-8088}"
pid=$(lsof -ti "tcp:$port" 2>/dev/null || true); [ -n "$pid" ] && kill $pid 2>/dev/null || true
setsid nohup python3 -m http.server "$port" --directory "$out" >/tmp/qiangli-preview.log 2>&1 < /dev/null &
sleep 1
echo ">> preview at http://127.0.0.1:$port (does NOT touch the live site)"
```

### deploy-prod
Publish the conductor's change: commit it, push to GitHub main (GitHub `deploy.yml` builds
Pages -> live on qiang.li), then sync loom so the next run starts from the published state.
GitHub is the source of truth; the runner authenticates as the operator via `bashy gh auth token`.
Effects: write
```bash
set -e
bashy git add -A
if ! bashy git diff --cached --quiet; then
  bashy git -c user.name='sdlc-conductor' -c user.email='sdlc@qiang.li' commit -m "${SDLC_COMMIT_MSG:-sdlc: update}"
fi
# GitHub token from the cloudbox vault: the headless act_runner job does NOT
# inherit the operator's interactive env (no GITHUB_TOKEN), so load it here. The
# file-based secrets token (~/.config/bashy/secrets-token) is readable as the
# operator, so `bashy secrets env` works in the job. No per-repo secret; the token
# stays in the vault. Emits `export GITHUB_TOKEN='...'`.
eval "$(bashy secrets env 2>/dev/null)" || true
tok="${GITHUB_TOKEN:-$(bashy gh auth token 2>/dev/null)}"
[ -n "$tok" ] || { echo ">> ERROR: no GitHub token (vault + gh both empty)"; exit 1; }
# GitHub = source of truth + Pages deploy (the live publish)
ghurl="https://x-access-token:${tok}@github.com/${GH_REPO:-qiangli/qiangli.github.io}.git"
bashy git remote remove github 2>/dev/null || true
bashy git remote add github "$ghurl"
# GitHub is the source of truth; loom may be behind if anything pushed to GitHub
# out of band. Rebase the conductor's commit onto GitHub's current main so the
# push always fast-forwards (content changes don't conflict with config/workflow).
bashy git fetch github
bashy git rebase github/main || { bashy git rebase --abort 2>/dev/null || true; echo ">> ERROR: rebase onto github/main conflicted — resolve in the issue thread"; exit 1; }
bashy git push github HEAD:main
# keep loom (the control plane) in sync so the next issue starts current
bashy git push origin HEAD:main || echo ">> WARN: loom sync push failed (non-fatal)"
echo ">> published to GitHub main -> Pages will build -> live on qiang.li"
```
