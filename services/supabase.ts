import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://ibqteijlgtdcbjrlyldg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlicXRlaWpsZ3RkY2Jqcmx5bGRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzAyMjksImV4cCI6MjA2Mjk0NjIyOX0.dDZN8mDwaRILkGZnCVgQKoSq7vcTQNRhNo9YcDLQUJs'
const supabase = createClient(supabaseUrl, supabaseKey);


// 数据库表名
const TABLE_NAME = 'movie-metrics';

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const { data, error: selectError } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('search_term', query)
      .limit(1)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      // PGRST116 means no rows found; treat as not existing
      throw selectError;
    }

    if (data) {
      // 如果存在，更新 count + 1
      const { error: updateError } = await supabase
        .from(TABLE_NAME)
        .update({ count: data.count + 1 })
        .eq('id', data.id);

      if (updateError) {
        throw updateError;
      }
    } else {
      // 如果不存在，插入新记录
      const { error: insertError } = await supabase.from(TABLE_NAME).insert([
        {
          search_term: query,
          movie_id: movie.id,
          title: movie.title,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        },
      ]);

      if (insertError) {
        throw insertError;
      }
    }
  } catch (error) {
    console.error('Error updating search count:', error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('count', { ascending: false })
      .limit(5);

    if (error) {
      throw error;
    }

    return data as TrendingMovie[];
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return undefined;
  }
};
