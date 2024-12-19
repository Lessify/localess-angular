import { ContentData } from './content-data';

/**
 * Content define shared object for all possible Content Types.
 */
export interface Content {

  /**
   * Date and Time at which the Content was created.
   */
  createdAt: string;
  data?: ContentData;

  /**
   * Combination of SLUG and Parent SLUG of the Content
   */
  fullSlug: string;

  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Define the type of Content, whether it is a FOLDER or DOCUMENT.
   */
  kind: 'FOLDER' | 'DOCUMENT';

  /**
   * Locale unique identifier (ISO 639-1).
   */
  locale?: string;

  /**
   * Name of the Content
   */
  name: string;

  /**
   * Parent SLUG of the Content
   */
  parentSlug: string;

  /**
   * Date and Time at which the Content was published.
   */
  publishedAt?: string;

  /**
   * SLUG of the Content
   */
  slug: string;

  /**
   * Date and Time at which the Content was updated.
   */
  updatedAt: string;
}
