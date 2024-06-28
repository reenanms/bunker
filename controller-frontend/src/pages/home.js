import React from 'react';
import AuthRedirector from '../components/authRedirector'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <>
                <AuthRedirector redirectTo="/" />
                
                <h2>Home</h2>
                
                <h3>Bem-vindo ao Bunker!</h3>
                <p>Plataforma de Centralização de Dados de Dispositivos de IoT</p>
                <p>Se é sua primeira vez por aqui, vamos lhe auxiliar com um passo a passo de como usar o nosso sistema:</p>

                <div>
                    <h4>1. Modelo de Dados</h4>
                    <p><strong>Descrição</strong>: O primeiro passo é cadastrar os modelos de dados que serão recebidos pelos seus dispositivos IoT.</p>
                    <p><strong>O que Fazer</strong>:</p>
                    <ul>
                        <li>Acesse a tela de <strong>Modelos de Dados</strong>.</li>
                        <li>Preencha as informações solicitadas:
                            <ul>
                                <li><strong>Nome do Modelo</strong>: Escolha um nome descritivo para o modelo de dados.</li>
                                <li><strong>Propriedades</strong>: Adicione as propriedades (atributos) que o modelo deve conter, especificando nome e tipo de dado para cada uma.</li>
                            </ul>
                        </li>
                        <li>Clique em <strong>Salvar</strong> para registrar o modelo de dados.</li>
                    </ul>
                </div>

                <div>
                    <h4>2. Modelo de Dispositivos</h4>
                    <p><strong>Descrição</strong>: Após cadastrar os modelos de dados, é hora de cadastrar os modelos de dispositivos que utilizarão esses dados.</p>
                    <p><strong>O que Fazer</strong>:</p>
                    <ul>
                        <li>Acesse a tela de <strong>Modelos de Dispositivos</strong>.</li>
                        <li>Preencha as informações solicitadas:
                            <ul>
                                <li><strong>Nome do Modelo</strong>: Insira um nome para o modelo do dispositivo.</li>
                                <li><strong>Modelo de Dados Associado</strong>: Selecione o modelo de dados que será utilizado por este dispositivo.</li>
                                <li><strong>Descrição do Modelo</strong>: Insira um descritivo para o modelo do dispositivo.</li>
                            </ul>
                        </li>
                        <li>Clique em <strong>Salvar</strong> para registrar o modelo de dispositivo.</li>
                        <li>E depois clique em <strong>Adicionar</strong> para criar um dispositivo associado.</li>
                    </ul>
                </div>

                <div>
                    <h4>3. Dashboard</h4>
                    <p><strong>Descrição</strong>: Depois de configurar os modelos de dados e dispositivos, você pode começar a monitorar e visualizar as informações na tela de Dashboard.</p>
                    <p><strong>O que Fazer</strong>:</p>
                    <ul>
                        <li>Acesse a tela de <strong>Dashboard</strong>.</li>
                        <li>Personalize seu painel de controle para visualizar os dados dos dispositivos em tempo real.</li>
                        <li>Utilize gráficos, mapas e outras ferramentas visuais para obter insights sobre os dados coletados.</li>
                    </ul>
                </div>

                <h4>Resumo:</h4>
                <ul>
                    <li><strong>Modelo de Dados</strong>: Cadastre as propriedades e nomes dos dados.</li>
                    <li><strong>Modelo de Dispositivos</strong>: Associe os modelos de dados aos dispositivos.</li>
                    <li><strong>Dashboard</strong>: Visualize e monitore os dados em tempo real.</li>
                </ul>

                <p>Estamos aqui para ajudar em cada etapa do processo. Explore a plataforma e descubra todas as funcionalidades disponíveis para maximizar o potencial dos seus dispositivos IoT.</p>
                <p>Aproveite a experiência e bem-vindo à nossa comunidade!</p>
            </>
        )
    }
}

export default Home;