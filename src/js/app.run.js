(function() {
	'use strict';
	angular.module('app').run(RunFn);

	RunFn.$inject = ['$location', '$state'];

	function RunFn($location, $state) {
		var arr2 = ['{}[]()', '{[}]'];
		function braces(values) {
			var arr = [];
			for (var i = 0; i < values.length; i++) {
				var result = checkPar(values[i]);
				console.log(result);
				arr.push(result);
			}
			return arr;
		}

		function checkPar(string) {
			var i, keyObj, len, refArr, retStr;
			refArr = [];
			len = string.lenght;
			keyObj = {
				'{': '}',
				'(': ')',
				'[': ']',
			};
			retStr = "YES";
			console.log(retStr);
			for (i = 0; i < string.length; i++) {
				if (string[i] === '{' || string[i] === '[' || string[i] === '(') {
					refArr.push(string[i]);
				} else {
					var lastBrace = refArr.pop();
					if (string[i] !== keyObj[lastBrace]) {
						retStr = "NO";
						return retStr;
					}
				}
			}

			return retStr;
		}

		braces(arr2);

	}

}());