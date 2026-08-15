#!/usr/bin/env bash
# 启动端到端测试服务器：独立的 DSH_HOME + 测试 profile，强制 browse 目录选择器
# （SSH_CONNECTION=1），便于无头浏览器自动化完成首次引导。
#
# 用法: ./test/e2e-boot.sh [port]

set -euo pipefail

PORT="${1:-3199}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TEST_HOME="/tmp/dsh-twb-e2e"
PROFILE_DIR="$TEST_HOME/profiles/twbverify"

rm -rf "$TEST_HOME"
mkdir -p "$PROFILE_DIR/node_modules" "$TEST_HOME/ws"

cat > "$PROFILE_DIR/package.json" <<EOF
{
  "name": "dsh-profile-twbverify",
  "private": true,
  "dependencies": {
    "dsh-tableau-twb-viewer": "link:$ROOT"
  },
  "dsh": {
    "profile": {
      "bundles": [
        "@deepseek-ai/dsh-base",
        "@deepseek-ai/dsh-web-app",
        "dsh-tableau-twb-viewer"
      ]
    }
  }
}
EOF

printf '[]\n' > "$PROFILE_DIR/cordis.patch.yml"
ln -sfn "$ROOT" "$PROFILE_DIR/node_modules/dsh-tableau-twb-viewer"

cat > "$TEST_HOME/settings.yaml" <<'EOF'
ui-onboarding:
  welcomeNoticeVersion: 2026-08-13.1
agent-presets:
  default: standard
EOF

cd "$TEST_HOME/ws"
SSH_CONNECTION=1 DSH_HOME="$TEST_HOME" dsh --profile twbverify --port "$PORT"
