import { useQuery } from "@tanstack/react-query";
import { liveTrainingOptions } from "../queryOptions/liveTraining/liveTrainingOptions";

export const useLiveTrainings = (userId: string) => {
  return useQuery(liveTrainingOptions(userId));
};
