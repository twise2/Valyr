# Valyr
Valyr is a 2+ Player Game revolving around making an army of units and having them battle it out anywhere (on your tabletop). The game revolves around a “True Movement” system that uses actual distance measuring to move characters in your game to defeat your opponents.

# Getting Started

## What you will need

To play a standard game of Valyr you will need a ruler or tape measure, a standard dice set, and any table - Don't even worry about clearing it off!

## Building an Army

At the beginning of the game each player will create or come with an "army" consisting of units with a total "appraisal" value less than or equal to an agreed upon amount (Generally 1000). The "appraisal" value of a card is shown in the bottom right corner.

![Screenshot](Images/appraisal.png)

## Starting the Game

The player with the lowest appraisal value takes the priority token. In the event of a tie, the youngest player starts with the priority token.

## Setup

Starting with the player with the priority token, each player will take their unit cards and place adjacent to each other on an edge of the battlefield. Then each subsequent player to the left will place their unit cards onto the battlefield  These cards denote a teams "starting location". Then in the same order, each player will place their units within 3 range of their starting location.

### Starting The Game

The first "round" of the game begins with the player with the priority token. This player will take a "turn" by choosing a unit and turning that unit card sideways denoting the unit as "exhausted". After each "turn", the player to the left takes a "turn". If all units are "exhausted" at the beginning of a turn, that turn is skipped.

![Screenshot](Images/exhaust.png)

### Taking A Turn

When a turn begins, a player may take a number of actions less than or equal to the amount of energy the unit they chose that turn has:

![Screenshot](Images/energy.png)

There are three types of actions a unit can take

1. "Move"
2. "Attack"
3. "Use an Ability"

After a player has completed their units actions for a turn, the turn is passed.

#### Actions

1. **Move**<br/>
If the move action is chosen, the player will lack at their units movement stat, marked by the winged boots icon.

The movement stat has two numbers -- a sprint value and a sustain value marked as spint-sustain. The first time you move on a turn, a unit can move a distance up to its sprint value. Each subsequent movement a unit can move up to its sustain value. Each movement consumes one energy.

![Screenshot](Images/movement.png)


2. **Attack**<br/>
You may also choose to attack another unit. In order to perform an attack action, choose a unit who is a distance between you minimum range and maximum range.

![Screenshot](Images/min-max-range.png)

After choosing a unit, look at your character attack skills - Denoted by the crossed sword icon. The first number is the strength value of your unit, the second number is the skill value of you unit.

![Screenshot](Images/attack.png)

Next you will look a the range modifier value for the range of the attack you are performing. For example, if Alaestoes's base is 1 range away from the targets, Alaestos will have a range modifier of -1/-3 because the range is between 0 and 3. If Alaestoes's base is 6 range away from the opponents Alaestor will have no range modifier because it is between 3 and 16.

![Screenshot](Images/range-modifier.png)

You will then modify your units strength and skill value by the numbers found in your range modifier. At range 1, Alaestoes would have a strength value of 3 and a skill value of 10 for the attack. At range 6, Alaestoes would have a strength value of 4 and a skill value of 13.

The attacking unit will roll a number of d20s equivalent to their caluclated strength value.

Next look at your opponents defense value. Denoted by the shield icon. The first number denotes a units block value and the second number denotes a units dodge value.

![Screenshot](Images/defense.png)

For each d20 rolled, if the value rolled is less than or equal to the attackers calculated skill value minus the defenders block value, add one "on target attack". The defender can then remove a number of "on target attacks" less than or euqal to it's dodge value. This final number is the number of "hits" a unit takes when attacked Hits are then assigned as damage to the target unit.

For example if Alaestos is attacking with strength 4 and skill 13 and the target has block 3 and dodge 1. Alaestos will roll 4 dice. On each roll of a 10 or less (skill-block), Alaestos will calculate one "on target attack". So if Alaestos rolls a 9, 3, 15, 12 Alaestos will have 2 "on target attacks." The defender can then choose dodge 1 of those "on target attacks" and will take a total of 1 damage.

If at any time the amount of damage on a unit is greater than that units health, that unit is considered "defeated." The units model is returned to the starting area, you can no longer take turns with that unit, and the unit is considered "exhausted" for the rest of the game.

3. **Use an Active Ability** <br/>
A unit can take one action to use an ability described on the card. Active abilities go away if the unit is removed play. Abilites can override base rules. When text of an active ability conflicts with any other ability in play, follow the text of the most recently activated ability.

### End of Round
The round ends when all units for every player are "exhausted". The priority token is then passed to the right, all units are "energized" (no longer exhausted) and a new round begins.

### End of Game
If at any time all players except one have been defeated or concede, the game ends and the last player standing wins.

# Unit Basics
In this game you will construct armies consisting of Units. Units will consists of stats which are contained in the Unit folder:

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
