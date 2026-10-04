export interface Lesson {
  id: string | number;
  title: string;
  duration?: string;
  completed?: boolean;
  lessonNumber?: string | number;
}

export interface Chapter {
  id: string | number;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string | number;
  title: string;
  chapters: Chapter[];
}

export const homeCourseData: Course = {
  id: 'copilot-course',
  title: 'Prompt Examples & AI Skills',
  chapters: [
    {
      id: 1,
      title: '1. Prompt Examples',
      lessons: [
        { id: '1-1', title: 'Teams', duration: '5m 10s', completed: false },
        { id: '1-2', title: 'Word', duration: '7m 18s', completed: false },
        { id: '1-3', title: 'Powerpoint', duration: '5m 18s', completed: false },
        { id: '1-4', title: 'Excel', duration: '7m 18s', completed: false },
        { id: '1-5', title: 'Outlook', duration: '5m 18s', completed: false },
      ],
    },
    {
      id: 2,
      title: '2. Build Your AI Skills with Copilot Prompt Gallery',
      lessons: [
        { id: '2-1', title: 'Teams', duration: '5m 10s', completed: false },
        { id: '2-2', title: 'Word', duration: '7m 18s', completed: false },
        { id: '2-3', title: 'Powerpoint', duration: '5m 18s', completed: false },
        { id: '2-4', title: 'Excel', duration: '7m 18s', completed: false },
        { id: '2-5', title: 'Outlook', duration: '5m 18s', completed: false },
      ],
    },
    {
      id: 3,
      title: '3. Explore Copilot Prompt Gallery',
      lessons: [
        { id: '3-1', title: 'Explore Copilot Prompt Gallery', duration: '3m 15s', completed: false },
      ],
    },
  ],
};

export const weeklySpecialsMovies = [
  {
    id: 1,
    src: '/images/Poster12.jpg',
    title: 'Clash of the Titans',
    badge: 'On Sale',
    price: 'Starts at $3.59',
  },
  {
    id: 2,
    src: '/images/Poster8.jpg',
    title: 'Instant Family',
    badge: 'Buy on sale or stream',
    price: 'Family movie night',
  },
  {
    id: 3,
    src: '/images/Poster7.jpg',
    title: 'Peppermint',
    badge: 'On Sale',
    price: 'Starts at $3.99',
  },
  {
    id: 4,
    src: '/images/Poster10.jpg',
    title: 'Timecop',
    badge: 'On Sale',
    price: 'Starts at $3.99',
  },
  {
    id: 5,
    src: '/images/Poster14.jpg',
    title: 'Blue Beetle',
    badge: 'Member deal',
    price: 'Starts at $4.49',
  },
];
