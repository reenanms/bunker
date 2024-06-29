# Bunker

Bunker é um projeto desenvolvido em TypeScript, JavaScript e Python que visa criar uma central de dados para sistemas IoT (Internet of Things). O projeto oferece as seguintes funcionalidades:

## Principais Recursos

1. **Cadastro de Esquemas de Dados**: Os usuários podem definir os esquemas de dados que serão utilizados para armazenar as informações coletadas pelos dispositivos IoT.

2. **Cadastro de Modelos de Dispositivos**: Os usuários podem cadastrar os diferentes modelos de dispositivos IoT que serão integrados ao sistema.

3. **Cadastro de Dispositivos**: Os usuários podem cadastrar os dispositivos IoT que enviarão dados para o sistema.

4. **API de Consulta de Dados**: O sistema disponibiliza uma API REST para que os usuários possam consultar os dados coletados pelos dispositivos IoT.

5. **Ingestão de Dados via MQTT**: O projeto inclui um serviço de ingestão de dados via protocolo MQTT, permitindo que os dispositivos IoT enviem dados de forma assíncrona.

6. **Ingestão de Dados via REST**: Além do MQTT, o projeto também conta com um serviço de ingestão de dados via API REST, possibilitando a integração com diversos tipos de dispositivos IoT.

## Rodando o Projeto

Para rodar o projeto, basta utilizar o arquivo `docker-compose.yml` disponível no repositório. No Windows, execute o seguinte comando:

```powershell
$env:HOST_INTERNAL_IP="host.docker.internal"
$env:HOST_EXTERNAL_IP="localhost"

docker-compose up -d --force-recreate
```

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues, enviar pull requests ou entrar em contato com a equipe de desenvolvimento.

## Licença
Este projeto está licenciado sob a Licença MIT.
