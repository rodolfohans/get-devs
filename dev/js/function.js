$(document).ready(function inicio() {
	loadProducts();	
});

var spots = 9;			//quantidade de produtos exibidos na página
var	prodArr = [];		//array de produtos
var	$cor = $('.f-cor');
var	$tamanho = $('.f-tamanho');
var	$preco = $('.f-preco');

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

    for(i = 0; i < arr.length; i++) {
        out += '<div class="cont-33 produto-wrapper"><div class="produto-image"><img src="images/produtos/' +
        arr[i].thumbImage + '.jpg"></div></br><div class="produto-nome"><h3>' +
        arr[i].nome + '</h3></br></div><div class="produto-info"><h4>R$ ' +
        arr[i].valor + '</h4><span>até ' +
        arr[i].vezes + 'x de R$' + 
        arr[i].parcela + ',00</span></div><button onclick="" class="botao-comprar"><i class="icon-basket"></i></button></div>';
        if(i + 1 == spots){
        	break;
        }
    }
    document.getElementById("galeria-produtos").innerHTML = out;
}

function showMore() {
	spots = spots + 3;
	writeProducts(prodArr);
}

$cor.click(function () {
	onChange();
});

$tamanho.click(function () {
	onChange();
});

$preco.click(function () {
	onChange();
});

function onChange() {
	var findedProducts = findProduct();
	writeProducts(findedProducts);
}

function findProduct() {
	return filter($cor.filter(":checked").val(),$tamanho.filter(":checked").val(),$preco.filter(":checked").val());
}

function filter(cor, tamanho, preco) {
	var result = [];
	//var	found = false;

	for (var i = 0; i < prodArr.length; i++) {
		var product = prodArr[i];
		//var found = false;
		if ((!cor || product.cor === cor) && (!tamanho || product.tamanho === tamanho) && (!preco || sortPrice(product.valor, preco) == true)){
			result.push(product);
			/*for (var j = 0; j < product.cor.length; j++) {
				var pCor = product.cor[j];

				if (cor === pCor) {
					found = true;
					break;
				}
			}*/
		}
		/*if (found) {
			result.push(product);
		}*/
	}

	return result;
}

function sortPrice(precoProduto, janelaValor) {
	var a = janelaValor.split("-");
	var result = false;
	if ((precoProduto >= Number(a[0])) && (precoProduto <= Number(a[1]))) {
		result = true;
	}
	return result;
}