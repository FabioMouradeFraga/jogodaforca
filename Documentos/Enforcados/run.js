//Palavras do Jogo

var palavras = new Array()  
palavras[0] = "LAÇO",
palavras[1] = "PORTA",
palavras[2] = "DATAGRAMA",
palavras[3] = "KERNEL",
palavras[4] = "PROCESSADOR",
palavras[5] = "ENLACE",
palavras[6] = "IFCONFIG",
palavras[7] = "HTTP",
palavras[8] = "URL",
palavras[9] = "CSS",
palavras[10] = "JAVASCRIPT",
palavras[11] = "HTML",
palavras[12] = "ARRAY",
palavras[13] = "MYSQL",
palavras[14] = "CONSTANTE",
palavras[15] = "NODEJS",
palavras[16] = "SUBLIME",
palavras[17] = "BACKBONE",
palavras[18] = "SERVIDOR",
palavras[19] = "CLIENTE",
palavras[20] = "WIRELESS",
palavras[21] = "ALLAN";

var dicas = new Array()
dicas[0] = "EXECUÇÃO REPETIDAS VEZES DE DETERMINADA(S) LINHA(S) DE UM CÓDIGO",
dicas[1] = "CONEXÃO VIRTUAL QUE PODE SER USADA NA TRANSMISSÃO DE DADOS",
dicas[2] = "PODE SER DO TIPO UDP OU IP",
dicas[3] = "NÚCLEO DO SISTEMA OPERACIONAL",
dicas[4] = "CÉREBRO DO COMPUTADOR",
dicas[5] = "CAMADA NA QUAL HÁ TRANSMISSÃO DE QUADROS/FRAMES",
dicas[6] = "COMANDO DO LINUX QUE OFERECE INFORMAÇÕES SOBRE O IP DA REDE",
dicas[7] = "PROTOCOLO DE TRANSFERÊNCIA DE HIPERTEXTO",
dicas[8] = "ENDEREÇO DISPONÍVEL EM UMA REDE",
dicas[9] = "FERRAMENTA DE ESTILO",
dicas[10] = "LINGUAGEM DE PROGRAMAÇÃO MAIS UTILIZADA NO MUNDO (2019)",
dicas[11] = "LINGUAGEM DE MARCAÇÃO",
dicas[12] = "ESTRUTURA DE DADOS QUE PODE ARMAZENAR DIVERSOS VALORES",
dicas[13] = "FAMOSO SISTEMA DE GERENCIAMENTO DE BANCO DE DADOS",
dicas[14] = "ESPAÇO RESERVADO NA MEMÓRIA QUE NÃO MUDA DE VALOR",
dicas[15] = "INTERPRETADOR DE JAVASCRIPT",
dicas[16] = "SOFTWARE UTLIZADO PARA EDITAR CÓDIGO-FONTE",
dicas[17] = "ESPINHA DORSAL/REDE PRINCIPAL",
dicas[18] = "SOFTWARE OU COMPUTADOR RESPONSÁVEL POR FORNECER SERVIÇO(S)",
dicas[19] = "ENTIDADE QUE CONSOME O(S) SERVIÇO(S) DE UMA ENTIDADE SERVIDORA",
dicas[20] = "REDE SEM FIO",
dicas[21] = "EXÍMIO PROFESSOR, EXCELENTE PROFISSIONAL E PROGRAMADOR (DÁ AULA DE LÓGICA DE PROGRAMAÇÃO NO IFPE CAMPUS IGARASSU)";

//Teclado

var teclado = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ç"],
    ["Z", "X", "C", "V", "B", "N", "M"]
];

var random = Math.floor(Math.random()*22);

//Função para partir uma string

var palavra = palavras[random].split("");

var abertas = [];
var erro = 0;
var acerto = 0;
var soma = 0;
var array = [];
var letras = [];
for (e = 0; e < palavra.length; e++) {
    abertas[e] = '';
}
teclado = [
["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ç"],
["Z", "X", "C", "V", "B", "N", "M"]
];
    
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
    random = Math.floor(Math.random()*22);
    palavra = palavras[random].split("");
	erro = 0;
	acerto = 0;
	soma = 0;
    abertas = [];
    letras = [];
    for (e = 0; e < palavra.length; e++) {
        abertas[e] = '';
    }
    teclado = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ç"],
    ["Z", "X", "C", "V", "B", "N", "M"]
    ];
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

    var letra = req.query.letra || '';

    if (letra != '') {
        letras.push(letra);
    }

    var reset = req.query.reset;

    limpar (1);
    
    var letraok = false; 

    res.write('<div id= "abertas">');	
    res.write('<table>');
    
    for (x = 0; x < 1; x++) {
        res.write (`<tr>`);
        for (y = 0; y < palavra.length; y++) {
            letraok = verificacao (letra) || letraok;
            res.write (`<td> ${abertas[y]} </td>`); 
        }
        if (letraok) {
            acerto++;
            res.write(`<audio autoplay="autoplay">`);
            res.write(`<source src="_sound/acertou.mp3", type="audio/mpeg";/>`);
            res.write(`</audio>`);
        } else {
            if (reset != 1 && letra != '') {
                erro++;
                res.write(`<audio autoplay="autoplay">`);
                res.write(`<source src="_sound/errou.mp3", type="audio/mpeg";/>`);
                res.write(`</audio>`);  
        }
            }
        if (soma == palavra.length && erro <= 6) {
        	res.write('<h1>VOCÊ VENCEU!</h1>');
            teclado = '';
        } else if (erro > 6){
            res.write('<h1>VOCÊ PERDEU!</h1>');
            res.write(`<h3>A PALAVRA ERA: ${palavras[random]}</h3>`);
            teclado = '';
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

    //console.log (teclado);
    //console.log("erro", erro);

    res.write (`<h2>`);
    res.write (`QUANTIDADE DE LETRAS: ${palavra.length}`);
    res.write (`</h2>`);

    res.write (`<h3>`);
    res.write (`QUANTIDADE DE ERROS: ${erro}`);
    res.write (`</h3>`);

    res.write(`<h4>`);
    res.write(`DICA: ${dicas[random]}`);
    res.write(`</h4>`);
    
    if (erro < 8) {
        res.write(`<img src="_imagens/${erro}.png">`); 
        res.write(`</img>`);
    }

    res.write('<h5>');
    res.write('<a href= /jogo.html?reset=1>RESETAR OU IR PARA A PRÓXIMA PALAVRA</a>');
    res.write('</h5>');
    
    res.write(`<h6>`);
    res.write(`<a  href="/">Voltar</a>`);
    res.write(`</h6>`);
    res.write('</div>');

    res.write('</body>');
    res.write('</head>');
    res.write('</html>');
    res.end();
 
    function limpar (valor) {
        if (reset == 1) {
            random = Math.floor(Math.random()*22);
            palavra = palavras[random].split("");
            acerto = 0;
            erro = 0;
            soma = 0;
            array = [];
            letras = [];
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

});

//"express.static" entrega arquivos estáticos.

app.use('/_css', express.static(__dirname + '/_css'));

app.use('/_imagens', express.static(__dirname + '/_imagens'));

app.use('/_sound', express.static(__dirname + '/_sound'));

//A variável port define a porta que será utilizada na aplicação.

var port = 3000;
app.listen (port, function () {
    console.log (`Escutando na porta ${port}...`);
});