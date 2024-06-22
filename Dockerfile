# Docker descriptor for codbex-hestia
# License - http://www.eclipse.org/legal/epl-v20.html

FROM ghcr.io/codbex/codbex-gaia:0.19.0

COPY node_modules/@codbex target/dirigible/repository/root/registry/public/
RUN mv target/dirigible/repository/root/registry/public/codbex-hestia-branding/ target/dirigible/repository/root/registry/public/ide-branding/

ENV DIRIGIBLE_HOME_URL=/services/web/codbex-hestia/index.html

