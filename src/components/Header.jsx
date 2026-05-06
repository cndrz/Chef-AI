import React from 'react';
import { ChefHat, BookOpen, ShoppingBag, Sun, Moon, HelpCircle, Info } from 'lucide-react';

export default function Header({ currentView, setView, theme, toggleTheme }) {
  const navItems = [
    { id: 'home', label: 'Generator', icon: ChefHat },
    { id: 'saved', label: 'My Recipes', icon: BookOpen },
    { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
    { id: 'help', label: 'Help', icon: HelpCircle },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <header className="header glass-card">
      <div className="container header-content">
        <div className="logo" onClick={() => setView('home')}>
          <ChefHat className="logo-icon" />
          <span className="logo-text heading-gradient">Chef AI</span>
        </div>

        <nav className="nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`nav-link ${currentView === item.id ? 'active' : ''}`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

      <style jsx="true">{`
        .header {
          position: sticky;
          top: 1rem;
          margin: 1rem auto;
          width: calc(100% - 2rem);
          max-width: 1200px;
          z-index: 100;
          padding: 0.75rem 1rem;
          border-radius: 1.25rem;
        }
        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }
        .logo-icon {
          color: var(--accent);
        }
        .logo-text {
          font-size: 1.5rem;
          letter-spacing: -0.025em;
        }
        .nav {
          display: flex;
          gap: 1rem;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 0.75rem;
          color: var(--text-secondary);
          background: transparent;
          font-weight: 500;
        }
        .nav-link:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
        .nav-link.active {
          color: var(--accent);
          background: var(--accent-soft);
        }
        .theme-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }
        .theme-toggle:hover {
          background: var(--border);
        }

        @media (max-width: 768px) {
          .nav-link span {
            display: none;
          }
          .logo-text {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
