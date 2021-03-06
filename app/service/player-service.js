'use strict';

const angular = require('angular');
const ngAdventure = angular.module('ngAdventure');

ngAdventure.factory('playerService', ['$q', '$log', 'mapService', playerService]);

function playerService($q, $log, mapService){
  $log.debug('player service');

  let service = {};

  let turn = 0;
  let player = service.player ={
    name: 'cayla',
    location: 'home',
    hp: 16
  };

  let history = service.history = [
    {
      turn,
      desc: 'Welcome to ngAdventure, you are here to play a game',
      location: 'Your House',
      hp: player.hp
    }
  ];

  service.movePlayer = function(direction){
    return new $q((resolve, reject) => {
      turn++;

      let current = player.location;
      let newLocation = mapService.mapData[current][direction];

      if(!newLocation) {
        history.unshift({
          turn,
          desc: 'you have hit a wall!!',
          location: player.location,
          hp: player.hp
        });
        return reject('no room in that direction');
      }

      history.unshift({
        turn,
        location: player.location,
        desc: mapService.mapData[newLocation].desc,
        hp: player.hp
      });

      player.location = newLocation;
      return resolve(player.location);
    });
  };
  return service;
}
