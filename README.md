# Valyr
Valyr is a 2-∞ Player Game revolving around making an army of units and having them battle it out anywhere (on your tabletop). The game revolves around a “True Movement” system that uses actual distance measuring to move characters in your game to defend yourself. Teams are built to a point standard and games consist of positioning to attack your opponents to win the battle.

# Getting Started

## What you will need

To play a standard game of Valyr you will need a ruler or tape measure, a standard dice set, and any table - Dont event worry about clearing it off!.

## Building an Army

At the beginning of the game each player will create or come with an "army" consisting of units with a total "appraisal" value less than or equal to an agreed upon amount (Generally 1000). The "appraisal" value of a card is shown in the bottom right corner.


## Starting the Game

The player with the lowest appraisal value be given the priority token. In the event of a tie, the youngest player starts with the priority token.

## Setup

Starting with the player with the priority token, each player will take their unit cards and place them on an edge of the battlefield next to each other. These cards denote a teams "starting location". Then that player will place each of their units adjacent to their starting location. Then the game will begin.

### Starting The Game

The first "round" of the game begins with the player with the priority token taking a "turn" by choosing a unit and turning their unit card sideways denoting the unit as "exhausted". After each "turn", the player to the right takes a "turn". If all units are "exhausted" at the beginning of a turn, that turn is skipped.

### Taking A Turn

When a turn begins, a player may take a number of actions less than or equal to the amount of energy the chose unit has - denoted below:

![Screenshot](Images/labeled_unit.png)

There are three types of actions a unit can take

1. "Move"
2. "Attack"
3. "Use an Ability"

After a player has completed their units actions for a turn, the turn is passed.

#### Actions

1. **Move**<br/>


2. **Attack**<br/>



3. **Use an Ability** <br/>

![Screenshot](Images/labeled_unit.png)





### End of Round
The round ends when all units for every player are "exhausted". The priority token is then passed to the left and a new round begins.

### End of Game
If at any time all players except one have been defeated or concede, the game ends and the last player standing wins.


# Unit Basics
In this game you will construct armies consisting of Units. Units will consists of stats which are contained in the Unit folder:


![Screenshot](Images/labeled_unit.png)

### Units predominant types and information will be contained under the units "Identity" explained below.

```
Identity: {
  Name: The units name.
  Basic_Description: Basic Description of what the unit looks like.
  Description: Full description of what the unit is in lore.
  Dynasty: The faction the unit belongs to.
  Type: The character type of the unit. (Champion or Conscript) Champions can only be one ofs in an army, conscripts can be as many as you want.
  Class: The class of character type
  Species: The units species.
  Distinctions: Distinct Traits the unit has.
  Size: Size of the unit.
}
```

### Units combat stats will be contained under the units "combat"

```
Combat: {
  Attack: (Strength-Skill) The number of d20 dice you get to roll when attacking (strength) and the number you have to roll below for a successfull attack (skill).
  Defense: (Armor-Dodge) The amount you can increase each d20 dice on an attack and the number of dice you can nullify completely.
  Range: (min-range-[strength modifier/skill modifier]-range[strength modifier/skill modifier]-max-range) The Range this unit can attack at and the change in their strength/skill at each range
  Energy: The amount of actions this unit can take on a turn.
  Movement: (Sprint-Stamina) How far this unit can move on it's first move of the turn (Sprint) and each subsequent move in the same turn (Stamina)
  Health: How much "distress" a unit can take before being defeated.
  Appraisal: How expensive this unit is to add to your army.
}
```

### Units also contain "Abilites" which consist of special actions and passives the unit has.

```
Abilites: {
  Name: {
    Type: Passive or Active (Active abilites take an action to use)
    Ability: A description of the ability.
    Template: A link to the template the ability uses (if needed)
  }
}
```

### Some Units also need extra components listed under components

```
Components: Extra components needed for this character
```

# Game Play Tenants
The core of this game is to allow creative flexibility and allow for quick wargame elements in any location. Much like collectible card games, design decisions should revolve around:
  1. Creativity. Restrictions breed creativity, but the meta should not revolve around specific elements. Location changes should make most character playable situationally.
  2. Game Speed. Gameplay should not be overly restricted or drag on. Scenarios should encourage quicker gameplay that does not drag out, especially in multiplayer scenarios.
  3. Tension Points. The game should lead to points where a good maneuver or role can swing the tide of the game. Clever Play - Luring opponents into a trap or executing a plan should be rewarded.
  4. Reward Flashy Plays. The game should encourage people to take actions, whatever they may be. Passive or auto play units and teams should be discouraged. General flexible plans should be neccessary.


#### Credits

"https://game-icons.net/1x1/lorc/wingfoot.html" by lorc is licensed under CC BY 3.0"
"https://game-icons.net/1x1/delapouite/rupee.html" by Delapouite is licensed under CC BY 3.0"
