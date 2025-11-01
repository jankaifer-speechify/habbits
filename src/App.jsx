import { useState, useEffect } from 'react';
import Calendar from './components/Calendar.jsx';
import HabitList from './components/HabitList.jsx';
import TaskList from './components/TaskList.jsx';
import { loadData } from './utils/storage.js';

function App() {
  const [habits, setHabits] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const loadAllData = () => {
    const data = loadData();
    setHabits(data.habits);
    setTasks(data.tasks);
  };
  
  useEffect(() => {
    loadAllData();
  }, []);
  
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-6xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-800">
          Sledování návyků
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Calendar
              habits={habits}
              tasks={tasks}
              onDateClick={handleDateClick}
              selectedDate={selectedDate}
            />
          </div>
          
          {/* Habits and Tasks */}
          <div className="space-y-6">
            <HabitList
              habits={habits}
              selectedDate={selectedDate}
              onUpdate={loadAllData}
            />
            
            <TaskList
              tasks={tasks}
              selectedDate={selectedDate}
              onUpdate={loadAllData}
            />
          </div>
        </div>
        
        {selectedDate && (
          <div className="mt-6 text-center">
            <div className="inline-block px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                Vybráno
              </div>
              <div className="text-sm font-medium text-gray-800">
                {selectedDate.toLocaleDateString('cs-CZ', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
