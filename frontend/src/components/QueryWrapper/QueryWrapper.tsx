import { Dataset } from "@/interfaces/dataset";
import { Loading } from "../Loading";

interface QueryProps<T> {
  dataset: Dataset<T>;
  children: (data: T) => React.ReactNode;
  config?: {
    loading?: React.ReactNode;
    error?: React.ReactNode;
  };
}

export const QueryWrapper = <T,>({
  dataset,
  children,
  config,
}: QueryProps<T>) => {
  if (dataset.isLoading) {
    return config?.loading || <Loading />;
  }
  if (dataset.isError) {
    return config?.error || <div>Error</div>;
  }
  return children(dataset.data);
};
