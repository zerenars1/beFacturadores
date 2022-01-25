FROM node:14
# Timezone
ENV TZ=America/Asuncion
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/src/app
# Add package file
COPY package*.json ./
# Install deps
RUN npm install --production
# remove development dependencies
RUN npm prune --production
# Copy source
COPY . .
#Run service
CMD npm run start
