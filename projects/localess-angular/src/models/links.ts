import { ContentMetadata } from './content-metadata';

/**
 * Key-Value Object. Where Key is Unique identifier for the Content object and Value is Content Metadata.
 */
export interface Links {

  [key: string]: ContentMetadata;
}
