(function(){

angular.module('app')
.controller('cadastrarController', ['autosService', 'pontosService', '$window', 'loginService', 'itensService', function(autosService, pontosService, $window, loginService, itensService){
	var vm = this;
	vm.user = 'Agente: ' + loginService.usuario().name;
	vm.matricula = 'Matrícula:  ' + loginService.usuario().matricula;
	vm.apreendidos = {}
	vm.opcoes = itensService.itens;
	vm.showError = false;
	vm.mostrarLoading = false;
	vm.arrayApreendidos = [];
	vm.auto = {}

	function compare(a,b) {
		  	if(a.nome.nome < b.nome.nome){
		  		return -1;
		  	}else if (a.nome.nome > b.nome.nome){
		  		return 1;
		  	}else{
		  		return 0;
		    }
	}

	function clean(){
		vm.mostrarLoading = false;
		vm.arrayApreendidos = [];
		vm.auto = {}
	}

	function error(err){
		vm.mostrarLoading = false;
		vm.showError = true;
		vm.message = err.data.message;
	}

	vm.logoff = function(){
		$window.localStorage.removeItem('token');
	}

	vm.inserir = function(obj){

		if(obj['nome'] && obj['quantidade']){
			vm.arrayApreendidos.push(obj);
			vm.arrayApreendidos = vm.arrayApreendidos.sort(compare);
			vm.apreendidos = {};
			return;
		}else{
			$window.alert('Preencha os campos do item apreendido');
			return;
		}
	}

	vm.salvar = function(obj1, obj2){

		var executa = function(){
				if(obj1['numero']&& obj1['lacre'] && vm.arrayApreendidos[0]){
				vm.mostrarLoading = true;
				vm.showError = false;

				var promiseAuto = autosService.criarAuto(obj1);
				promiseAuto
				.then(function(data){
					var array = obj1['lacre'].split(',');

					array.forEach(function(value){
						obj = {}
						obj['numero'] = obj1['numero'];
						obj['lacre'] = value;
						obj['']
						var promiseAuto = autosService.criarLacre(obj);
						promiseAuto
							.then(function(data){
								

								vm.arrayApreendidos.forEach(function(value){
									var obj = {};
									obj['numero'] = obj1['numero'];
									obj['nome'] = value.nome.nome;
									obj['quantidade'] = value.quantidade;
									var promiseItem = autosService.criarItem(obj);
									promiseItem
										.catch(function(err){
											error(err);
										})
								})

								clean();			

							})
							.catch(function(err){
								clean();
								error(err);
							});
					})
				})

				.catch(function(err){
					clean();
					error(err);
				});

				return;
			}else{
				$window.alert('Preencha todos os campos!');
			}
		}

		var aviso = function(){
			clean();
			$window.alert('Não foi possível salvar o registro!!!');
			$window.alert('Use apenas números e separe os lacres por vírgulas.');
			$window.alert('Lance os dados novamente.');
		}


		var rg1 = /[^0-9(\, )]/gi;
        var rg2 = /\,/gi;
        var rg3 = / /gi;


        if(!rg1.test(obj1['lacre'])) {
        	if(rg3.test(obj1['lacre'])) {
        		if(rg2.test(obj1['lacre'])){
        			executa();
        		}else{
        			aviso();
        		}
        	}else{
        		executa();
        	}
        }else{
        	aviso();
        }


		
	}

}]);

})();