import React, { useState, useEffect } from 'react';
import './css/Card.css';

import attack_icon from './icons/attack_icon.svg';
import defense_icon from './icons/defense_icon.svg';
import energy_icon from './icons/energy_icon.svg';
import health_icon from './icons/health_icon.svg';
import move_icon from './icons/move_icon.svg';
import range_icon from './icons/range_icon.svg';
import appraisal_icon from './icons/appraisal_icon.svg';

/**
 * Parse range string like "0(-2/-3)1(-1/0)8(+1/0)16"
 * into bands: [{ from: "0", to: "1", mod: "-2/-3" }, ...]
 */
function parseRangeBands(rangeStr) {
  const parts = rangeStr.split(/\(|\)/);
  // parts alternates: distance, modifier, distance, modifier, ..., distance
  const bands = [];
  for (let i = 0; i + 2 < parts.length; i += 2) {
    bands.push({
      from: parts[i],
      to: parts[i + 2],
      mod: parts[i + 1],
    });
  }
  return bands;
}

function classifyModifier(mod) {
  const str = mod.trim();
  if (str.startsWith('+')) return 'positive';
  if (str.startsWith('-')) return 'negative';
  return 'neutral';
}

function classifyBand(modStr) {
  const [str, skl] = modStr.split('/');
  const s = classifyModifier(str);
  const k = classifyModifier(skl);
  if (s === 'negative' || k === 'negative') return 'negative';
  if (s === 'positive' || k === 'positive') return 'positive';
  return 'neutral';
}

function formatMod(modStr) {
  const [str, skl] = modStr.split('/');
  const fmtPart = (p) => p.trim() === '0' ? '-' : p.trim();
  return `${fmtPart(str)} / ${fmtPart(skl)}`;
}

function RangeBlock({ cardData }) {
  const bands = parseRangeBands(cardData.Combat.Range);
  return (
    <div className="RangeBlock">
      <div className="RangeBandHeader">
        <span>Rng</span>
        <span>Str/Skl</span>
      </div>
      {bands.map((band, i) => (
        <div key={i} className="RangeBand">
          <div className="RangeBandDistance">{band.from}-{band.to}</div>
          <div className={`RangeBandMod ${classifyBand(band.mod)}`}>
            {formatMod(band.mod)}
          </div>
        </div>
      ))}
    </div>
  );
}

function CardDisplay({ cardData }) {
  if (!cardData) return 'loading';

  const dynasty = cardData.Identity.Dynasty;
  const type = cardData.Identity.Type?.toLowerCase() || '';
  const [atkStr, atkSkl] = cardData.Combat.Attack.split('-');
  const [defBlk, defDdg] = cardData.Combat.Defense.split('-');
  const [movSpr, movSus] = cardData.Combat.Movement.split('-');

  return (
    <div className={`Card dynasty-${dynasty}`}>
      {/* Header */}
      <div className="CardHeader">
        <div className="CardName">{cardData.Identity.Name}</div>
      </div>

      {/* Identity subtitle */}
      <div className="CardIdentityRow">
        <span className={`TypeBadge ${type}`}>{cardData.Identity.Type}</span>
        <span className="CharacterIdentity">
          {cardData.Identity.Size} {cardData.Identity.Dynasty} {cardData.Identity.Species} {cardData.Identity.Class}
        </span>
      </div>

      {/* Body */}
      <div className="ContentBody">
        <div className="Content">
          {/* Character art placeholder — images will go here when available */}
          {cardData.Identity.Images?.length > 0 ? (
            <div className="CharacterArt">
              <img src={cardData.Identity.Images[0]} alt={cardData.Identity.Name} />
            </div>
          ) : null}

          {/* Abilities */}
          {cardData.Abilities.length ? (
            <div className="Abilities">
              {cardData.Abilities.map((ability, index) => {
                const abilityType = ability.Type?.toLowerCase() || '';
                return (
                  <div key={index} className={`Ability ${abilityType}`}>
                    <div className="AbilityHeader">
                      {ability.Name}
                      <span className={`AbilityTypePill ${abilityType}`}>{ability.Type}</span>
                    </div>
                    <div className="AbilityText">{ability.Ability}</div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>

        {/* Stats sidebar */}
        <div className="Stats">
          <RangeBlock cardData={cardData} />

          <div className="Stat">
            <img alt="attack" src={attack_icon} className="StatIcon" />
            <div className="StatValue">
              <div className="StatNumber">{atkStr}-{atkSkl}</div>
              <div className="StatLabel">Str-Skl</div>
            </div>
          </div>
          <div className="Stat">
            <img alt="defense" src={defense_icon} className="StatIcon" />
            <div className="StatValue">
              <div className="StatNumber">{defBlk}-{defDdg}</div>
              <div className="StatLabel">Blk-Ddg</div>
            </div>
          </div>
          <div className="Stat">
            <img alt="energy" src={energy_icon} className="StatIcon" />
            <div className="StatValue">
              <div className="StatNumber">{cardData.Combat.Energy}</div>
              <div className="StatLabel">Energy</div>
            </div>
          </div>
          <div className="Stat">
            <img alt="movement" src={move_icon} className="StatIcon" />
            <div className="StatValue">
              <div className="StatNumber">{movSpr}-{movSus}</div>
              <div className="StatLabel">Spr-Sus</div>
            </div>
          </div>
          <div className="Stat">
            <img alt="health" src={health_icon} className="StatIcon" />
            <div className="StatValue">
              <div className="StatNumber">{cardData.Combat.Health}</div>
              <div className="StatLabel">Health</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cost pinned bottom-left, aligned with health row */}
      <div className="CardCost">
        <img alt="appraisal" src={appraisal_icon} className="BottomStatIcon" />
        <span className="BottomStatValue">{cardData.Combat.Appraisal}</span>
      </div>
    </div>
  );
}

function Card({ data }) {
  const [currentUnit, setCurrentUnit] = useState(null);

  useEffect(() => {
    fetch(`/unit/${data}`)
      .then(response => response.json())
      .then(unit => setCurrentUnit(unit));
  }, [data]);

  if (!currentUnit) return null;
  return <CardDisplay cardData={currentUnit} />;
}

export default Card;
