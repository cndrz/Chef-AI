import React from 'react';
import { HelpCircle, Mic, Camera, Wand2, ChefHat, Save, ShoppingBag } from 'lucide-react';

export default function HelpPage() {
  const steps = [
    {
      title: '1. Input Ingredients',
      description: 'Add ingredients manually, use the Quick Add panel, or dictate them using the microphone. You can even speak in full sentences!',
      icon: Mic
    },
    {
      title: '2. Scan Your Pantry',
      description: 'Click the camera icon to upload a photo of your fridge, pantry, or a grocery receipt. Our AI will extract the items for you.',
      icon: Camera
    },
    {
      title: '3. Set Preferences',
      description: 'Tell us what you are craving and select any dietary requirements like Vegan, Keto, or Gluten-Free.',
      icon: Wand2
    },
    {
      title: '4. Generate & Cook',
      description: 'Hit "Generate Recipe" to get a custom dish. Use Cooking Mode for a distraction-free, comprehensive step-by-step guide.',
      icon: ChefHat
    },
    {
      title: '5. Save & Manage',
      description: 'Save your favorite recipes to "My Recipes" and check your "Shopping List" for items you are missing.',
      icon: Save
    }
  ];

  return (
    <div className="help-page fade-in container">
      <h1 className="view-title heading-gradient">How to Use Chef AI</h1>
      <p className="help-intro">Master your kitchen with our AI-powered features. Here is a quick guide to get you started.</p>

      <div className="help-grid">
        {steps.map((step, idx) => (
          <div key={idx} className="help-card glass-card">
            <div className="help-icon-wrapper">
              <step.icon size={24} />
            </div>
            <div className="help-text">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pro-tips glass-card">
        <h3>💡 Pro Tips</h3>
        <ul>
          <li><strong>Voice Input:</strong> You don't need to be formal. Just say "I have some eggs and bacon" and we'll handle the rest.</li>
          <li><strong>Recipes are flexible:</strong> If you're missing an ingredient, Chef AI will add it to your shopping list automatically.</li>
          <li><strong>Scanning:</strong> For receipts, ensure the items are clearly visible and well-lit for the best extraction results.</li>
        </ul>
      </div>

      <style jsx="true">{`
        .help-page {
          max-width: 900px;
          margin-bottom: 5rem;
        }
        .help-intro {
          font-size: 1.2rem;
          color: var(--text-secondary);
          margin-bottom: 3rem;
        }
        .help-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        .help-card {
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem;
          align-items: center;
        }
        .help-icon-wrapper {
          background: var(--accent-soft);
          color: var(--accent);
          width: 56px;
          height: 56px;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .help-text h3 {
          margin-bottom: 0.25rem;
          font-size: 1.1rem;
        }
        .help-text p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.5;
        }
        .pro-tips {
          padding: 2rem;
          border: 1px solid var(--accent-soft);
        }
        .pro-tips h3 {
          margin-bottom: 1.5rem;
          color: var(--accent);
        }
        .pro-tips ul {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .pro-tips li {
          font-size: 1rem;
          color: var(--text-primary);
          padding-left: 1.5rem;
          position: relative;
        }
        .pro-tips li::before {
          content: '•';
          color: var(--accent);
          position: absolute;
          left: 0;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
