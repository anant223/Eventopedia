import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readCategories } from "@/features/categoryAction";

const useCategory = () => {
  const dispatch = useDispatch();

  const { categories, isCategoryLoading, error } = useSelector(
    (state) => state.category
  );

  // console.log(categories)
  useEffect(() => {
    dispatch(readCategories());
  }, [dispatch]);

  const reFetchCategory = useCallback(() => {
    dispatch(readCategories());
  }, [dispatch]);

  return {
    categories,
    isCategoryLoading,
    error,
    reFetchCategory,
  };
};

export default useCategory;
