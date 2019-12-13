var palavras = new Array()  
palavras[0] = "LOL",
palavras[1] = "BARALHO",
palavras[2] = "CENTAURO",
palavras[3] = "CINEMA",
palavras[4] = "RANKEADA",
palavras[5] = "TECLADO",
palavras[6] = "FREVO",
palavras[7] = "GOOGLE",
palavras[8] = "PROVA",
palavras[9] = "FACEBOOK",
palavras[10] = "TETRIS",
palavras[11] = "PEACH",
palavras[12] = "CATERPIE",
palavras[13] = "VINGADORES",
palavras[14] = "CORINGA",
palavras[15] = "COUNTERSTRIKE",
palavras[16] = "DEADPOOL",
palavras[17] = "MINECRAFT",
palavras[18] = "NARUTO",
palavras[19] = "SUPERNATURAL",
palavras[20] = "ACDC",
palavras[21] = "ALQUIMIA",
palavras[22] = "FILOSOFIA",
palavras[23] = "GUITARRA",
palavras[24] = "GAMEOFTHRONES",
palavras[25] = "SHENLONG",
palavras[26] = "MAC",
palavras[27] = "PROCESSADOR",
palavras[28] = "URL",
palavras[29] = "WIRELESS";

var dicas = new Array()
dicas[0] = "MOBA MAIS JOGADO E MAIS FAMOSO DA ATUALIDADE (2019)",
dicas[1] = "POSSUI 4 NAIPES",
dicas[2] = "CRIATURA METADE HOMEM E CAVALO",
dicas[3] = "7ª ARTE",
dicas[4] = "PARTIDA EM GAMES VIRTUAIS ONDE SE GANHA OU PERDE PONTOS",
dicas[5] = "É COMUM ENCONTRAR O DO TIPO ABNT2",
dicas[6] = "RITMO MUSICAL CARNAVALESCO DE ORIGEM PERNAMBUCANA",
dicas[7] = "MECANISMO DE PESQUISA MAIS UTILIZADO NO MUNDO",
dicas[8] = "EXAME COMUM QUE AVALIA O CONHECIMENTO",
dicas[9] = "REDE SOCIAL MAIS UTILIZADA NO MUNDO (2019)",
dicas[10] = "JOGO ELETRÔNICO BEM ANTIGO (1984)",
dicas[11] = "PRINCESA DO JOGO MARIO",
dicas[12] = "PRIMEIRO POKÉMON QUE ASH CAPTURA",
dicas[13] = "PRINCIPAL GRUPO DE HERÓIS DA MARVEL",
dicas[14] = "VILÃO MAIS FAMOSO DA DC",
dicas[15] = "JOGO DE FPS DE MUITO SUCESSO",
dicas[16] = "ANTI-HERÓI MAIS ZOEIRO DA MARVEL",
dicas[17] = "JOGO DE BLOCOS E AVENTURA",
dicas[18] = "O CLÃ UCHIHA FAZ PARTE DO ANIME OU MANGÁ",
dicas[19] = "IRMÃOS WINCHESTER",
dicas[20] = "BANDA DE ROCK EXTREMAMENTE FAMOSA",
dicas[21] = "'CIÊNCIA MÍSTICA' DA ANTIGUIDADE",
dicas[22] = "CIÊNCIA QUE TRATA SOBRE RAZÃO, EXISTÊNCIA, ENTRE OUTROS ASSUNTOS",
dicas[23] = "INSTRUMENTO DE CORDAS",
dicas[24] = "SÉRIE QUE POSSUI OS DOTHRAKI",
dicas[25] = "DRAGÃO MÁGICO DO ANIME E MANGÁ DRAGON BALL",
dicas[26] = "ENDEREÇO FÍSICO DE UMA MÁQUINA",
dicas[27] = "'CÉREBRO' DO COMPUTADOR",
dicas[28] = "ENDEREÇO DISPONÍVEL EM UMA REDE",
dicas[29] = "REDE SEM FIO";

var teclado = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ç"],
    ["Z", "X", "C", "V", "B", "N", "M"]
];

var random = Math.floor(Math.random()*30);

var guardar = [];

var palavra = palavras[random];

var abertas = [];

var erro = 0;

var acerto = 0;

var soma = 0;

var session = [];

var array = [];

var letras = [];
for (e = 0; e < palavra.length; e++) {
    abertas[e] = '';
}
    
//Express é um(a) módulo/bliblioteca de JavaScript que você pode importar para outro código usando a função require() do Node.js.

var express = require ('express');

//Mustache é uma sintaxe de modelo sem lógica. Pode ser usado para HTML, arquivos de configuração, código fonte - qualquer coisa;
//Nós o chamamos de "sem lógica" porque não há instruções if, cláusulas else ou loops. Em vez disso, existem apenas tags;
//Algumas tags são substituídas por um valor, outras nada e outras por uma série de valores.

var mustache = require ('mustache-express');

//A variável "app" representa a aplicação.

var app = express ();

//"app.engine" define o mecanismo da aplicação.

app.engine ('html', mustache ());

//"app.set" informa qual mecanismo de modelo utilizar, neste caso html.

app.set ('view engine', 'html');

//Define o diretório onde procurar os arquivos de exibição.

app.set ('views', __dirname + '/views');

//"app.get" mostra uma definição de rota.

app.get ('/', function (req, res) {
    limpar();
    res.render ('index.html');
});

app.get ('/ajuda.html', function (req, res) {
    res.render ('ajuda.html');
});

app.get ('/contato.html', function (req, res) {
    res.render ('contato.html');
}); 

app.get ('/sobre.html', function (req, res) {
    res.render ('sobre.html');
});

app.get ('/jogo.html', function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    
    // inicia o codigo da resposta html
    res.write('<html>');
    res.write('<head> <meta charset="utf-8">');
    res.write('<link rel="stylesheet" type="text/css" href="_css/jogo.css">')
    res.write('<body>');
    res.write('<div>');

    var nextp = req.query.nextp || '';

    if (nextp == '1') {
        proximapalavra();
    } 

    var letra = req.query.letra || '';

    if (letra != '') {
        letras.push(letra);
    }

    var reset = req.query.reset;
    if (reset == '1') {
        limpar ();
    }
    
    var letraok = false; 

    res.write('<div id= "abertas">');	
    res.write('<table>');
    
    for (x = 0; x < 1; x++) {
        res.write (`<tr>`);
        for (y = 0; y < palavra.length; y++) {
            letraok = verificacao (letra) || letraok;
            res.write (`<td> ${abertas[y]} </td>`); 
        }
        if (letraok && session.includes(letra) == false) {
            session.push(letra);
            acerto++;
            res.write(`<audio autoplay="autoplay">`);
            res.write(`<source src="_sound/acertou.mp3", type="audio/mpeg";/>`);
            res.write(`</audio>`);
        } else if (reset != 1 && letra != '' && session.includes(letra) == false){
            session.push(letra);
            erro++;
            res.write(`<audio autoplay="autoplay">`);
            res.write(`<source src="_sound/errou.mp3", type="audio/mpeg";/>`);
            res.write(`</audio>`);  

        }
        if (soma == palavra.length && erro <= 6) {
        	res.write('<h1>VOCÊ VENCEU!</h1>');
            teclado = '';
            res.write(`<h2> <a href= '/jogo.html?nextp=1'> IR PARA PRÓXIMA PALAVRA! </a> </h2>`);

        } else if (erro > 6){
            res.write('<h1>VOCÊ PERDEU!</h1>');
            teclado = '';
            res.write(`<h2> <a href= '/jogo.html?nextp=1'> TENTE A SORTE NA PRÓXIMA PALAVRA! </a> </h2>`);
            res.write(`<h3> A PALAVRA ERA: </h3>`);
        }
        if (erro == 6) {
            abertas = palavra;
        }
        res.write (`</tr>`);
    }
        
    res.write('</table>');
    res.write('</br>');
    res.write('<div id="teclado">');
    res.write(`<table>`)
    
    for (var i = 0; i < teclado.length; i++) {
        res.write('<tr>');
        
            for (var j = 0; j < teclado[i].length; j++) { 
                res.write(`<td>`);
                if (letras.includes(teclado[i][j])) {
                    res.write(`<span>`);
                    res.write(`${teclado[i][j]}`);
                    res.write(`</span>`); 
                } else {
                    res.write(`<a href= '/jogo.html?letra=${teclado[i][j]}' >`);
                    res.write(`${teclado[i][j]}`);
                    res.write(`</a>`); 
                }
                res.write(`</td>`);
            }

        res.write('</tr>');
    }
    
    res.write('</table>');
    res.write(`<h2>`);
    res.write(`QUANTIDADE DE LETRAS: ${palavra.length}`);
    res.write(`</h2>`);
    res.write(`<h3>`);
    res.write(`QUANTIDADE DE ERROS: ${erro}`);
    res.write(`</h3>`);
    res.write(`<h4>`);
    res.write(`DICA: ${dicas[random]}`);
    res.write(`</h4>`);
    
    if (erro < 8) {
        res.write(`<img src="_imagens/${erro}.png">`); 
        res.write(`</img>`);
    }

    res.write('<h5>');
    res.write('<a href= /jogo.html?reset=1>RESETAR</a>');
    res.write('</h5>');
    res.write('</div>');
    res.write(`<h5>`);
    res.write(`<a  href="/">Voltar</a>`);
    res.write(`</h5>`);
    res.write('</body>');
    res.write('</head>');
    res.write('</html>');
    res.end();
 
});

function verificacao (letra) {
    if (letra == palavra[y]) {
        abertas[y] = palavra[y];
        array.push (1);
        for (var q = 0; q < array.length; q++) {
            soma = soma + array[q];
            return soma;
        }
        return true;
    }
    return false;
}

function limpar () {
    random = Math.floor(Math.random()*30);
    palavra = palavras[random];
    acerto = 0;
    erro = 0;
    abertas = [];
    soma = 0;
    array = [];
    letras = [];
    session = [];
    guardar = [];
    teclado = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ç"],
    ["Z", "X", "C", "V", "B", "N", "M"]
    ];
    for (e = 0; e < palavra.length; e++) {
        abertas[e] = '';
    }
            
}

function proximapalavra () {
    guardar.push(random);
    if (guardar.length == palavras.length) {
        limpar();
    } else {
        random = Math.floor(Math.random()*30);
        while (guardar.includes(random)) {
            random = Math.floor(Math.random()*30);
        }
        palavra = palavras[random];
        acerto = 0;
        erro = 0;
        soma = 0;
        array = [];
        abertas = [];
        letras = [];
        session = [];
        teclado = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ç"],
        ["Z", "X", "C", "V", "B", "N", "M"]
        ];
        for (e = 0; e < palavra.length; e++) {
            abertas[e] = '';
        }
    }
}

//"express.static" entrega arquivos estáticos.

app.use('/_css', express.static(__dirname + '/_css'));

app.use('/_imagens', express.static(__dirname + '/_imagens'));

app.use('/_sound', express.static(__dirname + '/_sound'));

//A variável port define a porta que será utilizada na aplicação.

var port = 3000;
app.listen (port, function () {
    console.log (`Escutando na porta ${port}...`);
});