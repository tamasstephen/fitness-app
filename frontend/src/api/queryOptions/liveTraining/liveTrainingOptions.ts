import { queryOptions } from "@tanstack/react-query";
import { apiClient } from "../../apiClient";
import { liveTrainingKeys } from "./liveTrainingKeys";
import { paths } from "@/api/constants/paths";

const getLiveTrainingSessionBase = async (path: string) => {
  try {
    const response = await apiClient.get(path);
    return response.data;
  } catch (error) {
    console.error("Error fetching live training sessions:", error);
    throw error;
  }
};

const getLiveTrainingSessions = async (userId: string) => {
  return getLiveTrainingSessionBase(paths.liveTraining.list(userId));
};

const getLiveTrainingDetails = async (userId: string, trainingId: string) => {
  return getLiveTrainingSessionBase(
    paths.liveTraining.details(userId, trainingId)
  );
};

export const liveTrainingOptions = (userId: string) => {
  return queryOptions({
    queryKey: liveTrainingKeys.list(userId),
    queryFn: () => getLiveTrainingSessions(userId),
  });
};

export const liveTrainingDetailsOptions = (
  userId: string,
  trainingId: string
) => {
  return queryOptions({
    queryKey: liveTrainingKeys.details(userId, trainingId),
    queryFn: () => getLiveTrainingDetails(userId, trainingId),
  });
};
