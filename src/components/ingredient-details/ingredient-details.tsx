import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { RootState, useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { ingredients } = useSelector((state: RootState) => state.ingredients);
  const params = useParams();
  const ingredientData = ingredients.filter((item) => item._id == params.id)[0];

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
