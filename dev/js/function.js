$(document).ready(function inicio() {
	loadProducts();
	
});

var spots = 9;			//quantidade de produtos exibidos na página
	prodArr = [];		//array de produtos

function loadProducts() {
	var xmlhttp = new XMLHttpRequest();
	var url = "produtos.txt";

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        prodArr = JSON.parse(xmlhttp.responseText);
	        writeProducts(prodArr);
	    }
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function writeProducts(arr) {
    var out = "";
    var i;

    for(i = 0; i < spots; i++) {
        out += '<div class="cont-33 produto-wrapper"><div class="produto-image"><img src="images/produtos/' +
        arr[i].thumbImage + '.jpg"></div></br><div class="produto-nome"><h3>' +
        arr[i].nome + '</h3></br></div><div class="produto-info"><h4>R$ ' +
        arr[i].valor + '</h4><span>até ' +
        arr[i].vezes + 'x de R$' + 
        arr[i].parcela + '</span></div><button onclick="" class="botao-comprar"><i class="icon-basket"></i></button></div>';
    }
    document.getElementById("galeria-produtos").innerHTML = out;
}

function showMore() {
	spots = spots + 3;
	writeProducts(prodArr);
}