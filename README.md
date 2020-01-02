# Valyr
Valyr is a 2-∞ Player Game revolving around taking Heroes and having them battle it out anywhere (on your tabletop). The game revolves around a “True Movement” system that uses actual distance measuring to move characters in your game to defend yourself. Teams are built to a point standard and games consist of positioning to attack your opponents to win the battle.

# Getting Started

## What you will need

To play Valyr you will need a ruler or tape measure a standard dice set. Some units may also consist of more components.

## Sample Game
At the beginning of the game each player will create or come with an "army" consisting of units with a total appraisal value less than or equal to an agreed upon amount.

The player with the lowest appraisal value will start the game with the priority token. In the event of a tie a coin flip will detemine the first player.

### Rounds

A game consists of a session of rounds. At the beginning of each round, Players each turn all of their unit cards vertical and  then take turns starting with the player with the priority token.

### Turns
Starting with the player with the priority token, players will choose a vertical unit card and take a number of actions equal to the "energy" of that card. After performing these actions the unit will become "exhausted" (denoted by turning the card horizontal) and cannot be used for the rest of the round. Then the player to the left will take a turn.

#### Actions
When performing an action a unit may do one of the following:

1. **Attack**<br/>
An Attack is performed by picking an opposing unit between "min-range" and "max-range" and within line of sight of the attacker. When attacking, the attacker will look at their "attack" stat for their "strength" and "skill" ratings. The attacker will then modify those ratings by the modifiers found in their range table for the appropriate range the attack is occuring at. The attacker will then roll a d20 for each "strength" they have. On each roll, the number on that d20 will be increased by the defending players "armor" rating. If the ending number is below the attackers "skill" rating the attack will be considered successful and an "on target attack" will be accessed. After all "on target attacks" are acessed, the total is then decreased by the defenders "dodge" rating and the total will be assigned as "hits" to the defender. The defender will then gain distress equal to the number of hits. If the defenders "destress" rating exeeds their health the defender is considered defeated, their miniature is removed from the board and their card is flipped over and "exhausted".

2. **Move**<br/>
A move is performed by taking a unit and moving their base up to the amount of their move. A single move can be split up but each split must consist of the character moving in a measureable straight line. A character's first move of a turn the can move up to the amount of their "sprint" rating while each subsequent movement can move up to an amount of their stamina rating.<br/>
**Moving Vertically** <br/>
When a unit moves vertically more than it 1 movement in distance, it must first reach the base of the vertical objects and then move up it. If a handhold or a ladder is not present, each one move the unit takes vertically will cost two movement points. If the unit is unable to reach a location that allows it's base to stand flat the unit will fall, exhausting the unit and ending it's turn.

3. **Use an Ability** <br/>
A unit may also use an ability when applicable. These abilities will explain what they do and how they work and can change the gameplay rules.

### End of Round
After a turn, if all units are exhausted, the round ends the player with the priority token passes it to the right and a new round begins.

### End of Game
If at any time all players except one have been defeated or concede, the game ends and the last player standing wins.


# Unit Basics
In this game you will construct armies consisting of Units. Units will consists of stats which are contained in the Unit folder:

### Units predominant types and information will be contained under the units "Identity" explained below.

```
Identity: {
  Name: The units name.
  Dynasty: The faction the unit belongs to.
  Type: The character type of the unit. (Hero or Conscript)
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








