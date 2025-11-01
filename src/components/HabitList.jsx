import { useState } from 'react';
import { createItem, FREQUENCY, TYPE } from '../utils/models.js';
import { addItem, deleteItem, toggleCompletion } from '../utils/storage.js';
import { formatDate } from '../utils/models.js';

export default function HabitList({ habits, selectedDate, onUpdate }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState(FREQUENCY.DAILY);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      const newHabit = createItem(name.trim(), TYPE.HABIT, frequency);
      addItem(newHabit);
      setName('');
      setFrequency(FREQUENCY.DAILY);
      setShowForm(false);
      onUpdate();
    }
  };
  
  const handleDelete = (id) => {
    if (confirm('Opravdu chcete smazat tento návyk?')) {
      deleteItem(id, TYPE.HABIT);
      onUpdate();
    }
  };
  
  const handleToggle = (habit) => {
    if (!selectedDate) return;
    toggleCompletion(habit, selectedDate);
    onUpdate();
  };
  
  if (!selectedDate) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4">Návyky</h3>
        <p className="text-gray-500 text-sm">Vyberte datum v kalendáři pro správu návyků</p>
      </div>
    );
  }
  
  const selectedDateString = formatDate(selectedDate);
  const isCompleted = (habit) => habit.completedDates.includes(selectedDateString);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Návyky</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
        >
          {showForm ? 'Zrušit' : '+ Přidat'}
        </button>
      </div>
      
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 pb-4 border-b">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Název návyku (např. Sport)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            autoFocus
            maxLength={50}
          />
          <div className="flex gap-2 mb-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value={FREQUENCY.DAILY}
                checked={frequency === FREQUENCY.DAILY}
                onChange={(e) => setFrequency(e.target.value)}
              />
              <span className="text-sm">Denně</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value={FREQUENCY.WEEKLY}
                checked={frequency === FREQUENCY.WEEKLY}
                onChange={(e) => setFrequency(e.target.value)}
              />
              <span className="text-sm">Týdně</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
          >
            Vytvořit
          </button>
        </form>
      )}
      
      <div className="space-y-2">
        {habits.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            Žádné návyky. Přidejte první návyk!
          </p>
        ) : (
          habits.map((habit) => (
            <div
              key={habit.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => handleToggle(habit)}
                  className={`
                    w-6 h-6 rounded border-2 flex items-center justify-center transition-colors
                    ${isCompleted(habit)
                      ? 'bg-green-500 border-green-500'
                      : 'bg-white border-gray-300'}
                  `}
                >
                  {isCompleted(habit) && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <div className="flex-1">
                  <div className="font-medium">{habit.name}</div>
                  <div className="text-xs text-gray-500">
                    {habit.frequency === FREQUENCY.DAILY ? 'Denně' : 'Týdně'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDelete(habit.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Smazat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

