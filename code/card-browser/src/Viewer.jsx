import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Card from './Card.jsx';
import Notification from './Notification.jsx';
import './css/Viewer.css';

function Viewer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [originalUnits, setOriginalUnits] = useState(null);
  const [notification, setNotification] = useState(null);
  const [nameSearch, setNameSearch] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState(() => {
    const f = {};
    for (const key of ['Dynasty', 'Type', 'Class', 'Species', 'Size']) {
      const val = searchParams.get(key);
      if (val) f[key] = val;
    }
    return f;
  });

  useEffect(() => {
    fetch('/units')
      .then(response => response.json())
      .then(data => setOriginalUnits(data));
  }, []);

  // Derive filter options from all units
  const filterOptions = useMemo(() => {
    if (!originalUnits) return {};
    const opts = {};
    for (const key of ['Dynasty', 'Type', 'Class', 'Species', 'Size']) {
      const values = new Set();
      Object.values(originalUnits).forEach(u => {
        if (u.Identity[key]) values.add(u.Identity[key]);
      });
      opts[key] = [...values].sort();
    }
    return opts;
  }, [originalUnits]);

  // Filter units
  const filteredUnits = useMemo(() => {
    if (!originalUnits) return null;
    const entries = Object.entries(originalUnits).filter(([fileName, unit]) => {
      // Text search on name and description
      if (nameSearch) {
        const q = nameSearch.toLowerCase();
        const name = unit.Identity.Name.toLowerCase();
        const desc = (unit.Identity.Basic_Description || '').toLowerCase();
        if (!name.includes(q) && !desc.includes(q)) return false;
      }
      // Attribute filters
      for (const [key, value] of Object.entries(filters)) {
        if (unit.Identity[key] !== value) return false;
      }
      return true;
    });
    return Object.fromEntries(entries);
  }, [originalUnits, nameSearch, filters]);

  // Sync filters to URL
  useEffect(() => {
    const params = {};
    if (nameSearch) params.q = nameSearch;
    Object.entries(filters).forEach(([k, v]) => { params[k] = v; });
    setSearchParams(params, { replace: true });
  }, [nameSearch, filters]);

  function setFilter(key, value) {
    setFilters(prev => {
      const next = { ...prev };
      if (value) {
        next[key] = value;
      } else {
        delete next[key];
      }
      return next;
    });
  }

  function clearAll() {
    setNameSearch('');
    setFilters({});
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    setNotification('Link copied to clipboard');
    setTimeout(() => setNotification(null), 3000);
  }

  function shareSearch() {
    copyToClipboard(window.location.href);
  }

  const hasFilters = nameSearch || Object.keys(filters).length > 0;

  if (!filteredUnits) return <div className="Loading">Loading units...</div>;

  return (
    <div className="Viewer">
      {notification ? <Notification text={notification} /> : null}

      {/* Search & Filter Bar */}
      <div className="FilterBar">
        <div className="FilterBarInner">
          <input
            className="SearchInput"
            type="text"
            placeholder="Search by name..."
            value={nameSearch}
            onChange={e => setNameSearch(e.target.value)}
          />

          <div className="FilterDropdowns">
            {Object.entries(filterOptions).map(([key, values]) => (
              <select
                key={key}
                className="FilterSelect"
                value={filters[key] || ''}
                onChange={e => setFilter(key, e.target.value)}
              >
                <option value="">{key}</option>
                {values.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            ))}
          </div>

          <div className="FilterActions">
            {hasFilters && (
              <button className="Btn BtnSecondary" onClick={clearAll}>Clear</button>
            )}
            <button className="Btn BtnSecondary" onClick={shareSearch}>Share</button>
          </div>
        </div>

        {/* Active filter chips */}
        {hasFilters && (
          <div className="ActiveFilters">
            {nameSearch && (
              <span className="Chip" onClick={() => setNameSearch('')}>
                &quot;{nameSearch}&quot; &times;
              </span>
            )}
            {Object.entries(filters).map(([key, value]) => (
              <span key={key} className="Chip" onClick={() => setFilter(key, '')}>
                {key}: {value} &times;
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="ResultsCount">
        {Object.keys(filteredUnits).length} unit{Object.keys(filteredUnits).length !== 1 ? 's' : ''}
      </div>

      {/* Card grid */}
      <div className="CardGrid">
        {Object.keys(filteredUnits).map(cardName => (
          <Link
            key={cardName}
            className="CardGridItem"
            to={`/card/${cardName}`}
            target="_blank"
          >
            <Card data={cardName} />
            <div className="CardCaption">
              {filteredUnits[cardName].Identity.Basic_Description}
            </div>
          </Link>
        ))}
      </div>

      {Object.keys(filteredUnits).length === 0 && (
        <div className="EmptyState">
          No units match your filters.
          <button className="Btn BtnSecondary" onClick={clearAll} style={{ marginLeft: 12 }}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

export default Viewer;
