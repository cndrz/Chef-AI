import React from 'react';
import { Clock, Users, Flame, Check, X, ChefHat, Heart, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

export default function RecipeCard({ 
  recipe, 
  onStartCooking, 
  onSave, 
  onAddToShoppingList,
  isSaved, 
  onDelete, 
  onGenerateAnother 
}) {
  if (!recipe) return null;

  return (
    <div className="recipe-card fade-in">
      <div className="recipe-header glass-card">
        <div className="header-top">
          <h1 className="recipe-title heading-gradient">{recipe.name}</h1>
          <span className={`difficulty-badge badge difficulty-${recipe.difficulty.toLowerCase()}`}>
            {recipe.difficulty}
          </span>
        </div>
        <p className="recipe-desc">{recipe.description}</p>
        
        <div className="recipe-meta">
          <div className="meta-item">
            <Clock size={18} />
            <span>Prep: {recipe.prepTime}</span>
          </div>
          <div className="meta-item">
            <Flame size={18} />
            <span>Cook: {recipe.cookTime}</span>
          </div>
          <div className="meta-item">
            <Users size={18} />
            <span>Servings: {recipe.servings}</span>
          </div>
        </div>
      </div>

      <div className="recipe-content">
        <div className="ingredients-section glass-card">
          <h3>Ingredients</h3>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx} className="ingredient-item">
                {ing.haveIt ? (
                  <Check className="status-icon success" size={18} />
                ) : (
                  <X className="status-icon error" size={18} />
                )}
                <span className="ing-amount">{ing.amount}</span>
                <span className="ing-name">{ing.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="side-panel">
          <div className="nutrition-section glass-card">
            <h3>Nutrition Facts</h3>
            <div className="nutrition-grid">
              <div className="nut-item">
                <span className="nut-val">{recipe.nutrition.calories}</span>
                <span className="nut-label">Calories</span>
              </div>
              <div className="nut-item">
                <span className="nut-val">{recipe.nutrition.protein}</span>
                <span className="nut-label">Protein</span>
              </div>
              <div className="nut-item">
                <span className="nut-val">{recipe.nutrition.carbs}</span>
                <span className="nut-label">Carbs</span>
              </div>
              <div className="nut-item">
                <span className="nut-val">{recipe.nutrition.fat}</span>
                <span className="nut-label">Fat</span>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={onStartCooking} className="btn-primary start-btn">
              <ChefHat size={20} />
              Start Cooking
            </button>
            
            {onSave && !isSaved && (
              <button onClick={onSave} className="btn-secondary save-btn">
                <Heart size={20} />
                Save Recipe
              </button>
            )}

            {onAddToShoppingList && recipe.shoppingList && recipe.shoppingList.length > 0 && (
              <button onClick={onAddToShoppingList} className="btn-secondary shopping-btn">
                <ShoppingBag size={20} />
                Add Missing Items to List
              </button>
            )}

            {onDelete && (
              <button onClick={onDelete} className="btn-danger delete-btn">
                <Trash2 size={20} />
                Remove
              </button>
            )}

            {onGenerateAnother && (
              <button onClick={onGenerateAnother} className="btn-outline">
                New Recipe
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .recipe-card {
          max-width: 1000px;
          margin: 2rem auto;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .recipe-header {
          padding: 2.5rem;
        }
        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }
        .recipe-title {
          font-size: 2.5rem;
          margin: 0;
        }
        .difficulty-badge {
          background: var(--bg-tertiary);
        }
        .difficulty-easy { color: var(--difficulty-easy); border: 1px solid var(--difficulty-easy); }
        .difficulty-medium { color: var(--difficulty-medium); border: 1px solid var(--difficulty-medium); }
        .difficulty-hard { color: var(--difficulty-hard); border: 1px solid var(--difficulty-hard); }
        
        .recipe-desc {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          max-width: 80%;
        }
        .recipe-meta {
          display: flex;
          gap: 2rem;
          color: var(--text-secondary);
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .recipe-content {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 2rem;
        }
        
        .ingredients-section {
          padding: 2rem;
        }
        h3 {
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
        }
        .ingredients-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .ingredient-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          background: var(--bg-primary);
          border-radius: 0.75rem;
          border: 1px solid var(--border);
        }
        .status-icon.success { color: var(--success); }
        .status-icon.error { color: var(--error); }
        .ing-amount {
          font-weight: 700;
          color: var(--accent);
          min-width: 80px;
        }
        
        .side-panel {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .nutrition-section {
          padding: 1.5rem;
        }
        .nutrition-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .nut-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          background: var(--bg-primary);
          border-radius: 0.75rem;
        }
        .nut-val { font-weight: 700; font-size: 1.1rem; }
        .nut-label { font-size: 0.8rem; color: var(--text-secondary); }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .btn-secondary {
          background: var(--bg-tertiary);
          color: var(--text-primary);
          padding: 1rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 600;
        }
        .btn-secondary:hover {
          background: var(--border);
        }
        .btn-outline {
          border: 2px solid var(--border);
          background: transparent;
          color: var(--text-secondary);
          padding: 0.75rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 500;
        }
        .btn-outline:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        .btn-danger {
          background: #fee2e2;
          color: #ef4444;
          padding: 1rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .recipe-content {
            grid-template-columns: 1fr;
          }
          .recipe-desc {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
