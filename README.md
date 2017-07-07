
# GALAGA


## Description

Galaga is a game that consists of the player ship and multiple aliens. You must shoot all of the aliens before moving on to the next phase of the game. When the game begins, you have 3 lives. You lose when the player ship has been shot by aliens 3 times. This game is still a work in progress as to get the aliens to fly in formation and fly at the player ship.

## Goals

 - Build a game that is playable in the browser
 - Use design patterns to drive both the design and implementation of code
 - Separate business-logic code from view-related code
 - Use test-driven design to build a client-side application

## Design Approach

 - The style we chose was inspired by the original Galaga arcade game.
 - We used an image sprite that consists of all the original game pieces.
 - We used an 8-bit arcade font to display scoring and instructions.

## Technical Approach

 - We used ES6, and webpack to bundle our files.
 - We created different files that contain the game's object classes.
 - Our game logic is in a separate file.
 - We used a second canvas to display our background of panning stars to appear as if you are flying thru space.

## Difficulties

 - The aliens fire more frequently each new phase you enter into.
 - When the player hits an alien, the player is able to fire at a quicker rate.

## Screenshot

<img width="1280" alt="screen shot of game" src="https://user-images.githubusercontent.com/20754511/27962461-346077f4-62ef-11e7-8034-53980c90d1f7.png">


<img width="1280" alt="screen shot of game" src="https://user-images.githubusercontent.com/20754511/27962471-392c40ba-62ef-11e7-9bde-85deafca09bc.png">
