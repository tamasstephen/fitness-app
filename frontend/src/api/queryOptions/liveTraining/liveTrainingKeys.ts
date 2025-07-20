export const liveTrainingKeys = {
  all: ["liveTrainingSessions"] as const,
  list: (userId: string) => [...liveTrainingKeys.all, userId] as const,
  details: (userId: string, trainingId: string) =>
    [...liveTrainingKeys.list(userId), trainingId] as const,
};
