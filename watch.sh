#!/bin/bash 

set -e

main () {
  local testcmd=""
  if [[ $# -gt 0 ]]; then
    testcmd="/bin/bash -lc 'npm run build && npm run ava $@'"
  else
    testcmd="/bin/bash -lc 'npm run build && npm test'"
  fi
    notify -c "$testcmd" ./src ./tests
}

main $@
