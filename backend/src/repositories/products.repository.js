import { supabase } from '../config/supabase.js';

export async function findProducts(query = '') {
  if (!supabase) {
    return [];
  }

  let base = supabase.from('products').select('*');

  if (query) {
    base = base.ilike('name', `%${query}%`);
  }

  const { data, error } = await base;

  if (error) {
    throw error;
  }

  return data ?? [];
}
