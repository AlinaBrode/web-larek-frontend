import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { RootState, useSelector } from '../../services/store';

export const OrderInfo: FC = () => {
  /** TODO: взяли; почему не отображается? взять переменные orderData и ingredients из стора */
  const { newOrderResponse } = useSelector((state: RootState) => state.order);
  const ingredientsStore = useSelector((state: RootState) => state.ingredients);

  const orderData = newOrderResponse
    ? newOrderResponse.order
    : {
        createdAt: '',
        ingredients: [],
        _id: '',
        status: '',
        name: '',
        updatedAt: 'string',
        number: 0
      };

  const ingredients: TIngredient[] = ingredientsStore.ingredients
    ? ingredientsStore.ingredients
    : [];

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
