# MD Talk — Portal do Aluno (PWA integrada à versão 87)

Este pacote já contém o **index.html original enviado pelo usuário**, com a camada de instalação do aplicativo incorporada. O código interno do login, calendário, materiais, progresso, sincronia e Apps Script foi mantido **intacto**.

**Endereço de publicação:** https://institutomdtalk.github.io/portaldoaluno/

## Publicar no GitHub Pages

1. Faça backup da versão atual do seu repositório antes de qualquer substituição.
2. Confirme qual pasta está servindo a URL `/portaldoaluno/` (normalmente a raiz do repositório `portaldoaluno`, podendo ser `/docs` se o Pages estiver configurado dessa forma).
3. Extraia o ZIP e **copie o conteúdo interno** da pasta `MDTalk_Portal_App_PWA_v87` para essa mesma pasta publicada. Os arquivos `index.html`, `sw.js`, `manifest.webmanifest`, `offline.html` e a pasta `icons/` devem ficar lado a lado.
4. O arquivo `index.html` incluído **substitui o index.html da versão atual do portal**. Verifique primeiro se a versão 87 anexada é realmente sua versão de produção mais recente.
5. Aguarde o deploy do GitHub Pages e verifique os endereços:
   - https://institutomdtalk.github.io/portaldoaluno/
   - https://institutomdtalk.github.io/portaldoaluno/manifest.webmanifest
   - https://institutomdtalk.github.io/portaldoaluno/sw.js
   - https://institutomdtalk.github.io/portaldoaluno/icons/icon-192.png
6. Valide a instalação no Android e no iPhone em aparelhos reais. Faça os testes funcionais descritos abaixo antes de divulgar aos alunos.

**Atenção:** não envie a *pasta que contém os arquivos* como subpasta sem querer: o manifesto deve ficar no mesmo diretório que o `index.html`, no caminho publicado `/portaldoaluno/`.

## Instalação

- **Android / Chrome:** abra o link do portal, escolha o menu e a opção "Instalar aplicativo" ou "Adicionar à tela inicial", conforme a versão do sistema.
- **iPhone / Safari:** abra o link do portal, toque em Compartilhar e "Adicionar à Tela de Início". Em versões compatíveis, confirme "Abrir como App".

## O que foi modificado

- `index.html`: acrescentados metadados PWA no `<head>` e registro do service worker no final do `<body>`. Nenhuma linha da lógica original de login, calendário, presença ou sincronização foi substituída.
- `manifest.webmanifest`: nome, escopo `/portaldoaluno/`, cores e arquivos de ícone.
- `icons/`: ícones do aplicativo feitos a partir das letras e da palavra TALK **já presentes no logo incorporado ao login original**.
- `sw.js`: registra apenas ícones e tela neutra offline; navega sempre pela rede. Não armazena em cache páginas autenticadas, planilhas, respostas do Google Apps Script ou dados pessoais.
- `offline.html`: tela para quando não houver rede. **Não oferece uso offline do portal**.

## Testes de aceitação sugeridos antes da publicação pública

- Entrar e sair com uma conta de testes; testar "lembrar-me" e voltar ao app instalado.
- Confirmar aula em Sala de Aula e verificar refletido no Calendário e planilha.
- Confirmar aula no Calendário e verificar reciprocidade com Sala de Aula.
- Validar navegação, menu recolhível, busca, visualização e conclusão/desconclusão de materiais.
- Verificar a atualização de progresso e planilhas usando uma conta de testes.
- Reabrir o aplicativo no iPhone e Android; conferir rolagem nos iframes, safe areas, teclado e anexos.
- Desligar a internet, fechar e abrir o app: deve exibir a mensagem "Estamos sem conexão" quando a página não puder ser carregada.
- Atualizar o portal e confirmar que uma nova abertura online carrega o HTML recente (a página principal não fica no cache).

## Cuidados

- O arquivo original é grande (~8,5 MB), com login e portal armazenados como HTML codificado em Base64. Isso pode aumentar consumo de memória e o tempo de carregamento no celular. Não reestruturei isso nesta versão para evitar regressões.
- A interface do usuário armazena informações de sessão no armazenamento do navegador. Instalar como PWA **não equivale a uma auditoria de segurança do backend**. Revise regras de autorização, sessão e dados de alunos antes de ampliar a distribuição.
- Dependências e dados externos continuam necessitando da internet e das permissões existentes.
- Não há notificações push, biometria, modo offline funcional ou publicação automática nas lojas.
- A instalação e comportamento exato variam por versão de iOS/Android; são necessários testes em dispositivos reais.

## Atualizações futuras

- Atualize o HTML da produção sem apagar as duas adições PWA (`<link rel="manifest">` e o registro `navigator.serviceWorker.register`).
- Se modificar `offline.html` ou os ícones, incremente o identificador `STATIC_CACHE` no `sw.js` (por exemplo, troque `static-01` por `static-02`).
- Mantenha `manifest.webmanifest`, `sw.js` e `icons/` publicados com o mesmo caminho.
