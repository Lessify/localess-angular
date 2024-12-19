/**
 * Content Asset define reference to a Asset.
 */
export interface ContentAsset {

  /**
   * Define the type of Asset
   */
  kind: 'ASSET';

  /**
   * Unique identifier for the asset.
   */
  uri: string;
}
