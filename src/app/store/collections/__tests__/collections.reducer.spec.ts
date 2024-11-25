import * as fromCollections from '@app/store/collections/collections.reducer';
import { mockCollections, mockSuccessState } from '@app/store/collections/__tests__/mock';
import { CollectionsActions } from '@app/store';

describe('Collections Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const initialState= fromCollections.initialState;
      const action = {
        type: 'Unknown',
      };
      const state = fromCollections.reducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });

  describe('loadCollectionsSuccess action', () => {
    it('should retrieve all books and update the state in an immutable way', () => {
      const initialState= fromCollections.initialState;
      const newState = mockSuccessState;
      const action = CollectionsActions.loadCollectionsSuccess({ collections: mockCollections, total: 2 });
      const state = fromCollections.reducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });
  });
});
