import { useState } from 'react';
import { formatDate, isItemActiveOnDate, isItemCompletedOnDate } from '../utils/models.js';

const DAYS_OF_WEEK = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
const MONTHS = [
  'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
  'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
];

/**
 * Gets the first day of the month (0 = Sunday, 1 = Monday, etc.)
 * Adjusts for Czech week (Monday = 0)
 */
function getFirstDayOfMonth(date) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  // Convert Sunday (0) to 6, Monday (1) to 0, etc.
  const day = firstDay.getDay();
  return day === 0 ? 6 : day - 1;
}

/**
 * Gets the number of days in a month
 */
function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * Calculates the completion status for a day
 * @param {Date} date - The date to check
 * @param {Habit[]} habits - Array of habits
 * @param {Habit[]} tasks - Array of tasks
 * @returns {'completed' | 'incomplete' | 'none'}
 */
function getDayStatus(date, habits, tasks) {
  const allItems = [...habits, ...tasks];
  const activeItems = allItems.filter(item => isItemActiveOnDate(item, date));
  
  if (activeItems.length === 0) {
    return 'none';
  }
  
  const completedItems = activeItems.filter(item => 
    isItemCompletedOnDate(item, date)
  );
  
  if (completedItems.length === activeItems.length) {
    return 'completed'; // All items completed - green
  }
  
  return 'incomplete'; // Some items incomplete - red
}

export default function Calendar({ habits, tasks, onDateClick }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const firstDay = getFirstDayOfMonth(currentDate);
  const daysInMonth = getDaysInMonth(currentDate);
  const days = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  
  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    days.push(date);
  }
  
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const goToToday = () => {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };
  
  const handleDateClick = (date) => {
    if (date && onDateClick) {
      onDateClick(date);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Předchozí měsíc"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold">
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={goToToday}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Dnes
          </button>
        </div>
        
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Další měsíc"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }
          
          const isToday = formatDate(date) === formatDate(today);
          const status = getDayStatus(date, habits, tasks);
          
          let bgColor = 'bg-gray-50';
          let textColor = 'text-gray-700';
          
          if (status === 'completed') {
            bgColor = 'bg-green-500';
            textColor = 'text-white';
          } else if (status === 'incomplete') {
            bgColor = 'bg-red-500';
            textColor = 'text-white';
          }
          
          return (
            <button
              key={formatDate(date)}
              onClick={() => handleDateClick(date)}
              className={`
                aspect-square rounded-lg transition-all
                ${bgColor} ${textColor}
                hover:opacity-80 hover:scale-105
                ${isToday ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                flex items-center justify-center
                text-sm font-medium
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Splněno</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Nesplněno</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-50 border border-gray-300 rounded"></div>
          <span>Bez úkolů</span>
        </div>
      </div>
    </div>
  );
}

