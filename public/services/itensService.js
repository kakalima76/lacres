
(function(){
	
	angular.module('app')
	.service('itensService', [function(){
		var itens = 
		[
			{'nome':  'ARTIGOS DE PRAIA'},
			{'nome':  'ARTE E PINTURA'},
			{'nome':  'ARTIGOS DE INFORMÁTICA'},
			{'nome':  'ARTIGOS PARA APRESENTAÇÃO'},
			{'nome':  'ARTIGOS PARA ESCRITA'},
			{'nome':  'ARTIGOS PARA ESCRITÓRIO'},
			{'nome':  'ARTIGOS PARA ORGANIZAÇÃO'},
			{'nome':  'ARTIGOS PARA TELEFONES'},
			{'nome':  'ELETRÔNICOS'},
			{'nome':  'EMBALAGENS'},
			{'nome':  'ENVELOPES E ETIQUETAS'},
			{'nome':  'HIGIENE E LIMPEZA'},
			{'nome':  'JOGOS'},
			{'nome':  'MATERIAL ESCOLAR'},
			{'nome':  'MIDIAS'},
			{'nome':  'MOVEIS E EQUIPAMENTOS'},
			{'nome':  'PAPEIS E PASTAS'},
			{'nome':  'VEÍCULO'},
			{'nome':  'ELETRODOMÉSTICO'},
			{'nome':  'ARTIGOS DE TOUCADOR'},
			{'nome':  'ARTIGOS DIVERSOS'},
			{'nome':  'PEÇAS DE VESTUÁRIO'},
			{'nome':  'TRANSPORTE DE CARGA'},
			{'nome':  'CARROÇA'},
			{'nome':  'UTENSÍLIOS PARA CARROÇAS'},
			{'nome':  'BEBIDAS ALCÓOLICAS GARRAFA'},
			{'nome':  'BEBIDAS ALCÓOLICAS LATA'},
			{'nome':  'BEBIDAS NÂO ALCÓOLICAS'},
			{'nome':  'PERECÍVEIS'},
			{'nome':  'MIUDEZAS'},
			{'nome':  'ISOPOR'},
			{'nome':  'DIVERSOS'},
			{'nome':  'QUINQUILHARIAS'},
			{'nome':  'OUTROS'},
			{'nome':  'ARTIGOS DE BAZAR'},
			{'nome':  'ARTIGOS DE PAPELARIA'},
			{'nome':  'ARTIGOS RELIGIOSOS'}
		]


		function compare(a,b) {
		  	if(a.nome < b.nome){
		  		return -1;
		  	}else if (a.nome > b.nome){
		  		return 1;
		  	}else{
		  		return 0;
		    }
		}

		itens = itens.sort(compare)	

		 return {
		 	'itens': itens
		 }
	}]);

})();