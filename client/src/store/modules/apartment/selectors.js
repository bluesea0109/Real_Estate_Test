import { get } from 'lodash';

export const selectApartments = (state) => get(state, 'apartment.apartments');

export const selectapartment = (state) => get(state, 'apartment.apartment');

export const selectApartmentStatus = (state) => get(state, 'apartment.status');

export const selectApartmentError = (state) => get(state, 'apartment.error');
