
# Table of Contents

1.  [Cpastone-4: API](#orgb6a1c8b)
    1.  [Enpoints](#org5b35109)
    2.  [Listando usuários](#org377e03b)
    3.  [Personalizando as Rotas](#orgf0103d9)
    4.  [Rotas plurais](#org9b83ece)
        1.  [Filter](#org0a07c94)
        2.  [Paginate](#orgcccafd7)
        3.  [Sort](#org4f31efe)



<a id="orgb6a1c8b"></a>

# Cpastone-4: API

Está é a API para a aplicação &ldquo;Sem Nome&rdquo;, um site onde ONGs podem solicitar doações, como roupas, e voluntários possam achar uma ONG para ajudar. O objeto é facilitar ao máximo o processo de achar um ONG e ajudar, com informações atualizadas e de fácil acesso, tudo centralizado em um único espaço.

Essa API foi feita usando o JSON-Server e está hospedada na Heroku. Ela foi feita exclusivamente para prototipação e não recomendamos passar qualquer informação sensível.

Todos os enpoints podem ser lidos por qualquer um, mas apenas o dono pode alterar ou deletar os dados. 

Está documentação foi inspirada na documentação do [Kenzie Hub - API](https://gitlab.com/ka-br-jul-2020/kenziehub-api/-/blob/master/readme.md).


<a id="org5b35109"></a>

## Enpoints

A API tem 4 endpoints principais. Uma padrão para usuários, uma para as campanhas e outra para doações. A última, para listar ONGs, é o endpoint de usuários personalizadas. 

A url base da API é <https://capstone4-kenzie.herokuapp.com/>


<a id="org377e03b"></a>

## Listando usuários

Os usuários são separados em 2 tipos, os tipos ONG e os tipos voluntários. Essa separação é representada pelo atributo &ldquo;nog&rdquo; (&ldquo;Non-Governmental Organization&rdquo;, as Ong&rsquo;s em inglês pois todos os atributos estão padronizados em inglês.).

A maior diferença desses usuários é que dependendo do seu tipo, ou &ldquo;userInfo&rdquo; estará preenchida, para voluntários, ou &ldquo;ngoInfo&rdquo; será preenchida para ONGs.

Para ter acesso a todos os usuários basta fazer uma requisição GET.

    {
      "users": [
        {
          "id": 1,
          "email": "teste@gmail.com",
          "password": "$2a$10$yI/qflzpkjFXjTA4/6PzcurHTOuafbmGGyCCsd2yAWb/mapfOp/46",
            "ngo" : false,
          "ngoInfo" : null,
          "userInfo" : {
          "firstName" : "Enias",
          "lastName" : "Oliveira",
          "phoneNumber" : null
          },
          "address" : {
          "postalCode" : null,
          "streetName" : null,  
          "streetNumber" : null,
          "apartmentNumber" : null,
          "city": "Curitiba"
          },
          "image": "Não sei como resolver ainda" #Resolver
        },
        {
          "id": 2,
          "email": "teste2@gmail.com",
          "password": "$2a$10$IG/IuExdr3N/Ct7W/nkyxeaiCUbNIkUV008fr.3bnoDRVffxP3jHG",
          "ngo" : true,
          "userInfo" : null,
          "ngoInfo" : {
          "name" : "Pequeno Principe",
          "phoneNumber" : null,
          "website" : "pequenoprincipe.com"
          },
          "address" : {
          "postalCode" : null,
          "streetName" : null,  
          "streetNumber" : null,
          "apartmentNumber" : null,
          "city": "Curitiba"
          },
          "image": "Não sei como resolver ainda"
        }
      ],
    }

O endpoint \`/campaings\` retornas as campanhas, objetos relacionados aos usuários tipo ONG.

    "campaigns": [
      {
        "id": 0,
        "title": "Meias para os Pequenos Principes(?)",
        "about": "Precisamos de 500 meias",
        "donationType" : "Roupas",
        "goal" : 500,
        "initialDate" : "2021-01-12T16:55:00",
        "endDate" : "2021-01-14T17:00:00",
        "userId" :2
      },
      {
        "id": 1,
        "title": "Sapatos para os Pequenos Principes(?)",
        "about": "Precisamos de 250 meias",
        "donationType" : "Calçados",
        "goal" : 250,
        "initialDate" : "2021-01-12T16:55:00",
        "endDate" : "2021-01-14T17:00:00",
        "userId" :2
      }
    ],

Por último, o endpoint \`/donations\` retornam as doaçãos, objetos relacionados aos usuários tipo voluntário.

    "donations": [
      {
        "id": 0,
        "campaignId": 0,
        "message": "Vou doar 50 meias",
        "username": "Enias",
        "scheduledDate" : "2021-01-13T17:00:00",
        "quantity" : 50,
        "userId" : 1
      },
      {
        "id": 1,
        "campaignId": 0,
        "message": "Vou doar 10 meias",
        "username": "Felipe",
        "scheduledDate" : "2021-01-13T17:00:00",
        "quantity" : 25,
        "userId" : 1
      }
    ]

Como mencionado anteriormente, o endpoint \`/ngos\` retornar todos os usuários cujo a propriedade \`ngo\` seja \`true\`.


<a id="orgf0103d9"></a>

## Personalizando as Rotas

Como está API é baseada no JSON-Server, todas as funcionlidades de query estão disponíveis:


<a id="org9b83ece"></a>

## Rotas plurais

\`\`\`
GET    /users
GET    /users/1
POST   /users
PUT    /users/1
PATCH  /users/1
DELETE /users/1
\`\`\`


<a id="org0a07c94"></a>

### Filter

Use \`.\` para acessar propriedades aninhadas

\`\`\`
GET /posts?title=json-server&author=typicode
GET /posts?id=1&id=2
GET /comments?author.name=typicode
\`\`\`


<a id="orgcccafd7"></a>

### Paginate

Use \`<sub>page</sub>\` and opcionalmente \`<sub>limit</sub>\` para paginar os dados retornados.

In the \`Link\` header you&rsquo;ll get \`first\`, \`prev\`, \`next\` and \`last\` links.

Você ira receber no \`Link\` do Header os links \`first\`, \`prev\`, \`next\` e \`last\`.

\`\`\`
GET /posts?<sub>page</sub>=7
GET /posts?<sub>page</sub>=7&<sub>limit</sub>=20
\`\`\`

<span class="underline">10 itens são retornados por padrão</span>


<a id="org4f31efe"></a>

### Sort

Add \`<sub>sort</sub>\` and \`<sub>order</sub>\` (ascending order by default)

\`\`\`
GET /posts?<sub>sort</sub>=views&<sub>order</sub>=asc
GET /posts/1/comments?<sub>sort</sub>=votes&<sub>order</sub>=asc
\`\`\`

For multiple fields, use the following format:

\`\`\`
GET /posts?<sub>sort</sub>=user,views&<sub>order</sub>=desc,asc
\`\`\`

\### Slice

Add \`<sub>start</sub>\` and \`<sub>end</sub>\` or \`<sub>limit</sub>\` (an \`X-Total-Count\` header is included in the response)

\`\`\`
GET /posts?<sub>start</sub>=20&<sub>end</sub>=30
GET /posts/1/comments?<sub>start</sub>=20&<sub>end</sub>=30
GET /posts/1/comments?<sub>start</sub>=20&<sub>limit</sub>=10
\`\`\`

<span class="underline">Works exactly as [Array.slice](<https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice>) (i.e. \`<sub>start</sub>\` is inclusive and \`<sub>end</sub>\` exclusive)</span>

\### Operators

Add \`<sub>gte</sub>\` or \`<sub>lte</sub>\` for getting a range

\`\`\`
GET /posts?views<sub>gte</sub>=10&views<sub>lte</sub>=20
\`\`\`

Add \`<sub>ne</sub>\` to exclude a value

\`\`\`
GET /posts?id<sub>ne</sub>=1
\`\`\`

Add \`<sub>like</sub>\` to filter (RegExp supported)

\`\`\`
GET /posts?title<sub>like</sub>=server
\`\`\`

\### Full-text search

Add \`q\`

\`\`\`
GET /posts?q=internet
\`\`\`

\### Relationships

To include children resources, add \`<sub>embed</sub>\`

\`\`\`
GET /posts?<sub>embed</sub>=comments
GET /posts/1?<sub>embed</sub>=comments
\`\`\`

To include parent resource, add \`<sub>expand</sub>\`

\`\`\`
GET /comments?<sub>expand</sub>=post
GET /comments/1?<sub>expand</sub>=post
\`\`\`

To get or create nested resources (by default one level, [add custom routes](#add-custom-routes) for more)

\`\`\`
GET  /posts/1/comments
POST /posts/1/comments
\`\`\`

\### Database

\`\`\`
GET /db
\`\`\`

\### Homepage

Returns default index file or serves \`./public\` directory

\`\`\`
GET /
\`\`\`

