(function(){

angular.module('app')
.controller('listarController', ['autosService', '$scope', 'pontosService', '$window', 'loginService',  function(autosService, $scope, pontosService, $window, loginService){
	var vm = this;
	vm.user = 'Agente: ' + loginService.usuario().name;
	vm.matricula = 'Matrícula:  ' + loginService.usuario().matricula;
	vm.solicitacao = {}
	vm.ocultarDocumento = false;
	vm.showError = false;
	vm.mostrarLoading = false;
	vm.listar = 'templates/sub_listar.html';
	vm.mostrarLoading = false;
	var previLista = [];
	

	
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

	var promise = autosService.listarAutos();

	promise
		.then(function(data){
			data.data.forEach(function(value1){
				value1.item.forEach(function(value2){
					previLista.push({'nome': value2.nome, 'quantidade': value2.quantidade});
				})
			})

			previLista.forEach(function(value){
			var count = 0;
			previLista.forEach(function(obj){
				if(value.nome === obj.nome){
					count = count + obj.quantidade;
					value.total = count;
				}
			});

			console.log(previLista);

			vm.lista = []
			var distinctLacre = []
					previLista.forEach(function(value){
						if(distinctLacre.indexOf(value.nome) === -1){
							distinctLacre.push(value.nome);
							vm.lista.push({nome: value.nome, quantidade: value.total});
						}
					});	

			console.log(vm.lista);
	})


		})
		.catch(function(err){
			console.log(err);
		})



	
}]);

})();