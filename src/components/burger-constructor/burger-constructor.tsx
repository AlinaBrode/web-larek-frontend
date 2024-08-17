import { FC, useEffect, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { fetchOrder } from '../../services/slices/order-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const { constructorItems } = useSelector((state: RootState) => state.burger);
  const { orderRequest, newOrderResponse } = useSelector(
    (state: RootState) => state.order
  );
  const navigate = useNavigate();

  // const orderRequest = false;
  const orderModalData = newOrderResponse ? newOrderResponse.order : null;

  useEffect(
    () => console.log('order modal data', orderModalData),
    [orderModalData]
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    dispatch(
      fetchOrder([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id)
      ])
    );
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={() => navigate(-1)}
    />
  );
};
