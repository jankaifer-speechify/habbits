# Habit Tracker App - Specification

## Overview

A client-side habit tracking application built with React, Tailwind CSS, and Vite. The app helps users track their daily and weekly habits with a calendar view.

## Tech Stack

- **Framework**: React (via Vite)
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Data Storage**: localStorage (client-side only)
- **Deployment**: Vercel (project name: `habbits`)

## Core Features

### 1. Calendar View

- **View Type**: Month view only
- **Layout**: Traditional calendar grid layout
- **Day Marking**:
  - Green: Day has completed habits/tasks
  - Red: Day has incomplete habits/tasks
  - Default: Neutral color for days with no habits/tasks

### 2. Habits

- **Language**: Czech (UI)
- **Examples**: Sport, Učení, Čtení
- **Frequency Types**:
  - Daily habits
  - Weekly habits
- **Completion Tracking**: Simple daily completion (checkmark)
- **Future Features** (Nice to have, not MVP):
  - Streaks tracking
  - Time-based habits

### 3. Tasks

- **Type**: Recurring only (no one-time tasks)
- **Frequency**: Daily or Weekly
- **Features**:
  - No priority levels
  - No due dates
  - Nice, clean design

### 4. Data Persistence

- **Storage**: localStorage only
- **No Import/Export**: Not included in initial version

### 5. Design & UI

- **Color Scheme**:
  - Base: White/Black
  - Completion: Green (completed)
  - Incomplete: Red (not completed)
- **Theme**: No dark mode
- **Responsive**: Mobile-first design

### 6. Features NOT Included (Future)

- Statistics/Analytics
- Categories/Tags
- Search/Filter functionality

## User Flow

1. User opens the app
2. Sees calendar view for current month
3. Can add new habits/tasks
4. Can mark habits/tasks as complete for specific days
5. Calendar visually reflects completion status (green/red)

## Data Structure

- Habits and tasks stored in localStorage
- Each habit/task has:
  - Name (Czech)
  - Type (habit/task)
  - Frequency (daily/weekly)
  - Completion dates array

## Deployment

- **Platform**: Vercel
- **Project Name**: `habbits`
- **No Custom Domain**: For now
