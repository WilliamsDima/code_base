const path = require(`path`)
const { pathsToModuleNameMapper } = require('ts-jest')
const aliases = require('./tsconfig.paths.json')

function getWebpackAliasesFromPaths(configPaths) {
  const alias = Object.entries(configPaths).reduce(
    (webpackAliases, [configAlias, configPathList]) => {
      const [aliasKey] = configAlias.split('/')
      const [relativePathToDir] = configPathList[0].split('/*')
      return {
        ...webpackAliases,
        [aliasKey]: path.resolve(__dirname, relativePathToDir),
      }
    },
    {}
  )
  return alias
}

module.exports = {
  webpack: {
    alias: getWebpackAliasesFromPaths(aliases.compilerOptions.paths),
  },
  jest: {
    configure: {
      preset: 'ts-jest',
      moduleNameMapper: pathsToModuleNameMapper(aliases.compilerOptions.paths, {
        prefix: '<rootDir>/',
      }),
    },
  },
}
