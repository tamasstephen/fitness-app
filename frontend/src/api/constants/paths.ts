export const paths = {
  liveTraining: {
    list: "/training-session",
    details: (trainingId: string) => `/training-session/${trainingId}`,
  },
  auth: {
    status: "/status",
  },
} as const;
