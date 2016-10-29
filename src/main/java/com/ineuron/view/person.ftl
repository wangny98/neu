<#-- @ftlvariable name="" type="com.ineuron.views.PersonView" -->
<html ng-app>
<head>
	<title>Person</title>
	<script src="/assets/js/angular-1.0.1.min.js"></script>
</head>
    <body>
        <!-- calls getPerson().getName() and sanitizes it -->
        <h1>Hello, ${person.name?html}!</h1>
        <div ng-controller="ContactController">
	 Email:<input type="text" ng-model="newcontact"/>
	<button ng-click="add()">Add</button>
	<h2>Contacts</h2>

	<ul>
		<li ng-repeat="contact in contacts"> {{ contact }} </li>
	</ul>

</div>
<script type="text/javascript">
	function ContactController($scope) {
	    $scope.contacts = ["hi@email.com", "hello@email.com"];

	    $scope.add = function() {
		$scope.contacts.push($scope.newcontact);
		$scope.newcontact = "";
	    }
	}
</script>
    </body>
</html>