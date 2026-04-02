import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card.jsx';
import './css/Printable.css';

function Printable() {
  const { cardName } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/unit/${cardName}`)
      .then(response => response.json())
      .then(d => setData(d));
  }, [cardName]);

  function getTemplates(unit) {
    let templates = [];
    unit.Abilities.forEach(ability => {
      if (ability.Template) {
        let tmpl = ability.Template;
        if (tmpl.includes('(')) {
          tmpl = tmpl.split('(')[0];
        }
        templates.push(
          tmpl.trim().replace(' ', '_').toLowerCase(),
        );
      }
    });
    return [...new Set(templates)];
  }

  if (!data) return null;

  const templates = getTemplates(data);

  return (
    <div>
      <div className="PrintableSheet">
        <Card data={cardName} />
      </div>
      {templates.map(template => {
        const img_src = `/templates/${template}.svg`;
        return (
          <div key={template} className="PrintableSheet">
            <img alt="svg of the each ability" src={img_src} />
          </div>
        );
      })}
    </div>
  );
}

export default Printable;
