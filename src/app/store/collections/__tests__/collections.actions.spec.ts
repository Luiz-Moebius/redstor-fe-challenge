import { CollectionsActions } from '@app/store';
import { mockCollections } from '@app/store/collections/__tests__/mock';
import { Errors } from 'unsplash-js/dist/helpers/errors';


describe('CollectionsActions', () => {
  describe('loadCollections', () => {
    it('should create a loadCollections action with correct payload', () => {
      const page = 1;
      const perPage = 9;
      const action = CollectionsActions.loadCollections({ page, perPage });

      expect(action.type).toBe('[Collections] Load Collections');
      expect(action.page).toBe(page);
      expect(action.perPage).toBe(perPage);
    });
  });

  describe('loadCollectionsSuccess', () => {
    it('should create a loadCollectionsSuccess action with correct payload', () => {
      const collections = mockCollections;
      const total = 2;

      const action = CollectionsActions.loadCollectionsSuccess({ collections, total });

      expect(action.type).toBe('[Collections] Load Collections success');
      expect(action.collections).toEqual(collections);
      expect(action.total).toBe(total);
    });
  });

  describe('loadCollectionsFailure', () => {
    it('should create a loadCollectionsFailure action with correct payload', () => {
      const error: Errors = ['Internal Server Error'];

      const action = CollectionsActions.loadCollectionsFailure({ error });

      expect(action.type).toBe('[Collections] Load Collections failure');
      expect(action.error).toEqual(error);
    });
  });
});
