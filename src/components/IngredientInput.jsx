import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Mic, MicOff, Camera, Loader2, Trash2 } from 'lucide-react';
import { scanIngredientsFromImage, extractIngredientsFromText } from '../api/groq';

export default function IngredientInput({ 
  ingredients, 
  setIngredients, 
  showGuide, 
  onHideGuide, 
  neverShowGuide, 
  onNeverShowGuide,
  onMicPress 
}) {
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef(null);

  const handleAdd = () => {
    const trimmed = inputValue.trim().toLowerCase();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAdd();
    }
  };

  const removeIngredient = (tag) => {
    setIngredients(ingredients.filter(i => i !== tag));
  };

  const quickAdd = (item) => {
    if (!ingredients.includes(item.toLowerCase())) {
      setIngredients([...ingredients, item.toLowerCase()]);
    }
  };

  const commonIngredients = [
    'Chicken', 'Beef', 'Eggs', 'Milk', 'Onion', 'Garlic', 
    'Tomato', 'Rice', 'Pasta', 'Cheese', 'Potatoes', 'Spinach'
  ];

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('speechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false); // Stop UI listening state immediately
      setIsScanning(true); // Reuse scanning state for AI processing
      
      try {
        const extracted = await extractIngredientsFromText(transcript);
        const filtered = extracted
          .map(i => i.toLowerCase())
          .filter(i => i && !ingredients.includes(i));
          
        if (filtered.length > 0) {
          setIngredients([...ingredients, ...filtered]);
        }
      } catch (err) {
        console.error('Voice extraction error:', err);
      } finally {
        setIsScanning(false);
      }
    };

    recognition.start();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsScanning(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.split(',')[1];
        const newIngredients = await scanIngredientsFromImage(base64String);
        
        const filtered = newIngredients
          .map(i => i.toLowerCase())
          .filter(i => i && !ingredients.includes(i));
          
        if (filtered.length > 0) {
          setIngredients([...ingredients, ...filtered]);
        }
        setIsScanning(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error scanning image:', error);
      alert('Failed to scan image. Please try again.');
      setIsScanning(false);
    }
  };

  return (
    <div className="ingredient-input-container">
      <label className="input-label">Ingredients you have</label>
      <div className="input-wrapper">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type ingredient and press Enter..."
          className="tag-input"
        />
        
        <div className="mic-container">
          {showGuide && (
            <div className="mic-guide-popup glass-card fade-in">
              <p>🎤 <strong>Tip:</strong> You can speak in full sentences! We'll extract the ingredients for you.</p>
              <div className="guide-footer">
                <label className="never-show">
                  <input 
                    type="checkbox" 
                    onChange={onNeverShowGuide} 
                    checked={neverShowGuide}
                  />
                  Don't show again
                </label>
                <button onClick={onHideGuide} className="guide-close-btn">Got it</button>
              </div>
            </div>
          )}
          <button 
            onClick={() => {
              onMicPress();
              startListening();
            }} 
            className={`mic-btn ${isListening ? 'listening' : ''}`}
            type="button"
            title="Voice Input"
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
        </div>

        <button 
          onClick={() => fileInputRef.current.click()} 
          className={`scan-btn ${isScanning ? 'scanning' : ''}`}
          type="button"
          title="Scan Receipt or Pantry"
          disabled={isScanning}
        >
          {isScanning ? <Loader2 size={20} className="spinner" /> : <Camera size={20} />}
        </button>

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          style={{ display: 'none' }} 
        />

        <button onClick={handleAdd} className="add-btn" type="button">
          <Plus size={20} />
        </button>
      </div>

      <div className="quick-add-section">
        <span className="quick-add-label">Quick Add:</span>
        <div className="quick-add-grid">
          {commonIngredients.map(item => (
            <button
              key={item}
              type="button"
              className={`quick-tag ${ingredients.includes(item.toLowerCase()) ? 'selected' : ''}`}
              onClick={() => quickAdd(item)}
              disabled={ingredients.includes(item.toLowerCase())}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="tags-container">
        {ingredients.length > 0 && (
          <button 
            onClick={() => setIngredients([])} 
            className="clear-ingredients-btn"
            type="button"
          >
            <Trash2 size={14} />
            Clear All
          </button>
        )}
        {ingredients.map((tag) => (
          <span key={tag} className="tag fade-in">
            {tag}
            <button onClick={() => removeIngredient(tag)} className="remove-tag">
              <X size={14} />
            </button>
          </span>
        ))}
      </div>

      <style jsx="true">{`
        .ingredient-input-container {
          margin-bottom: 2rem;
        }
        .input-label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        .input-wrapper {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .tag-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 2px solid var(--border);
          background: var(--bg-secondary);
          color: var(--text-primary);
          outline: none;
          transition: border-color 0.2s;
        }
        .tag-input:focus {
          border-color: var(--accent);
        }
        .add-btn {
          background: var(--accent);
          color: white;
          width: 45px;
          height: 45px;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mic-container {
          position: relative;
        }
        .mic-guide-popup {
          position: absolute;
          bottom: calc(100% + 1rem);
          right: 0;
          width: 250px;
          padding: 1rem;
          z-index: 10;
          font-size: 0.9rem;
          border: 1px solid var(--accent-soft);
          text-align: left;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .mic-guide-popup p {
          margin-bottom: 1rem;
          color: var(--text-primary);
          line-height: 1.4;
        }
        .guide-footer {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .never-show {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
          cursor: pointer;
        }
        .never-show input {
          cursor: pointer;
        }
        .guide-close-btn {
          background: var(--accent);
          color: white;
          padding: 0.45rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 0.85rem;
          width: 100%;
        }
        .mic-btn, .scan-btn {
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          width: 45px;
          height: 45px;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .mic-btn.listening {
          background: var(--error);
          color: white;
          animation: pulse-red 1.5s infinite;
        }
        .scan-btn.scanning {
          background: var(--accent-soft);
          color: var(--accent);
        }
        .spinner {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-red {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          min-height: 2.5rem;
          align-items: center;
        }
        .clear-ingredients-btn {
          background: #fee2e2;
          color: #ef4444;
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          margin-right: 0.5rem;
        }
        .clear-ingredients-btn:hover {
          background: #fecaca;
        }
        .tag {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: var(--accent-soft);
          color: var(--accent);
          padding: 0.4rem 0.8rem;
          border-radius: 9999px;
          font-weight: 500;
          font-size: 0.9rem;
          border: 1px solid var(--accent);
        }
        .remove-tag {
          background: transparent;
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px;
          border-radius: 50%;
        }
        .remove-tag:hover {
          background: var(--accent);
          color: white;
        }
        .quick-add-section {
          margin-bottom: 1.5rem;
        }
        .quick-add-label {
          display: block;
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .quick-add-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .quick-tag {
          padding: 0.35rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.85rem;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          border: 1px solid transparent;
        }
        .quick-tag:hover {
          background: var(--border);
          color: var(--text-primary);
        }
        .quick-tag.selected {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
