import React from 'react';
import { ChevronLeft, X, CheckCircle2 } from 'lucide-react';

export default function CookingMode({ steps, onExit, recipeName }) {
  return (
    <div className="cooking-mode-overlay fade-in">
      <div className="cooking-container container">
        <header className="cooking-header">
          <button onClick={onExit} className="exit-btn" title="Back to Recipe">
            <ChevronLeft size={24} />
          </button>
          <h1 className="cooking-title heading-gradient">{recipeName}</h1>
          <button onClick={onExit} className="close-btn" title="Exit Cooking Mode">
            <X size={24} />
          </button>
        </header>

        <main className="cooking-main">
          <div className="steps-list-card glass-card">
            <h2 className="steps-heading">Cooking Instructions</h2>
            <div className="steps-grid">
              {steps.map((step, idx) => (
                <div key={idx} className="step-item">
                  <div className="step-number">{idx + 1}</div>
                  <p className="step-text">{step.instruction}</p>
                </div>
              ))}
            </div>
            
            <div className="finish-section">
              <button onClick={onExit} className="btn-primary finish-btn">
                <CheckCircle2 size={20} />
                Finished Cooking
              </button>
            </div>
          </div>
        </main>
      </div>

      <style jsx="true">{`
        .cooking-mode-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: var(--bg-primary);
          z-index: 1000;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }
        .cooking-container {
          padding: 2rem 1.5rem;
          max-width: 900px;
        }
        .cooking-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 3rem;
          gap: 1.5rem;
        }
        .cooking-title {
          font-size: 2rem;
          margin: 0;
          text-align: center;
        }
        .exit-btn, .close-btn {
          background: var(--bg-tertiary);
          color: var(--text-primary);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .steps-list-card {
          padding: 3rem;
          margin-bottom: 5rem;
        }
        .steps-heading {
          font-size: 1.75rem;
          margin-bottom: 2rem;
          color: var(--text-primary);
        }
        .steps-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .step-item {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
        }
        .step-item:last-child {
          border-bottom: none;
        }
        .step-number {
          background: var(--accent);
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          flex-shrink: 0;
        }
        .step-text {
          font-size: 1.2rem;
          line-height: 1.6;
          color: var(--text-primary);
          flex: 1;
        }

        .finish-section {
          margin-top: 4rem;
          display: flex;
          justify-content: center;
        }
        .finish-btn {
          padding: 1.25rem 3rem;
          font-size: 1.2rem;
        }

        @media (max-width: 600px) {
          .steps-list-card {
            padding: 1.5rem;
          }
          .step-text {
            font-size: 1rem;
          }
          .cooking-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
