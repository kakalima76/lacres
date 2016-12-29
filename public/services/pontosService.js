(function(){

angular.module('app')
.service('pontosService', ['$http', '$window', function($http, $window){

	var salvar = function(obj){

		return $http.post('https://credenciais.herokuapp.com/pontos/inserir', obj, 
			{
				'headers': 
				{
					'Authorization': 'Bearer ' + $window.localStorage['token']
				}

			}
		)
	}

	var listar = function(obj){

		return $http.post('https://credenciais.herokuapp.com/pontos/listarPeriodo', obj, 
			{
				'headers': 
				{
					'Authorization': 'Bearer ' + $window.localStorage['token']
				}

			}
		)
	}

	var remover = function(obj){

		return $http.post('https://credenciais.herokuapp.com/pontos/remover', obj, 
			{
				'headers': 
				{
					'Authorization': 'Bearer ' + $window.localStorage['token']
				}

			}
		)
	}

	return {
		'salvar': salvar,
		'listar': listar,
		'remover': remover
	}
}])

})();