(function(){
	angular.module('app')

	.service('autosService', ['$http', function($http){

		var criarAuto = function(obj){
			return $http.post('http://localhost:3010/autos', obj);
		}

		var criarItem = function(obj){
			return $http.post('http://localhost:3010/autos/itens', obj);
		}

		var criarLacre = function(obj){
			return $http.post('http://localhost:3010/autos/lacres', obj);
		}

		var listarAutos = function(){
			return $http.get('http://localhost:3010/autos');
		}

		

		return {
			'criarAuto': criarAuto,
			'criarItem': criarItem,
			'criarLacre': criarLacre,
			'listarAutos': listarAutos
		}

	}]);
})();