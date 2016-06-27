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
	//var	found = false;

	for (var i = 0; i < prodArr.length; i++) {
		var product = prodArr[i];
		// var found = false;
		if ((!cor || product.cor === cor) && (!tamanho || product.tamanho === tamanho) && (!preco || sortPrice(product.valor, preco))){
			result.push(product);
			//for (var j = 0; j < product.cor.length; j++) {
			//	var pCor = product.cor[j];
			//	if (cor === pCor) {
			//		found = true;
			//		break;
			//	}
			//}
		//}
		//if (found) {
		//	result.push(product);
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

function handleChange() {
	var selecArr = prodArr;
	selecArr = prodArr.filter(filterByColor);
	writeProducts(selecArr);
}

function filterByColor(prod) {
	var result = [];

	/*for (var i = 0; i < prod.cor.length; i++) {
		var prodCor = prod.cor[i];
		alert(prodCor);
		if (($cor.filter(":checked").val()) == prodCor) {
			result.push(prodCor);

		}
	}*/
	return prod.cor == result;
}