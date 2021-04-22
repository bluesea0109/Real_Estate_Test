import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { listApartment } from 'store/modules/apartment';

import { ApartmentMap, ApartmentTable } from 'containers';

const ApartmentPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listApartment());
  }, [dispatch]);

  const getListApartment = (page, filter) => {
    dispatch(listApartment({ ...filter, page }));
  };

  return (
    <div className='page user-page'>
      <h1 className='page-heading'>Apartments</h1>
      <ApartmentTable getListApartment={getListApartment} />
      <ApartmentMap />
    </div>
  );
};
export default ApartmentPage;
