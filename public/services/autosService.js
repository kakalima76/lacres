(function(){
	angular.module('app')

	.service('autosService', ['$http', function($http){

		var criarAuto = function(obj){
			return $http.post('https://credenciais.herokuapp.com/autos', obj);
		}

		var criarItem = function(obj){
			return $http.post('https://credenciais.herokuapp.com/autos/itens', obj);
		}

		var criarLacre = function(obj){
			return $http.post('https://credenciais.herokuapp.com/autos/lacres', obj);
		}

		var listarAutos = function(){
			return $http.get('https://credenciais.herokuapp.com/autos');
		}

		

		return {
			'criarAuto': criarAuto,
			'criarItem': criarItem,
			'criarLacre': criarLacre,
			'listarAutos': listarAutos
		}

	}]);
})();