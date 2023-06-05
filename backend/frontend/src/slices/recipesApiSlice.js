import { apiSlice } from './apiSlice'
const RECIPES_URL = '/api/recipes'

export const recipesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchRecipes: builder.mutation({
      query: () => ({
        url: `${RECIPES_URL}`,
        method: 'GET',
      }),
    }),
    fetchUserRecipes: builder.mutation({
      query: (data) => ({
        url: `${RECIPES_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    createRecipes: builder.mutation({
      query: (data) => ({
        url: `${RECIPES_URL}/create`,
        method: 'POST',
        body: data,
      }),
    }),
    saveRecipes: builder.mutation({
      query: (data) => ({
        url: `${RECIPES_URL}/save`,
        method: 'PUT',
        body: data,
      }),
    }),
    unsaveRecipes: builder.mutation({
      query: (data) => ({
        url: `${RECIPES_URL}/unsave`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteRecipes: builder.mutation({
      query: (data) => ({
        url: `${RECIPES_URL}/delete`,
        method: 'DELETE',
        body: data,
      }),
    }),
  }),
})

export const {
  useFetchRecipesMutation,
  useFetchUserRecipesMutation,
  useCreateRecipesMutation,
  useSaveRecipesMutation,
  useUnsaveRecipesMutation,
  useDeleteRecipesMutation,
} = recipesApiSlice
