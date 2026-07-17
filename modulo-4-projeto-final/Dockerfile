# Base image tag MUST match the installed @playwright/test version (1.58.2), or the
# pre-baked browsers won't match the client and tests fail with "executable doesn't exist".
# This is the #1 Docker gotcha — the image tag and the lockfile are pinned to the same version.
FROM mcr.microsoft.com/playwright:v1.58.2-jammy

WORKDIR /app

# Install dependencies first so this layer is cached unless package files change.
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the project.
COPY . .

# The browsers ship with the base image, so no `playwright install` is needed.
CMD ["npx", "playwright", "test"]
