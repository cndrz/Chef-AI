import React from 'react';
import { Clock, Flame, ChevronRight, Wand2 } from 'lucide-react';

export default function RecipeOptions({ options, onSelect, onRetry }) {
  return (
    <div className="recipe-options-view fade-in container">
      <div className="options-header">
        <h1 className="view-title heading-gradient">Choose Your Recipe</h1>
        <p className="options-subtitle">Chef AI has prepared 3 distinct options for you. Which one looks best?</p>
      </div>

      <div className="options-grid">
        {options.map((recipe, idx) => (
          <div key={idx} className="option-card glass-card fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="option-content">
              <h3 className="option-name">{recipe.name}</h3>
              <p className="option-desc">{recipe.description}</p>
              
              <div className="option-meta">
                <div className="meta-item">
                  <Clock size={16} />
                  <span>{recipe.prepTime}</span>
                </div>
                <div className="meta-item">
                  <Flame size={16} />
                  <span>{recipe.cookTime}</span>
                </div>
                <span className={`difficulty-badge badge difficulty-${recipe.difficulty.toLowerCase()}`}>
                  {recipe.difficulty}
                </span>
              </div>
            </div>

            <button onClick={() => onSelect(recipe)} className="btn-primary select-btn">
              View Recipe
              <ChevronRight size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="retry-section">
        <p>None of these catch your eye?</p>
        <button onClick={onRetry} className="btn-outline">
          <Wand2 size={18} />
          Generate New Options
        </button>
      </div>

      <style jsx="true">{`
        .recipe-options-view {
          padding-bottom: 5rem;
        }
        .options-header {
          text-align: center;
          margin: 3rem 0;
        }
        .options-subtitle {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .option-card {
          display: flex;
          flex-direction: column;
          padding: 2rem;
          transition: transform 0.3s ease;
        }
        .option-card:hover {
          transform: translateY(-8px);
        }

        .option-content {
          flex: 1;
          margin-bottom: 2rem;
        }
        .option-name {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          line-height: 1.2;
        }
        .option-desc {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .option-meta {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .difficulty-badge {
          margin-left: auto;
          font-size: 0.75rem;
        }
        .difficulty-easy { color: var(--difficulty-easy); border: 1px solid var(--difficulty-easy); }
        .difficulty-medium { color: var(--difficulty-medium); border: 1px solid var(--difficulty-medium); }
        .difficulty-hard { color: var(--difficulty-hard); border: 1px solid var(--difficulty-hard); }

        .select-btn {
          width: 100%;
          justify-content: center;
        }

        .retry-section {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .retry-section p {
          color: var(--text-secondary);
        }
        .btn-outline {
          border: 2px solid var(--border);
          padding: 0.75rem 2rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: var(--text-primary);
          background: transparent;
        }
        .btn-outline:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
      `}</style>
    </div>
  );
}
