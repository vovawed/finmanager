#!/usr/bin/env bash

set -o errexit
set -o pipefail
cmd="$@"

python manage.py migrate
python manage.py collectstatic --noinput --verbosity 0
exec $cmd