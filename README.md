# SiNutre - Projeto Final

Este repositório contém o frontend do sistema SiNutre, desenvolvido como projeto final para o curso **Formação em Desenvolvimento Web Moderno**. O projeto foi evoluído a partir do MVP base, implementando melhorias de funcionalidades.

## Links de Produção (Requisitos Obrigatórios)
- **Frontend (Vercel):** 
- **Backend (Railway):**

##  Requisitos Complementares Implementados
Abaixo estão listadas as funcionalidades desenvolvidas, referenciadas de acordo com a tabela oficial de requisitos do curso:
| Ref | Descrição do Requisito 
| :--- | :--- | 
| **01** | Alterar um alimento cadastrado (Página de Alimentos) | 
| **02** | Excluir um alimento cadastrado (Página de Alimentos) |
| **03** | Validação de dados no cadastro/alteração de alimentos | 
| **04** | Cadastro de dados complementares (Meta calórica, altura e peso) |
| **11** | Implementação de funcionalidade de Logout | 
| **12** | Personalização das cores da interface |

### Detalhes Técnicos das Implementações:

*   **Ref 01 & 02**: Implementação de rotas `PUT` e `DELETE` no backend utilizando Prisma ORM e integração no frontend com novos componentes de ação.
*   **Ref 03**: Validação de campos obrigatórios e tipos de dados diretamente nos modais de formulário, garantindo a integridade do banco de dados.
*   **Ref 04**: Criação da página de Perfil e integração com as tabelas `WeightLog` e `HealthData` do banco SQLite.
*   **Ref 11**: Lógica de limpeza de tokens JWT no `localStorage` e redirecionamento seguro para a página de login.
*   **Ref 12**: Customização do tema através da paleta de cores `sinutre` no Tailwind CSS e daisyUI.

## Tecnologias Utilizadas
- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS, daisyUI, Axios.
- **Backend:** Node.js, Express, Prisma, SQLite.

**Repositório Backend:**

