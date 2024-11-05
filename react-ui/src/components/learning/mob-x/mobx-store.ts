import { makeObservable, observable, action } from "mobx";

// Define your store class
class MobXCounterStore {
  count = 0;

  constructor() {
    // Make the class properties observable, and mark methods as actions
    makeObservable(this, {
      count: observable, // Mark 'count' as an observable
      increment: action, // Mark 'increment' as an action
      decrement: action, // Mark 'decrement' as an action
    });
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}

// Export a single instance of the store
export const mobXCounterStore = new MobXCounterStore();
