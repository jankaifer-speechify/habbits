// Data models and types

export const FREQUENCY = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
};

export const TYPE = {
  HABIT: 'habit',
  TASK: 'task',
};

/**
 * @typedef {Object} Habit
 * @property {string} id - Unique identifier
 * @property {string} name - Habit name (Czech)
 * @property {string} type - Type: 'habit' or 'task'
 * @property {string} frequency - Frequency: 'daily' or 'weekly'
 * @property {string[]} completedDates - Array of date strings (YYYY-MM-DD) when completed
 */

/**
 * Creates a new habit or task
 * @param {string} name - Name of the habit/task
 * @param {string} type - Type: 'habit' or 'task'
 * @param {string} frequency - Frequency: 'daily' or 'weekly'
 * @returns {Habit}
 */
export function createItem(name, type, frequency) {
  return {
    id: crypto.randomUUID(),
    name,
    type,
    frequency,
    completedDates: [],
  };
}

/**
 * Checks if an item should be active on a given date
 * @param {Habit} item - The habit or task
 * @param {Date} date - The date to check
 * @returns {boolean}
 */
export function isItemActiveOnDate(item, date) {
  if (item.frequency === FREQUENCY.DAILY) {
    return true; // Daily items are active every day
  }
  
  if (item.frequency === FREQUENCY.WEEKLY) {
    // For weekly items, check if this date matches the creation day of week
    // For simplicity, we'll make weekly items active on any day
    // In a more advanced version, we could track specific days of week
    return true;
  }
  
  return false;
}

/**
 * Checks if an item is completed on a specific date
 * @param {Habit} item - The habit or task
 * @param {Date} date - The date to check
 * @returns {boolean}
 */
export function isItemCompletedOnDate(item, date) {
  const dateString = formatDate(date);
  return item.completedDates.includes(dateString);
}

/**
 * Formats a date as YYYY-MM-DD
 * @param {Date} date - The date to format
 * @returns {string}
 */
export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parses a date string (YYYY-MM-DD) into a Date object
 * @param {string} dateString - The date string
 * @returns {Date}
 */
export function parseDate(dateString) {
  return new Date(dateString + 'T00:00:00');
}

