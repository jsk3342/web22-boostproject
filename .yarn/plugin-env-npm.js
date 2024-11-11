module.exports = {
  name: 'plugin-env-npm',
  factory: require => ({
    hooks: {
      async getNpmAuthenticationHeader(currentHeader, registry, {ident}){
        // only trigger for specific scope
        if (!ident || ident.scope !== 'hoeeeeeh') {
          return currentHeader
        }

        // try getting token from process.env
        let bufEnv = process.env.BUF_REGISTRY_TOKEN
        // alternatively, try to find it in .env
        if (!bufEnv) {
          const fs = require('fs/promises')
          const fileContent = await fs.readFile('../.env', 'utf8')
          const rows = fileContent.split(/\r?\n/)
          for (const row of rows) {
            const [key, value] = row.split(':', 2)
            if (key.trim() === 'GITHUB_REGISTRY_TOKEN') {
              bufEnv = value.trim()
            }
          }
        }

        if (bufEnv) {
          return `${bufEnv}`
        }
        return currentHeader
      },
    },
  }),
}
