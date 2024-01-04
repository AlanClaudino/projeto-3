## Dependências

- **TSX** loader que permite executar arquivos typescript com o node sem compilação prévia para javascript. Loaders atuam como hooks entre a leitura de um módulo e a execução do mesmo, eles recebem os arquivos que serão carregados pelo runtime e podem realizar ações sobre eles. Em nosso caso, a ação é compilar o arquivo de TypeScript para JavaScript.

- **TSUP** bundler responsável por converter nosso projeto de typescript para javascript. Utilizado para gerarmos a build de produção.

- **Fastify** web framework utilizada para a construção de aplicações back-end.

- **ZOD** biblioteca para a validação de tipos.
