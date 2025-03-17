import fetchHelper, { makeMutateOpts } from "./fetch-util";

export const getAllITEMS = async () => {
  return await fetchHelper<unknown>('/ITEMS');
};

export const createITEM = async (newData: unknown) => {
  return await fetchHelper<unknown>('/ITEMS', makeMutateOpts(newData));
}
