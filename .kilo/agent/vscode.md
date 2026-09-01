---
description: VS Code workspace settings for auto-approving bash and terminal operations
---

# VS Code Auto-Approval Settings

This workspace is configured to allow bash and terminal operations without requiring manual approval.

## settings.json

The `.vscode/settings.json` file contains terminal and editor preferences for this workspace.

## Agent Permissions

To enable auto-approval for bash and terminal operations in Kilo, configure agent permissions in `.kilo/agent/*.md` files:

```yaml
---
mode: primary
permission:
  bash: allow
  task: allow
---
```
