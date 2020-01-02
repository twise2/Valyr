# Valyr
An Open Source War Game.

## Getting Started

### What you will need

To play Valyr you will need a ruler or tape measure and a standard dice set.


### Units 
In this game you will construct armies consisting of Units. 

Units will consists of stats which are contained in the Unit folder: 

Units predominant types and information will be contained under the units "Identity" explained below.

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

Units combat stats will be contained under the units "combat"

```
Combat: {
  Attack: The amount of attack modifier this unit gets.
  Defense: The defense modifier this unit gets.
  Range: The Range this unit can attack at.
  Movement: How far this unit can move.
  Health: How strong a unit is.
  Appraisal: How expensive this unit is to add to your army.
}
```

Units also contain "Abilites" which consist of special actions and passives the unit has.

```
Abilites: {
  Name: {
    Type: Passive or Active (Active abilites take an action to use)
    Ability: A description of the ability.
    Template: A link to the template the ability uses (if needed)
  }
}
```








