import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserCoordsLocation } from "../../../redux/slices/authSlice";
export { useDispatch, useSelector } from "react-redux";
export { setUserCoordsLocation } from "../../../redux/slices/authSlice";

function useGetUserLocation() {
  const dispatch = useDispatch();
  const userCoordsLocation = useSelector((state) => state.auth.userCoordsLocation);

  const getGeoLocation = () => {
    return new Promise((res, rej) => {
      const getGeoLocationSuccess = (position) => {
        res(position.coords);
      };
      const getGeoLocationError = (err) => {
        rej(err.message);
      };
      navigator.geolocation.getCurrentPosition(
        getGeoLocationSuccess,
        getGeoLocationError
      );
    });
  };

  useEffect(() => {
    const getUseLocation = async () => {
      try {
        const userCoords = await getGeoLocation();
        const { latitude, longitude } = userCoords;
        console.log(userCoords);
        dispatch(setUserCoordsLocation({ lat: latitude, lng: longitude }));
      } catch (err) {
        console.log(err);
      }
    };

    if (!userCoordsLocation) {
      getUseLocation();
    }
  }, []);

  return {};
}

export default useGetUserLocation;
