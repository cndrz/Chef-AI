import React from 'react';
import { Check } from 'lucide-react';

const DIETARY_OPTIONS = [
  'Vegan', 'Vegetarian', 'Keto', 'Gluten-Free', 'Halal', 'Dairy-Free'
];

export default function DietaryFilters({ activeFilters, setActiveFilters }) {
  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  return (
    <div className="dietary-filters-container">
      <label className="input-label">Dietary Preferences</label>
      <div className="filters-grid">
        {DIETARY_OPTIONS.map((filter) => {
          const isActive = activeFilters.includes(filter);
          return (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              type="button"
              className={`filter-chip ${isActive ? 'active' : ''}`}
            >
              {isActive && <Check size={14} />}
              {filter}
            </button>
          );
        })}
      </div>

      <style jsx="true">{`
        .dietary-filters-container {
          margin-bottom: 2rem;
        }
        .input-label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }
        .filters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 0.75rem;
        }
        .filter-chip {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.6rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid var(--border);
          background: var(--bg-secondary);
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.9rem;
        }
        .filter-chip:hover {
          border-color: var(--accent);
          color: var(--text-primary);
        }
        .filter-chip.active {
          background: var(--accent);
          color: white;
          border-color: var(--accent);
        }
      `}</style>
    </div>
  );
}
