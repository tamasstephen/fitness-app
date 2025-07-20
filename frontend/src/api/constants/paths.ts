export const paths = {
  liveTraining: {
    list: (userId: string) => `/users/${userId}/training-sessions`,
    details: (userId: string, trainingId: string) =>
      `/users/${userId}/training-sessions/${trainingId}`,
  },
  auth: {
    status: "/status",
  },
} as const;
