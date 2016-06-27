$(document).ready(function() {
	loadProducts();
	filtersCheck();	
	addToCart();
	cartCounter();
});

var spots = 9;			//quantidade de produtos exibidos na página
var	prodArr = [];		//array de produtos total
var cartArr = [];		//array de produtos no carrinho
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
        arr[i].parcela + ',00</span></div><button id="prod-' +
        arr[i].codigo + '" class="botao-comprar"><i class="icon-basket"></i></button></div>';
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

function filtersCheck() {
	$cor.click(function () {
		onChange();
	});	
	$tamanho.click(function () {
		onChange();
	});	
	$preco.click(function () {
		onChange();
	});
}

function onChange() {
	var findedProducts = findProduct();
	writeProducts(findedProducts);
}

function findProduct() {
	return filter($cor.filter(":checked").val(),$tamanho.filter(":checked").val(),$preco.filter(":checked").val());
}

function filter(cor, tamanho, preco) {
	var result = [];

	for (var i = 0; i < prodArr.length; i++) {
		var product = prodArr[i];

		if ((!cor || product.cor === cor) && (!tamanho || product.tamanho === tamanho) && (!preco || sortPrice(product.valor, preco))){
			result.push(product);
		}
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

function addToCart() {

	$("#galeria-produtos").on("click", ".botao-comprar", function() {
		var prodId = $(this).attr("id");
		if(checkCookie("profiteCart") == true) {
			cartArr = JSON.parse(getCookie("profiteCart"));
			cartArr.push(prodId);
			setCookie("profiteCart", JSON.stringify(cartArr), 5);
		} else {
			cartArr.push(prodId);
			setCookie("profiteCart", JSON.stringify(cartArr), 5);
		}
		cartCounter();
	});
}

function checkCookie(cname) {
	var result = false;
	if(getCookie(cname) != "") {
		result = true;
	}
	return result;
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');

	for (var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function cartCounter() {
	var $cartBadge = $("#shop-badge");
	if(checkCookie("profiteCart") == true) {
		cartArr = JSON.parse(getCookie("profiteCart"));
		$cartBadge.text(cartArr.length);
		$cartBadge.css("visibility", "visible");
	} else {
		$cartBadge.css("visibility", "hidden");
	}
}