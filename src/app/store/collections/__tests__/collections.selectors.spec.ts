import { CollectionsSelectors } from '@app/store';
import { mockSuccessState } from '@app/store/collections/__tests__/mock';

describe('Collections Selectors', () => {
  it('should select the collections state', () => {
    const result = CollectionsSelectors.selectCollectionsFeature.projector(mockSuccessState);
    expect(result).toEqual(mockSuccessState);
  });

  it('should select the collections collection', () => {
    const result = CollectionsSelectors.selectCollectionsFeature.projector(mockSuccessState).collections;
    expect(result.length).toEqual(2);
    expect(result).toEqual(mockSuccessState.collections);
    expect(result[0].id).toEqual(1);
  });

  it('should select the collections total', () => {
    const result = CollectionsSelectors.selectCollectionsFeature.projector(mockSuccessState).total;
    expect(result).toEqual(mockSuccessState.total);
  });
});
