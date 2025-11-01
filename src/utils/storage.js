// LocalStorage utilities for persisting habits and tasks

import { formatDate } from './models.js';

const STORAGE_KEY = 'habbits-data';

/**
 * Loads all habits and tasks from localStorage
 * @returns {{habits: Habit[], tasks: Habit[]}}
 */
export function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return {
        habits: data.habits || [],
        tasks: data.tasks || [],
      };
    }
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
  }
  return {
    habits: [],
    tasks: [],
  };
}

/**
 * Saves all habits and tasks to localStorage
 * @param {Habit[]} habits - Array of habits
 * @param {Habit[]} tasks - Array of tasks
 */
export function saveData(habits, tasks) {
  try {
    const data = {
      habits,
      tasks,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
}

/**
 * Adds a new habit or task
 * @param {Habit} item - The habit or task to add
 * @returns {Habit[]} Updated array of items
 */
export function addItem(item) {
  const { habits, tasks } = loadData();
  
  if (item.type === 'habit') {
    habits.push(item);
    saveData(habits, tasks);
    return habits;
  } else {
    tasks.push(item);
    saveData(habits, tasks);
    return tasks;
  }
}

/**
 * Updates an existing habit or task
 * @param {Habit} item - The updated habit or task
 */
export function updateItem(item) {
  const { habits, tasks } = loadData();
  
  if (item.type === 'habit') {
    const index = habits.findIndex(h => h.id === item.id);
    if (index !== -1) {
      habits[index] = item;
      saveData(habits, tasks);
    }
  } else {
    const index = tasks.findIndex(t => t.id === item.id);
    if (index !== -1) {
      tasks[index] = item;
      saveData(habits, tasks);
    }
  }
}

/**
 * Deletes a habit or task
 * @param {string} id - The ID of the item to delete
 * @param {string} type - Type: 'habit' or 'task'
 */
export function deleteItem(id, type) {
  const { habits, tasks } = loadData();
  
  if (type === 'habit') {
    const filtered = habits.filter(h => h.id !== id);
    saveData(filtered, tasks);
  } else {
    const filtered = tasks.filter(t => t.id !== id);
    saveData(habits, filtered);
  }
}

/**
 * Toggles completion status for a habit or task on a specific date
 * @param {Habit} item - The habit or task
 * @param {Date} date - The date to toggle
 */
export function toggleCompletion(item, date) {
  const dateString = formatDate(date);
  const isCompleted = item.completedDates.includes(dateString);
  
  if (isCompleted) {
    // Remove completion
    item.completedDates = item.completedDates.filter(d => d !== dateString);
  } else {
    // Add completion
    item.completedDates.push(dateString);
  }
  
  updateItem(item);
}

