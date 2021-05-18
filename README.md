# Graph And Drop 
#### Ferramenta construída como requisito para conclusão do curso de graduação de Ciência da Computação, pelo Departamento de Sistemas e Computação da Universidade Federal de Campina Grande, campus Campina Grande, Paraíba, Brasil.

Essa ferramenta tem como objetivo plotar um grafo que represente a relação de dependência entre objetos de um esquema de banco de dados do tipo Autonomous Database Warehouse, pertecente ao serviço Cloud Oracle.

# Instruções de uso
### Requisitos
Para rodar a aplicação é necessário ter instalado e configurado em sua máquina os componentes 

- Instant Client da Oracle versão 19.</li>
- Node v.14.x.x ou superior</li>

### Passo a passo
#### No backend
- Pelo terminal, acesse o diretório do backend e rode o comando ```npm install``` para baixar e instalar as dependências.
- Para adicionar uma conexão ao banco de dados, é necessário baixar as credenciais (Wallet) do seu banco de dados e extrair as informações do arquivo baixado para a pasta /network/admin que está dentro do diretório do Instant Client. Se esse diretórios não existirem, crie-os e extraia o arquivo.
- Na primeira execução da aplicação, é necessário descomentar a linha 9 do arquivo index.js e alterar o caminho do diretório passado no parâmetro do comando initOracleClient para o caminho atual deste diretório no seu computador.
- Com isso, você está pronto para subir o servidor localmente na porta 3001 com o comando```npm run dev```.

#### No frontend
- Pelo terminal, acesse o diretório do frontend e rode o comando ```npm install``` para baixar e instalar as dependências.
- Em seguida execute o comando ```npm start``` para subir a aplicação. Acesse através de um navegador com o endereço localhost:3000

Acesse o artigo completo com a descrição dessa ferramenta através do link abaixo
[FERRAMENTA PARA VISUALIZAÇÃO DAS DEPÊNDENCIAS ENTRE OBJETOS EM UM BANCO DE DADOS E SIMULAÇÃO DE ALTERAÇÕES NOS OBJETOS](https://drive.google.com/file/d/1xfexpY0WfmKTXjOcZKv_Dy_g4fHMukMw/view?usp=sharing)
