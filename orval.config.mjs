module.exports = {
  'petstore-file': {
    input: './swagger.yaml',
    output: {
      mode: 'tags-split',
      target: `./src/api/hooks/api`,
      schemas: `./src/api/hooks/api/model`,
      client: 'react-query',
      mock: false,
      prettier: true,
      clean: true,
      override: {
        mutator: {
          path: './src/api/.instances/index.ts',
          name: 'useCustomInstance',
        },
      },
    },
  },
};
