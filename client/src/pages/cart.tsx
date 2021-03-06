import React, { Fragment } from 'react';
import { gql, useQuery } from '@apollo/client';

import { Header, Loading } from '../components';
import { CartItem, BookTrips } from '../containers';
import { RouteComponentProps } from '@reach/router';
import { GetCartItems } from './__generated__/GetCartItems';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Hz0M9EFOSIpEmcfLAQ29T77q1EWmlOmPeGGwAnA0Hq2w4ePdQ5ZjkSpuwClbzM8ERAjFN7QG4cduzlddtsDU1HZ001y6FzX3e');//STRIPE_PUBLISH_API_KEY

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

interface CartProps extends RouteComponentProps {}

const Cart: React.FC<CartProps> = () => {
  const { data, loading, error } = useQuery<GetCartItems>(
    GET_CART_ITEMS
  );

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <Fragment>
      <Header>My Cart</Header>
      {data?.cartItems.length === 0 ? (
        <p data-testid="empty-message">No items in your cart</p>
      ) : (
        <Fragment>
          {data?.cartItems.map((launchId: any) => (
            <CartItem key={launchId} launchId={launchId} />
          ))}
          <Elements stripe={stripePromise}>
            <BookTrips cartItems={data?.cartItems || []} />
          </Elements>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Cart;
