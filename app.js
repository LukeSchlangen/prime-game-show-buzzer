var app = angular.module("buzzerApp", ["firebase"]);

app.controller('buzzerController', ['$firebaseArray', '$timeout', function ($firebaseArray, $timeout) {
    var self = this;
    var buzzesRef = firebase.database().ref().child("buzzes");
    var currentBuzzesRef = firebase.database().ref().child("current_buzzes");

    self.buzzes = $firebaseArray(buzzesRef.limitToLast(25));
    self.currentBuzzes = $firebaseArray(currentBuzzesRef);

    self.helpfulMessage = 'Click The Button to Buzz In';

    self.buzzIn = function () {
        if (self.justClicked && self.currentBuzzes.length > 0) {
            self.helpfulMessage = 'Patience please! You can only buzz in once every 5 seconds.';
        } else {
            self.justClicked = true;
            $timeout(function () {
                self.justClicked = false;
                self.helpfulMessage = 'Click The Button to Buzz In';
            }, 5000);
            self.buzzes.$add({
                team: {
                    name: self.team.name
                }
            });
            self.currentBuzzes.$add({
                team: {
                    name: self.team.name
                }
            });
        }
    };

    self.clearCurrentBuzzes = function () {
        console.log('Clearing the board');
        self.currentBuzzes.forEach(function (element) {
            self.currentBuzzes.$remove(element);
        });
    }


    var teamNameList = [
        'Higgs Bosons',
        'Mad Scientists',
        'Springfield Isotopes',
        'SAS Serious About Science',
        '100 Degrees Kelvin',
        'Team Opportunity',
        'Natural Selection',
        'Geology Rocks',
        'Nothing Cooler Than Absolute Zero',
        'Contagious Intelligence',
        'The Dream Machine',
        'Circuit Breakers',
        'To Infinity & Beyond!',
        'Rockin Robos',
        'System Overload',
        'Talk Nerdy to Me',
        'Domo Origato',
        'Fuzzy Logic',
        'Optimus Primates',
        'Tech No Logic',
        'Number Ninjas',
        'Binary Code',
        'DigiMinds'
    ];

    self.team = { name: teamNameList[Math.floor(Math.random() * teamNameList.length)] };

}]);
