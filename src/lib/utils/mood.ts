type MoodColor = {
  [key: string]: string;
};

const moodColors: MoodColor = {
  happy: 'bg-green-400/50',
  sad: 'bg-blue-400/50',
  anxious: 'bg-yellow-400/50',
  peaceful: 'bg-purple-400/50',
  neutral: 'bg-gray-400/50',
  excited: 'bg-pink-400/50',
  scared: 'bg-red-400/50',
  frustrated: 'bg-red-500/50',
  embarrassed: 'bg-yellow-400/50',
  confused: 'bg-indigo-400/50',
  hopeful: 'bg-teal-400/50',
  surprised: 'bg-orange-400/50',
  content: 'bg-green-300/50',
  lonely: 'bg-blue-300/50',
  relieved: 'bg-green-200/50',
  guilty: 'bg-red-300/50',
  love: 'bg-pink-500/50',
  disgust: 'bg-green-600/50',
  proud: 'bg-purple-500/50',
  tired: 'bg-gray-300/50',
  curious: 'bg-indigo-500/50',
  nostalgic: 'bg-yellow-300/50'
};

export function getMoodColor(mood: string): string {
  const lowerMood = mood.toLowerCase();
  return moodColors[lowerMood] || moodColors.neutral;
}