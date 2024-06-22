# Docker descriptor for codbex-hestia
# License - http://www.eclipse.org/legal/epl-v20.html

FROM ghcr.io/codbex/codbex-gaia:0.19.0

COPY codbex-hestia target/dirigible/repository/root/registry/public/codbex-hestia
COPY node_modules/@codbex target/dirigible/repository/root/registry/public/

ENV DIRIGIBLE_HOME_URL=/services/web/codbex-hestia/index.html

