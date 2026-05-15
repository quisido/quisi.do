# Instructions for Codex

When running shell commands on Crostini (ChromeOS Linux), use non-login shells
by default (`login=false`) to avoid sourcing `/etc/profile.d/sommelier.sh` which
emits D-Bus warnings. Only use login shells when necessary and explain why.
