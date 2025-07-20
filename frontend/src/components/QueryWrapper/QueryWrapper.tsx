import { Dataset } from "@/types/dataset";

interface QueryProps<T> {
  dataset: Dataset<T>;
  children: (data: T) => React.ReactNode;
}

export const QueryWrapper = <T,>({ dataset, children }: QueryProps<T>) => {
  if (dataset.isLoading) {
    return <div>Loading...</div>;
  }
  if (dataset.isError) {
    return <div>Error</div>;
  }
  return children(dataset.data);
};
