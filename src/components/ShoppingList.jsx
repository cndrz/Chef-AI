import React from 'react';
import { ShoppingBag, Trash2, CheckSquare, Square, ChefHat } from 'lucide-react';

export default function ShoppingList({ groups, setGroups }) {
  const toggleItem = (groupIndex, itemIndex) => {
    const newGroups = [...groups];
    newGroups[groupIndex].items[itemIndex].checked = !newGroups[groupIndex].items[itemIndex].checked;
    setGroups(newGroups);
  };

  const removeGroup = (index) => {
    const newGroups = [...groups];
    newGroups.splice(index, 1);
    setGroups(newGroups);
  };

  const clearAll = () => {
    setGroups([]);
  };

  if (groups.length === 0) {
    return (
      <div className="empty-state fade-in">
        <ShoppingBag size={64} className="empty-icon" />
        <h2>Your shopping list is empty</h2>
        <p>Ingredients you don't have from generated recipes will appear here.</p>
      </div>
    );
  }

  return (
    <div className="shopping-list-container fade-in">
      <div className="list-header">
        <h1 className="view-title">Shopping List</h1>
        <button onClick={clearAll} className="clear-all-btn">
          <Trash2 size={18} />
          Clear All
        </button>
      </div>

      <div className="groups-container">
        {groups.map((group, gIdx) => (
          <div key={gIdx} className="recipe-group glass-card fade-in">
            <div className="group-header">
              <div className="group-title">
                <ChefHat size={18} className="recipe-icon" />
                <h3>{group.recipeName}</h3>
              </div>
              <button onClick={() => removeGroup(gIdx)} className="delete-group-btn" title="Remove recipe list">
                <Trash2 size={16} />
              </button>
            </div>

            <div className="group-items">
              {group.items.map((item, iIdx) => (
                <div 
                  key={iIdx} 
                  className={`shopping-item ${item.checked ? 'checked' : ''}`}
                  onClick={() => toggleItem(gIdx, iIdx)}
                >
                  <div className="checkbox">
                    {item.checked ? <CheckSquare size={20} className="check-icon" /> : <Square size={20} />}
                  </div>
                  <span className="item-text">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx="true">{`
        .shopping-list-container {
          max-width: 800px;
          margin: 0 auto;
        }
        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
        }
        .view-title { margin-bottom: 0; }
        
        .clear-all-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #fee2e2;
          color: #ef4444;
          padding: 0.75rem 1.25rem;
          border-radius: 0.75rem;
          font-weight: 600;
        }

        .groups-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .recipe-group {
          padding: 1.5rem;
          border: 1px solid var(--border);
        }

        .group-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
        }

        .group-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .recipe-icon { color: var(--accent); }
        .group-title h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .delete-group-btn {
          background: transparent;
          color: var(--text-secondary);
        }
        .delete-group-btn:hover {
          color: var(--error);
        }

        .group-items {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
        }

        .shopping-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: 0.75rem;
          background: var(--bg-tertiary);
          cursor: pointer;
          transition: all 0.2s;
        }
        .shopping-item:hover {
          background: var(--border);
        }
        .shopping-item.checked {
          opacity: 0.5;
        }
        .shopping-item.checked .item-text {
          text-decoration: line-through;
        }

        .checkbox {
          color: var(--text-secondary);
          display: flex;
          align-items: center;
        }
        .check-icon {
          color: var(--success);
        }
        .item-text {
          font-size: 1rem;
          font-weight: 500;
          word-break: break-word;
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
      `}</style>
    </div>
  );
}
