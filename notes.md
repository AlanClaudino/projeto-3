## Dependências

- **TSX** loader que permite executar arquivos typescript com o node sem compilação prévia para javascript. Loaders atuam como hooks entre a leitura de um módulo e a execução do mesmo, eles recebem os arquivos que serão carregados pelo runtime e podem realizar ações sobre eles. Em nosso caso, a ação é compilar o arquivo de TypeScript para JavaScript.

- **TSUP** bundler responsável por converter nosso projeto de typescript para javascript. Utilizado para gerarmos a build de produção.

- **Fastify** web framework utilizada para a construção de aplicações back-end.

- **ZOD** biblioteca para a validação de tipos.


## JWT: JSON Web Token

Fluxo: usuário faz login, envia e-mail/senha, o back-end cria token ÚNICO, não-modificável e STATELESS;

Stateless: Não armazenado em nenhuma estrutura de persistência de dados (banco de dados);

Back-endÇ Quando vai criar o token, utiliza uma chave (string)

Chave (exemplo): iefjwioehf3q84qrejoervopkdprqie09fr90eio

Conteúdo do token: headers.payload.signature

processo: login => JWT

JWT => presente em todas as outras requisições após login.

header: Authorization: Bearer JWT