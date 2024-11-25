import { ICollection, IPhoto } from '@app/interfaces';
import { State } from '@app/store/collections/collections.reducer';

export const mockPhoto: IPhoto = {
  id: '1',
  width: 800,
  height: 600,
  color: 'blue',
  description: 'A sample photo',
  alt_description: 'An alternative description',
  urls: {
    raw: 'raw_url',
    full: 'full_url',
    regular: 'regular_url',
    small: 'small_url',
    thumb: 'thumb_url',
    small_s3: 'small_s3_url'
  },
  links: {
    self: 'self_url',
    html: 'html_url',
    download: 'download_url',
    download_location: 'download_location_url'
  },
  user: {
    id: 'user1',
    username: 'user1',
    name: 'User One',
    first_name: 'User',
    last_name: 'One',
    profile_image: {
      large: 'large_image_url',
      medium: 'medium_image_url',
      small: 'small_image_url'
    },
    portfolio_url: 'portfolio_url',
    location: 'Earth'
  },
  likes: 100,
  views: 200
};

export const mockCollections: ICollection[] = [{
  id: 1,
  title: 'Collection 1',
  published_at: new Date(),
  cover_photo: mockPhoto,
  total_photos: 10
},
  {
    id: 2,
    title: 'Collection 2',
    published_at: new Date(),
    cover_photo: mockPhoto,
    total_photos: 5
  }];

export const mockSuccessState: State = {
  collections: mockCollections,
  total: 2,
  error: null,
  status: 'success'
};
