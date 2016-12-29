(function(){

angular.module('app')
.controller('imprimirController', ['$scope', 'pontosService', '$window', 'loginService', 'itensService', function($scope, pontosService, $window, loginService, itensService){
	var vm = this;
	vm.user = 'Agente: ' + loginService.usuario().name;
	vm.matricula = 'Matrícula:  ' + loginService.usuario().matricula;
	vm.item = {}
	vm.opcoes = itensService.itens;
	vm.ocultarDocumento = false;
	vm.showError = false;
	vm.mostrarLoading = false;

	vm.logoff = function(){
		$window.localStorage.removeItem('token');
	}

	vm.salvar = function(obj){
		vm.showError = false;
		vm.ocultarDocumento = true;
		//vm.mostrarLoading = true;

		var conteudo = document.getElementById('print').innerHTML,
		tela_impressao = window.open('about:blank');
		tela_impressao.document.write(conteudo);
		tela_impressao.window.print();
		tela_impressao.window.close();
	}

}]);

})();