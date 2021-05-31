#!/bin/bash -xe

main() {
  check_params "$@"

  if [ ! "$(docker ps -q -f name=postgres_ecommerce_local)" ]; then
    docker run -d --name postgres_ecommerce_local -p 64432:5432 --restart=always -e POSTGRES_PASSWORD=password ericksaito/postgres_poc_local -c fsync=off -c full_page_writes=off -c synchronous_commit=OFF
  else
    echo "Local Postgres container already running"
  fi
}

check_params() {
  if [[ -z "$1" ]]; then
    echo "Missing env argument: should be local"
    exit 1
  fi

  if [ "local" != "$1" ]; then
    echo "Invalid env argument"
    exit 1
  fi

}

main "$@"
