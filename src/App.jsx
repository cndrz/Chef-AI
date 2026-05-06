import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import IngredientInput from './components/IngredientInput';
import DietaryFilters from './components/DietaryFilters';
import RecipeCard from './components/RecipeCard';
import CookingMode from './components/CookingMode';
import SavedRecipes from './components/SavedRecipes';
import ShoppingList from './components/ShoppingList';
import HelpPage from './components/HelpPage';
import AboutPage from './components/AboutPage';
import RecipeOptions from './components/RecipeOptions';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateRecipe } from './api/groq';
import { Loader2, AlertCircle, ChefHat, Wand2 } from 'lucide-react';

function App() {
  // State
  const [view, setView] = useState('home');
  const [ingredients, setIngredients] = useState([]);
  const [craving, setCraving] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [recipeOptions, setRecipeOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // LocalStorage State
  const [savedRecipes, setSavedRecipes] = useLocalStorage('chef-ai-saved', []);
  const [shoppingList, setShoppingList] = useLocalStorage('chef-ai-shopping', []);
  const [theme, setTheme] = useLocalStorage('chef-ai-theme', 'dark');
  const [neverShowMicGuide, setNeverShowMicGuide] = useLocalStorage('chef-ai-never-mic-guide', false);
  const [showMicGuide, setShowMicGuide] = useState(false);

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Actions
  const handleGenerate = async () => {
    if (ingredients.length === 0 && !craving) return;
    
    setIsLoading(true);
    setError(null);
    setView('loading');
    
    try {
      const options = await generateRecipe(ingredients, craving, activeFilters);
      setRecipeOptions(options);
      setView('options');
    } catch (err) {
      setError(err.message);
      setView('error');
    } finally {
      setIsLoading(false);
    }
  };

  const addToShoppingList = (recipe) => {
    if (recipe && recipe.shoppingList && recipe.shoppingList.length > 0) {
      const newGroup = {
        recipeName: recipe.name,
        items: recipe.shoppingList.map(name => ({ name, checked: false }))
      };
      setShoppingList([newGroup, ...shoppingList]);
    }
  };

  const saveRecipe = () => {
    if (currentRecipe && !savedRecipes.find(r => r.name === currentRecipe.name)) {
      setSavedRecipes([currentRecipe, ...savedRecipes]);
    }
  };

  const deleteSavedRecipe = (index) => {
    const newList = [...savedRecipes];
    newList.splice(index, 1);
    setSavedRecipes(newList);
  };

  // View Components
  const renderHome = () => (
    <div className="home-view fade-in container">
      <div className="hero-section">
        <h1 className="hero-title">What's on the <span className="heading-gradient">Menu?</span></h1>
        <p className="hero-subtitle">Tell Chef AI what you have or what you're craving, and we'll handle the rest.</p>
      </div>

      <div className="generator-card glass-card">
        <IngredientInput 
          ingredients={ingredients} 
          setIngredients={setIngredients} 
          showGuide={showMicGuide}
          onHideGuide={() => setShowMicGuide(false)}
          neverShowGuide={neverShowMicGuide}
          onNeverShowGuide={() => setNeverShowMicGuide(true)}
          onMicPress={() => {
            if (!neverShowMicGuide) setShowMicGuide(true);
          }}
        />
        
        <div className="craving-input-container">
          <label className="input-label">What are you craving? (Optional)</label>
          <textarea
            value={craving}
            onChange={(e) => setCraving(e.target.value)}
            placeholder="Something warm and spicy for a rainy night..."
            className="craving-textarea"
          />
        </div>

        <DietaryFilters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

        <button 
          onClick={handleGenerate} 
          disabled={ingredients.length === 0 && !craving}
          className="btn-primary generate-btn"
        >
          <Wand2 size={20} />
          Generate Recipe
        </button>
      </div>

      <style jsx="true">{`
        .home-view {
          padding-bottom: 5rem;
        }
        .hero-section {
          text-align: center;
          margin: 4rem 0 3rem;
        }
        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }
        .generator-card {
          max-width: 800px;
          margin: 0 auto;
          padding: 3rem;
        }
        .craving-input-container {
          margin-bottom: 2rem;
        }
        .craving-textarea {
          width: 100%;
          padding: 1rem;
          border-radius: 0.75rem;
          border: 2px solid var(--border);
          background: var(--bg-secondary);
          color: var(--text-primary);
          min-height: 100px;
          resize: vertical;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .craving-textarea:focus {
          border-color: var(--accent);
        }
        .generate-btn {
          width: 100%;
          padding: 1.25rem;
          font-size: 1.2rem;
        }
        @media (max-width: 600px) {
          .hero-title { font-size: 2.5rem; }
          .generator-card { padding: 1.5rem; }
        }
      `}</style>
    </div>
  );

  const renderLoading = () => (
    <div className="status-view fade-in">
      <div className="loader-content">
        <div className="spinner-wrapper">
          <Loader2 className="spinner" size={60} />
          <ChefHat className="inner-icon" size={24} />
        </div>
        <h2>Chef AI is cooking...</h2>
        <p>Combining your ingredients and crafting a perfect recipe.</p>
      </div>
      <style jsx="true">{`
        .status-view {
          height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .spinner-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
        }
        .spinner {
          color: var(--accent);
          animation: spin 2s linear infinite;
        }
        .inner-icon {
          position: absolute;
          color: var(--accent);
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        h2 { margin-bottom: 0.5rem; }
        p { color: var(--text-secondary); }
      `}</style>
    </div>
  );

  const renderError = () => (
    <div className="status-view fade-in">
      <div className="error-content container glass-card">
        <AlertCircle size={64} color="var(--error)" />
        <h2>Kitchen Disaster!</h2>
        <p>{error || "Something went wrong while generating your recipe."}</p>
        <button onClick={() => setView('home')} className="btn-primary retry-btn">
          Try Again
        </button>
      </div>
      <style jsx="true">{`
        .error-content {
          padding: 4rem 2rem;
          max-width: 500px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        .retry-btn { margin-top: 1rem; width: 200px; }
      `}</style>
    </div>
  );

  return (
    <div className="app">
      <Header 
        currentView={view} 
        setView={setView} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />

      <main className="content">
        {view === 'home' && renderHome()}
        {view === 'loading' && renderLoading()}
        {view === 'error' && renderError()}
        
        {view === 'options' && (
          <RecipeOptions 
            options={recipeOptions} 
            onSelect={(recipe) => {
              setCurrentRecipe(recipe);
              setView('recipe');
            }}
            onRetry={handleGenerate}
          />
        )}

        {view === 'recipe' && (
          <div className="container">
            <RecipeCard 
              recipe={currentRecipe} 
              onStartCooking={() => setView('cooking')}
              onSave={saveRecipe}
              onAddToShoppingList={() => addToShoppingList(currentRecipe)}
              isSaved={savedRecipes.some(r => r.name === currentRecipe?.name)}
              onGenerateAnother={() => setView('home')}
            />
          </div>
        )}

        {view === 'cooking' && (
          <CookingMode 
            steps={currentRecipe.steps} 
            onExit={() => setView('recipe')} 
            recipeName={currentRecipe.name}
          />
        )}

        {view === 'saved' && (
          <div className="container">
            <h1 className="view-title">Saved Recipes</h1>
            <SavedRecipes 
              recipes={savedRecipes} 
              onView={(recipe) => {
                setCurrentRecipe(recipe);
                setView('recipe');
              }}
              onDelete={deleteSavedRecipe}
            />
          </div>
        )}

        {view === 'shopping' && (
          <div className="container">
            <ShoppingList 
              groups={shoppingList} 
              setGroups={setShoppingList} 
            />
          </div>
        )}

        {view === 'help' && <HelpPage />}
        {view === 'about' && <AboutPage />}

      </main>

      <style jsx="true">{`
        .app {
          min-height: 100vh;
        }
        .content {
          padding: 2rem 0 5rem;
        }
        .view-title {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          font-weight: 800;
        }
      `}</style>
    </div>
  );
}

export default App;
