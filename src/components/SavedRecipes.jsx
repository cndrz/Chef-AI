import React from 'react';
import { Clock, Users, Flame, Trash2, ChevronRight, ChefHat } from 'lucide-react';

export default function SavedRecipes({ recipes, onView, onDelete }) {
  if (recipes.length === 0) {
    return (
      <div className="empty-state fade-in">
        <ChefHat size={64} className="empty-icon" />
        <h2>No saved recipes yet</h2>
        <p>Your culinary masterpieces will appear here once you save them.</p>
      </div>
    );
  }

  return (
    <div className="saved-recipes-grid fade-in">
      {recipes.map((recipe, idx) => (
        <div key={idx} className="recipe-summary-card glass-card">
          <div className="card-header">
            <h3 className="recipe-name">{recipe.name}</h3>
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(idx); }}
              className="delete-btn"
              title="Remove Recipe"
            >
              <Trash2 size={18} />
            </button>
          </div>
          
          <p className="recipe-desc">{recipe.description}</p>
          
          <div className="ingredients-summary">
            <span className="summary-label">Ingredients:</span>
            <p className="summary-list">
              {recipe.ingredients.map(ing => ing.name).join(', ')}
            </p>
          </div>
          
          <div className="recipe-meta-summary">
            <div className="meta-item">
              <Clock size={14} />
              <span>{recipe.prepTime}</span>
            </div>
            <div className="meta-item">
              <Flame size={14} />
              <span>{recipe.cookTime}</span>
            </div>
            <span className={`difficulty-summary badge difficulty-${recipe.difficulty.toLowerCase()}`}>
              {recipe.difficulty}
            </span>
          </div>

          <button onClick={() => onView(recipe)} className="view-recipe-btn">
            View Details
            <ChevronRight size={18} />
          </button>
        </div>
      ))}

      <style jsx="true">{`
        .saved-recipes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        .empty-state {
          text-align: center;
          padding: 5rem 2rem;
          color: var(--text-secondary);
        }
        .empty-icon {
          margin-bottom: 1.5rem;
          opacity: 0.3;
        }
        .empty-state h2 {
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .recipe-summary-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: transform 0.2s;
        }
        .recipe-summary-card:hover {
          transform: translateY(-5px);
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
        }
        .recipe-name {
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.2;
        }
        .delete-btn {
          background: transparent;
          color: var(--text-secondary);
          padding: 4px;
        }
        .delete-btn:hover {
          color: var(--error);
        }
        .recipe-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 2.8rem;
          margin-bottom: 0.5rem;
        }
        .ingredients-summary {
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }
        .summary-label {
          font-weight: 700;
          color: var(--text-primary);
          display: block;
          margin-bottom: 0.25rem;
        }
        .summary-list {
          color: var(--text-secondary);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .recipe-meta-summary {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .difficulty-summary {
          font-size: 0.75rem;
          margin-left: auto;
        }
        .difficulty-easy { color: var(--difficulty-easy); border: 1px solid var(--difficulty-easy); }
        .difficulty-medium { color: var(--difficulty-medium); border: 1px solid var(--difficulty-medium); }
        .difficulty-hard { color: var(--difficulty-hard); border: 1px solid var(--difficulty-hard); }

        .view-recipe-btn {
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .view-recipe-btn:hover {
          background: var(--accent-soft);
          color: var(--accent);
        }
      `}</style>
    </div>
  );
}
