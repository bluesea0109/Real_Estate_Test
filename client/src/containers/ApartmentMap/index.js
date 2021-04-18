import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import GoogleMapReact from 'google-map-react';

import {
  LIST_APARTMENT,
  selectApartments,
  selectApartmentStatus,
} from 'store/modules/apartment';
import { MAP_API_KEY } from 'utils/config';

const MyMarker = ({ text, tooltip }) => (
  <div className='map-circle'>
    <span className='map-circle-text' title={tooltip}>
      {text}
    </span>
  </div>
);

const ApartmentMap = () => {
  const apartments = useSelector(selectApartments);
  const status = useSelector(selectApartmentStatus);

  const center = useMemo(() => {
    let center = { lat: 0, lng: 0 };
    if (!apartments?.results.length) {
      return center;
    }

    apartments.results.forEach((apartment) => {
      center.lat += apartment.latitude;
      center.lng += apartment.longitude;
    });

    const length = apartments.results.length;

    return { lat: center.lat / length, lng: center.lng / length };
  }, [apartments]);

  const isLoading = [LIST_APARTMENT].includes(status);

  return (
    <div className='page-paragraph map-content'>
      {!isLoading && (
        <GoogleMapReact
          bootstrapURLKeys={{
            key: MAP_API_KEY,
            language: 'en',
            region: 'US',
          }}
          defaultCenter={center}
          defaultZoom={5}
        >
          {apartments.results.map(({ latitude, longitude, id, address }) => {
            return (
              <MyMarker
                key={id}
                lat={latitude}
                lng={longitude}
                text={id}
                tooltip={address}
              />
            );
          })}
        </GoogleMapReact>
      )}
    </div>
  );
};

export default ApartmentMap;
