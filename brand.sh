#!/usr/bin/env bash
[ -z "$UNLOCK" ] && sed -i 's/<a href.*/<a>This is a self hosted instance<\/a>/' ./static/s.html
exit 0