import { FC, useEffect, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredient-slice';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const { ingredients } = useSelector((state: RootState) => state.ingredients);
  const [ingredientData, setIngredentData] = useState<TIngredient | null>(null);

  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ingredients || !ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, []);

  useEffect(() => {
    setIngredentData(ingredients.filter((item) => item._id == params.id)[0]);
  }, [ingredients]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
