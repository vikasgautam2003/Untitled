import { StateGraph } from "@langchain/langgraph";

export const createBaseGraph = () => {
  const graph = new StateGraph({
    channels: {
      input: {
        value: null
      }
    }
  });

  return graph;
};
