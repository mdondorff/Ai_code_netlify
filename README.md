# 7 Minute Workout

A fitness app that runs through a program of timed exercises, similar to the popular "7 Minute Workout" apps. Once started, the app shows the current exercise and counts down, then provides a short break before the next exercise.

## Features

- **Timed Exercises**: Each exercise runs for a configurable duration (default 30 seconds)
- **Rest Periods**: Short breaks between exercises (default 10 seconds)
- **Multiple Sets**: Option to repeat the entire program multiple times
- **Audio Feedback**: Acoustic signals at the end of each exercise
- **Voice Announcements**: Optional voice output announcing exercises and breaks
- **Exercise Images**: Visual representations of each exercise
- **Progress Tracking**: Visual progress ring and exercise counter
- **Pause/Resume**: Control your workout flow
- **Skip Breaks**: Option to skip rest periods

## Exercises

1. Squats
2. Jump Squats
3. Lunges
4. Scale (Balance)
5. Hollow Hold
6. Superman
7. Push-ups

## Settings

- **Exercise Duration**: 10-120 seconds (adjustable in 5-second increments)
- **Break Duration**: 5-60 seconds (adjustable in 5-second increments)
- **Number of Sets**: 1-10 sets
- **Voice Announcements**: Toggle on/off

## Local Development

```bash
netlify dev
```

The app will be available at `http://localhost:8888`.

## Deployment

The app automatically deploys to Netlify. The `src` folder is configured as the publish directory.