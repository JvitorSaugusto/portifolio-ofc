# João Vitor — Portfólio Profissional

Portfólio profissional estático de **João Vitor Santos Augusto**, desenvolvido para publicação no GitHub Pages.

## Tecnologias

- HTML5 semântico
- Tailwind CSS via CDN
- CSS3 para identidade visual e animações complementares
- JavaScript moderno sem framework

## Estrutura

```text
/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
└── README.md
```

A pasta `assets/images/` está preparada para receber futuras imagens, caso necessário. O portfólio atual não depende de foto pessoal.

## Recursos do site

- Navegação por âncoras com scroll suave.
- Menu responsivo para smartphones.
- Destaque da seção atual no menu.
- Animações de entrada com `IntersectionObserver`.
- Filtro dos projetos por categoria.
- Botão de voltar ao topo.
- Acessibilidade básica: HTML semântico, foco visível, skip link, `aria-label` quando necessário e suporte a `prefers-reduced-motion`.
- SEO básico e Open Graph.
- Links externos configurados com `noopener noreferrer`.

## Rodando localmente

Não existe backend ou etapa de build obrigatória. Basta abrir o `index.html` no navegador.

Para uma visualização local mais próxima de um servidor estático, também é possível usar qualquer servidor HTTP simples, mas isso não é necessário para o funcionamento da página.

## Publicando no GitHub Pages

1. Crie um repositório no GitHub e envie os arquivos mantendo a estrutura de pastas.
2. Em **Settings → Pages**, escolha a origem **Deploy from a branch**.
3. Selecione a branch principal e a pasta `/ (root)`.
4. Salve a configuração e aguarde a publicação do GitHub Pages.
5. Acesse a URL disponibilizada pelo GitHub.

## Observação sobre o Tailwind

O projeto utiliza Tailwind CSS via CDN para manter a publicação simples e compatível com hospedagem estática. Não há necessidade de Node.js, npm ou processo de build para executar o site.
