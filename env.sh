ENV_SH_DIR=$(dirname $(realpath "$0"))
PATH="$ENV_SH_DIR/node_modules/.bin:$PATH"
unset ENV_SH_DIR
