# Docker descriptor for codbex-hestia
# License - http://www.eclipse.org/legal/epl-v20.html

FROM ghcr.io/codbex/codbex-atlas:0.36.0

COPY codbex-hestia target/dirigible/repository/root/registry/public/codbex-hestia

ENV DIRIGIBLE_HOME_URL=/services/web/codbex-hestia/index.html
ch