(function(){

angular.module('app')
.controller('imprimirController', ['$scope', 'autosService', '$window', 'loginService', function($scope, autosService, $window, loginService){
	var vm = this;
	vm.user = 'Agente: ' + loginService.usuario().name;
	vm.matricula = 'Matrícula:  ' + loginService.usuario().matricula;
	vm.item = {};
	vm.auto = null;
	var date = new Date();
	vm.data = date.getDate() + '/'+ (date.getMonth() + 1) + '/' + date.getFullYear();
	
	vm.logoff = function(){
		$window.localStorage.removeItem('token');
	}

	vm.salvar = function(obj){
		vm.showError = false;
		vm.ocultarDocumento = true;
		//vm.mostrarLoading = true;



		var filtro = function(value){
			if(value === vm.item.lacre){
				return true;
			}
		}

		var promise = autosService.listarAutos();

		promise

			.then(function(data){
				
				data.data.forEach(function(value1){
					value1.lacre.forEach(function(value2){
						if(value2 == vm.item.lacre){
							vm.auto = value1.numero;
						}
					})
				})

			})

			.then(function(){
				setTimeout(function(){
				var conteudo = document.getElementById('print').innerHTML,
				tela_impressao = window.open('about:blank');
				tela_impressao.document.write(conteudo);
				tela_impressao.window.print();
				tela_impressao.window.close();
				}, 100);
			})

			.catch(function(err){
				console.log(err);
			})

		
	}

}]);

})();