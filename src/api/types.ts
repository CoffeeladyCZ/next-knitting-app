export type PatternCategory = {
  name: string;
  image: string;
  gaude_description: string;
};

export type PatternCategoriesResponse = PatternCategory[];

export type Photo = {
  id?: number;
  sort_order?: number;
  user_id?: number;
  x_offset?: number;
  y_offset?: number;
  square_url?: string;
  medium_url?: string;
  thumbnail_url?: string;
  small_url?: string;
  medium2_url?: string;
  small2_url?: string;
  caption?: string | null;
  caption_html?: string | null;
  copyright_holder?: string | null;
  shelved_url?: string;
};

export type YarnWeight = {
  id?: number;
  name?: string;
  ply?: string;
  wpi?: number;
};

export type PersonalAttributes = {
  favorited?: boolean;
  bookmark_id?: number;
  stash_ids?: number[];
};

export type Yarn = {
  certified_organic?: boolean;
  discontinued?: boolean;
  first_photo?: Photo;
  gauge_divisor?: number;
  grams?: number;
  id?: number;
  machine_washable?: boolean;
  max_gauge?: number;
  min_gauge?: number;
  name?: string;
  organic?: boolean;
  permalink?: string;
  personal_attributes?: PersonalAttributes;
  rating_average?: number;
  rating_count?: number;
  rating_total?: number;
  texture?: string;
  thread_size?: number;
  wpi?: number;
  yardage?: number;
  yarn_company_name?: string;
  yarn_weight?: YarnWeight[];
};

export type YarnResponse = Yarn[];

export type User = {
  id?: number;
  username?: string;
  tiny_photo_url?: string;
  small_photo_url?: string;
  photo_url?: string;
  profile_country_code?: string;
};

export type Designer = {
  crochet_pattern_count?: number;
  favorites_count?: number;
  id?: number;
  knitting_pattern_count?: number;
  name?: string;
  patterns_count?: number;
  permalink?: string;
  users?: User[];
};

export type PatternSource = {
  amazon_rating?: number | null;
  amazon_reviews?: number | null;
  amazon_sales_rank?: number | null;
  amazon_updated_at?: string | null;
  amazon_url?: string | null;
  approved_patterns_count?: number;
  asin?: string;
  author?: string;
  author_pattern_author_id?: number;
  author_surname?: string;
  book_binding?: string | null;
  completed?: boolean;
  created_at?: string;
  created_by_user_id?: number;
  designer_pending_patterns_count?: number;
  designer_users_count?: number;
  editorships_count?: number;
  favorites_count?: number;
  first_photo_id?: number | null;
  flaggings_count?: number;
  fulfilled_by_ravelry?: boolean;
  has_photo?: boolean;
  id?: number;
  isbn_13?: string | null;
  issue?: string | null;
  keywords?: string;
  label?: string | null;
  large_image_url?: string | null;
  last_pattern_edit?: string;
  link_id?: number;
  list_price?: number | null;
  lock_version?: number;
  medium_image_url?: string | null;
  name?: string;
  out_of_print?: boolean;
  pattern_source_type_id?: number;
  patterns_count?: number;
  pending_patterns_count?: number;
  periodical?: boolean;
  permalink?: string;
  photos_permitted?: boolean;
  popularity?: number;
  popularity_rank?: number;
  price?: number | null;
  publication_date?: string | null;
  publication_date_set?: number;
  publication_day_set?: number;
  publication_sort_order?: number | null;
  publication_year?: number | null;
  publisher_id?: number | null;
  shelf_image_path?: string | null;
  shelf_image_size?: number | null;
  small_image_url?: string | null;
  source_group_id?: number | null;
  stickies_count?: number;
  store_id?: number | null;
  updated_at?: string;
  url?: string;
  work_id?: number | null;
  notes?: string;
};

export type Pattern = {
  free?: boolean;
  id?: number;
  name?: string;
  permalink?: string;
  personal_attributes?: PersonalAttributes | null;
  first_photo?: Photo;
  designer?: Designer;
  pattern_author?: Designer;
  pattern_sources?: PatternSource[];
  description?: string;
  pattern_category?: PatternCategory;
  pattern_category_id?: number;
  pattern_category_name?: string;
  pattern_category_image?: string;
  pattern_category_gaude_description?: string;
};
export type Paginator = {
  last_page: number;
  page: number;
  page_count: number;
  page_size: number;
  results: number;
};

export type PatternResponse = {
  patterns: Pattern[];
  paginator: Paginator;
};

export type DownloadLocation = {
  url?: string;
  free?: boolean;
  type?: "ravelry" | "external";
};

export type PatternAttribute = {
  id?: number;
  name?: string;
  permalink?: string;
};

export type Pack = {
  yarn_id?: number;
  [key: string]: unknown;
};

export type Printing = {
  id?: number;
  name?: string;
  [key: string]: unknown;
};

export type Craft = {
  id: number;
  name: string;
  permalink: string;
};

export type PatternDetail = {
  comments_count?: number;
  craft: Craft;
  created_at?: string;
  currency?: string;
  currency_symbol?: string;
  difficulty_average?: number;
  difficulty_count?: number;
  download_location?: DownloadLocation;
  downloadable?: boolean;
  favorites_count?: number;
  free?: boolean;
  gauge?: string;
  gauge_description?: string;
  gauge_divisor?: number;
  gauge_pattern?: string;
  gauge_repeats?: string;
  generally_available?: string;
  has_uk_terminology?: boolean;
  has_us_terminology?: boolean;
  id?: number;
  languages?: string[];
  name?: string;
  notes_html?: string;
  notes?: string;
  packs?: Pack[];
  pattern_attributes?: PatternAttribute[];
  pattern_author?: Designer;
  pattern_categories?: PatternCategory[];
  pattern_needle_sizes?: string;
  pattern_type?: string;
  pdf_in_library?: boolean;
  pdf_url?: string;
  permalink?: string;
  personal_attributes?: PersonalAttributes;
  photos?: Photo[];
  price?: string;
  printings?: Printing[];
  product_id?: number;
  projects_count?: number;
  published?: string;
  queued_projects_count?: number;
  rating_average?: number;
  rating_count?: number;
  ravelry_download?: boolean;
  row_gauge?: string;
  sizes_available?: string;
  unlisted_product_ids?: number[];
  updated_at?: string;
  url?: string;
  volumes_in_library?: number[];
  yardage?: number;
  yardage_description?: string;
  yardage_max?: number;
  yarn_list_type?: string;
  yarn_weight?: YarnWeight[];
  yarn_weight_description?: string;
};

export type PatternDetailResponse = {
  pattern: PatternDetail;
};

