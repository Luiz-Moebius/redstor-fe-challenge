import { TestBed } from '@angular/core/testing';
import { UnsplashService } from '../unsplash.service';
import { Full } from 'unsplash-js/dist/methods/photos/types';
import { createApi } from 'unsplash-js';

describe('UnsplashService', () => {
  let service: UnsplashService;
  let mockApi: any;

  beforeEach(() => {
    mockApi = {
      collections: {
        list: jasmine.createSpy('list').and.returnValue(
          Promise.resolve({
            type: 'success',
            status: 200,
            response: {
              results: [{ id: '1', title: 'Test Collection' }],
              total: 1,
            },
            originalResponse: new Response(),
          })
        ),
        getPhotos: jasmine.createSpy('getPhotos').and.returnValue(
          Promise.resolve({
            type: 'success',
            status: 200,
            response: {
              results: [{ id: 'photo1', urls: { small: 'https://example.com/photo1' } }],
              total: 1,
            },
            originalResponse: new Response(),
          })
        ),
      },
      photos: {
        get: jasmine.createSpy('get').and.returnValue(
          Promise.resolve({
            type: 'success',
            status: 200,
            response: {
              id: 'photo1',
              urls: {
                full: 'https://example.com/photo1_full',
              },
              user: { name: 'User Test' },
            } as Full,
            originalResponse: new Response(),
          })
        ),
      },
    };

    spyOn<any>(createApi, 'bind').and.returnValue(() => mockApi);
    TestBed.configureTestingModule({
      providers: [UnsplashService],
    });

    service = TestBed.inject(UnsplashService);
    service.api = mockApi;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list collections successfully', (done) => {
    service.listCollections(1, 10).subscribe((response) => {
      expect(mockApi.collections.list).toHaveBeenCalledWith({ page: 1, perPage: 10 });
      expect(response.type).toBe('success');
      expect(response.response?.results.length).toBe(1);
      expect(response.response?.results[0].title).toBe('Test Collection');
      done();
    });
  });

  it('should list collection photos successfully', (done) => {
    const collectionId = 'test-collection-id';
    service.listCollectionPhotos(collectionId).subscribe((response) => {
      expect(mockApi.collections.getPhotos).toHaveBeenCalledWith({ collectionId });
      expect(response.type).toBe('success');
      expect(response.response?.results.length).toBe(1);
      expect(response.response?.results[0].urls.small).toBe('https://example.com/photo1');
      done();
    });
  });

  it('should get a photo by id successfully', (done) => {
    const photoId = 'test-photo-id';
    service.getPhoto(photoId).subscribe((response) => {
      expect(mockApi.photos.get).toHaveBeenCalledWith({ photoId });
      expect(response.type).toBe('success');
      expect(response.response?.id).toBe('photo1');
      expect(response.response?.urls.full).toBe('https://example.com/photo1_full');
      done();
    });
  });

  it('should handle error when listing collections', (done) => {
    mockApi.collections.list.and.returnValue(
      Promise.resolve({
        type: 'error',
        status: 404,
        errors: ['Collection not found'],
        originalResponse: new Response(),
      })
    );

    service.listCollections(1, 10).subscribe((response) => {
      expect(mockApi.collections.list).toHaveBeenCalledWith({ page: 1, perPage: 10 });
      expect(response.type).toBe('error');
      expect(response.status).toBe(404);
      expect(response.errors).toContain('Collection not found');
      done();
    });
  });
});
