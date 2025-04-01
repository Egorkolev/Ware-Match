export interface ListingImage {
  id: string;
  image_url: string;
}

export interface OperatingHours {
  day: string;
  open: boolean;
  start_time: string;
  end_time: string;
  schedule_appointment: boolean;
}

export interface Contact {
  id: string;
  name: string;
  phone_number: string;
  email: string;
}

export interface ApiListing {
  id: string;
  images: ListingImage[];
  operating_hours: OperatingHours[];
  product_types: string[];
  storage_conditions: string[];
  amenities: string[];
  services: string[];
  sublease_pricing_tiers: {
    id?: string;
    min_sqft?: number;
    max_sqft?: number;
    price_per_sqft?: number;
  }[];
  contacts: Contact[];
  floor_plan: string | null;
  display_image: string | null;
  ListingName: string;
  Availability: boolean;
  StartDate: string;
  EndDate: string | null;
  ListingDetails: string;
  point: string;
  Location: string;
  lat: number;
  lng: number;
  city: string;
  province: string;
  available_square_footage: string;
  available_pallets: number;
  pallets_available: boolean;
  fee_percentage: string;
  currency: string;
  minimum_month_required: number;
  minimum_order_quantity: number;
  tenant_labor_allowed: boolean;
  additional_details: string;
  coverage_amount: string;
  insurance_type: string;
  insurance_type_other: string | null;
  require_tenants_insurance: boolean;
  insurance_document: string | null;
  order_reception_method: string;
  order_reception_description: string;
  provides_monthly_reports: boolean;
  payment_terms: string;
  payment_frequency: string;
  payment_method: string;
  payment_method_other: string | null;
  approved: boolean;
  ceiling_height: string;
  dock_doors: boolean;
  dock_door_quantity: number;
  dock_door_clearing_height: string;
  allows_trucks: boolean;
  types_of_trucks_allowed: string | null;
  forklift_operation: boolean;
  number_of_forklifts: number;
  racking: boolean;
  racking_pallet_height: string | null;
  wholesaling_space: boolean;
  available_square_footage_for_wholesale: string | null;
  tenant_insurance_amount: string | null;
  pricing_type: string;
  price_per_cubic_foot_per_month: string | null;
  price_per_standard_pallet_stackable_per_month: string | null;
  price_per_standard_pallet_non_stackable_per_month: string | null;
  price_per_wide_pallet_stackable_per_month: string | null;
  price_per_wide_pallet_non_stackable_per_month: string | null;
  price_per_tall_pallet_stackable_per_month: string | null;
  price_per_tall_pallet_non_stackable_per_month: string | null;
  non_standard_pallets_accepted: boolean;
  has_moq: boolean;
  price_per_inbound_pallet: string | null;
  price_per_outbound_pallet: string | null;
  labeling_price: string | null;
  palletization_price: string | null;
  kitting_assembly_price: string | null;
  pick_and_pack_price: string | null;
  destuffing_palletized_container_20ft: string | null;
  destuffing_palletized_container_40ft: string | null;
  destuffing_palletized_container_53ft: string | null;
  destuffing_non_palletized_container_cost_20ft: string | null;
  destuffing_non_palletized_container_cost_40ft: string | null;
  destuffing_non_palletized_container_cost_53ft: string | null;
  listing_type: string;
  forklift_rental: boolean;
  sublease_minimum_lease_period: string | null;
  hybrid_3pl_moq: string | null;
  sublease_per_sqft_price: string | null;
  sublease_tenant_insurance_type: string | null;
  landlord_approval_doc: string | null;
  proof_of_ownership_doc: string | null;
  forklift_rental_price: string | null;
  truck_level_doors: string | null;
  drive_in_doors: string | null;
  hydraulic_dock_levelers: boolean;
  mechanical_dock_levelers: boolean;
  edge_of_dock_levelers: boolean;
  dock_door_security: string | null;
  amps_and_volts: string | null;
  transformer_availability: boolean;
  backup_generator_capacity: string | null;
  floor_load_capacity: string | null;
  column_spacing: string | null;
  trailer_parking_stalls: string | null;
  outside_storage: boolean;
  Landlord_ID: string;
  referred_by_broker: string | null;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  availableSqft: number;
  location: string;
  type: ListingType;
  imageUrl?: string;
  images?: ListingImage[];
  city?: string;
  province?: string;
  services?: string[];
  amenities?: string[];
  contacts?: Contact[];
  createdAt?: string;
  updatedAt?: string;
  ceiling_height?: string;
  dock_doors?: boolean;
  dock_door_quantity?: number;
  product_types?: string[];
  storage_conditions?: string[];
}

export enum ListingType {
  SUBLEASE = 'sublease',
  THREE_PL = '3pl',
}

export interface ListingsResponse {
  listings: Listing[];
  success: boolean;
  message?: string;
} 