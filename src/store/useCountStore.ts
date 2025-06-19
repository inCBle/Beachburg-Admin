import { create } from 'zustand';

export type CountState = {
  count: number;
  dispatch: (action: CountAction) => void;
};

export type CountActions = {
  decrement: (num: number) => void;
  increment: (num: number) => void;
};

export type CountAction = {
  type: 'increment' | 'decrement';
  payload: number;
};

const countReducer = (state: CountState, action: CountAction) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.payload };
    case 'decrement':
      return { count: state.count - action.payload };
    default:
      return state;
  }
};

export const useCountStore = create<CountState>((set) => ({
  count: 0,
  dispatch: (action: CountAction) => set((state: CountState) => countReducer(state, action)),
}));
