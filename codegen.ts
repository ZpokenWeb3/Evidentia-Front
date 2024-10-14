import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://api.studio.thegraph.com/query/90405/bond-nft/version/latest',
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './src/app/gql/': {
      plugins: [],
      config: {
        avoidOptionals: true,
        immutableTypes: true,
        scalars: {
          DateTime: 'string',
          BigDecimal: 'string',
          BigInt: 'string',
          Bytes: 'string',
          Int8: 'string',
          Timestamp: 'number',
        },
        enumsAsTypes: true,
        maybeValue: 'T | undefined',
        strictScalars: true,
      },
      preset: 'client',
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
