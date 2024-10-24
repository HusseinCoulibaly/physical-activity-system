// utils/mockData.js
const generateMockHealthData = (userId) => {
    const mockData = {
      userId,
      heartRate: Math.floor(Math.random() * (120 - 60 + 1)) + 60, // Fréquence cardiaque entre 60 et 120 BPM
      caloriesBurned: Math.floor(Math.random() * 500) + 100, // Calories brûlées entre 100 et 600
      steps: Math.floor(Math.random() * 10000) + 3000, // Nombre de pas entre 3000 et 13000
    };
    return mockData;
  };
  
  module.exports = generateMockHealthData;
  