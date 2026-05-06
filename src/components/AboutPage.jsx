import React from 'react';
import { ChefHat, Brain, Zap, Shield } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      title: 'AI-First Design',
      description: 'Powered by the latest Llama 3 models on Groq for lightning-fast recipe generation and vision analysis.',
      icon: Brain
    },
    {
      title: 'Privacy Focused',
      description: 'Everything is stored locally on your device using localStorage. We do not track your culinary habits.',
      icon: Shield
    },
    {
      title: 'Optimized Speed',
      description: 'Built with Vite and React for a snappy, responsive experience on any device.',
      icon: Zap
    }
  ];

  return (
    <div className="about-page fade-in container">
      <div className="about-hero">
        <ChefHat size={80} className="about-logo" />
        <h1 className="view-title heading-gradient">About Chef AI</h1>
        <p className="about-subtitle">Your personal AI culinary assistant that understands your pantry, your cravings, and your time.</p>
      </div>

      <div className="about-content">
        <section className="about-section glass-card">
          <h2>The Mission</h2>
          <p>
            Chef AI was created to solve the age-old question: "What should I eat?" 
            By combining advanced AI vision and natural language processing, we turn 
            the ingredients you already have into delicious, high-quality recipes. 
            No more food waste, no more decision fatigue.
          </p>
        </section>

        <div className="features-row">
          {features.map((f, i) => (
            <div key={i} className="feature-card glass-card">
              <div className="feature-icon">
                <f.icon size={24} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx="true">{`
        .about-page {
          max-width: 900px;
          margin-bottom: 5rem;
          text-align: center;
        }
        .about-hero {
          margin: 4rem 0;
        }
        .about-logo {
          color: var(--accent);
          margin-bottom: 1.5rem;
        }
        .about-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 1rem auto 0;
        }
        .about-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .about-section {
          padding: 3rem;
          text-align: left;
        }
        .about-section h2 {
          margin-bottom: 1.5rem;
          font-size: 1.75rem;
        }
        .about-section p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--text-secondary);
        }
        .features-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        .feature-card {
          padding: 2rem;
          text-align: left;
        }
        .feature-icon {
          color: var(--accent);
          margin-bottom: 1rem;
        }
        .feature-card h3 {
          margin-bottom: 0.75rem;
        }
        .feature-card p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
