#!/usr/bin/env bash
# Link pstack skills into this repo. The clone stays outside git so pstack is not vendored.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
clone="${PSTACK_HOME:-$HOME/.pstack/plugins}"
src="$clone/pstack"
repo_url="https://github.com/cursor/plugins.git"

if [ -d "$clone/.git" ]; then
  git -C "$clone" sparse-checkout set pstack
  git -C "$clone" pull --ff-only --quiet
else
  mkdir -p "$(dirname "$clone")"
  git clone --depth 1 --filter=blob:none --sparse --quiet "$repo_url" "$clone"
  git -C "$clone" sparse-checkout set pstack
fi

if [ ! -d "$src/skills" ]; then
  echo "pstack skills directory missing at $src/skills" >&2
  exit 1
fi

prune() {
  local dir="$1" link
  [ -d "$dir" ] || return 0
  for link in "$dir"/*; do
    [ -L "$link" ] || continue
    case "$(readlink "$link")" in
      "$clone"/*) [ -e "$link" ] || rm "$link" ;;
    esac
  done
}

link_skills() {
  local dest_root="$1" skill name dest
  mkdir -p "$dest_root"
  prune "$dest_root"
  for skill in "$src"/skills/*/; do
    [ -f "${skill}SKILL.md" ] || continue
    name="$(basename "$skill")"
    dest="$dest_root/$name"
    if [ -L "$dest" ] || [ ! -e "$dest" ]; then
      ln -sfn "${skill%/}" "$dest"
    else
      echo "skip (exists, not a symlink): $dest" >&2
      exit 1
    fi
  done
}

link_skills "$root/.cursor/skills"
link_skills "$root/.agents/skills"
link_skills "$root/.claude/skills"
