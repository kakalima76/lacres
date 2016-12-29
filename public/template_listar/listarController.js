(function(){

angular.module('app')
.controller('listarController', ['$scope', 'pontosService', '$window', 'loginService',  function($scope, pontosService, $window, loginService){
	var vm = this;
	vm.user = 'Agente: ' + loginService.usuario().name;
	vm.matricula = 'Matrícula:  ' + loginService.usuario().matricula;
	vm.solicitacao = {}
	vm.ocultarDocumento = false;
	vm.showError = false;
	vm.mostrarLoading = false;
	vm.listar = 'templates/sub_listar.html';
	vm.mostrarLoading = false;
	

	
	function compare(a,b) {
		  	if(a.data > b.data){
		  		return 1;
		  	}else if (a.data < b.data){
		  		return -1;
		  	}else{
		  		return 0;
		    }
	}	

	vm.logoff = function(){
		$window.localStorage.removeItem('token');
	}


	vm.buscar = function(obj){
		var pontos = 0;
		vm.mostrarLoading = true;
		vm.listaDePontos = [];
		var promise = pontosService.listar(obj);


		promise
		.then(function(data){
			
			data.data.forEach(function(value){
				vm.listaDePontos.push(value)
			});

			//var previsao = dataAtual.setDate(dataAtual.getDate() + dias); 

			vm.listaDePontos.forEach(function(value){
				var dt = new Date(value.data);
				console.log(dt.setDate(dt.getDate() + 1));
				if(dt.getMonth() < 10){
					value['strDate'] = (dt.getDate()) + '/' + ('0' + (dt.getMonth() + 1)) + '/' + dt.getFullYear();
				}else{
					value['strDate'] = (dt.getDate()) + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear();
				}

				pontos = pontos + value.valor

			});

			vm.pontos = 'Total de pontos no período: ' + pontos;
			vm.listaDePontos.sort(compare);

			vm.mostrarLoading = false;
			 
		})
		.catch(function(err){
			vm.mostrarLoading = false;
			vm.showError = true;
			vm.message = err.data.message;
		})
	}

	vm.remover = function(value){
		var item = {}
		item['id'] = value;
		var promise = pontosService.remover(item);

		promise
		.then(function(data){
			vm.buscar(vm.solicitacao);
		})
		.catch(function(err){
			$windo.alert(err);	
		})

	}
	
}]);

})();