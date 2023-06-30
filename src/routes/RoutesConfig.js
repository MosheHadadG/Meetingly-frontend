import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import {
  LOGIN,
  ON_BOARDING,
  REGISTER,
  PASSWORD_REST,
  ROOT,
  INTERESTS,
  DASHBOARD,
  CREATE_EVENT,
  NOTIFICATION,
  EVENTS_REQUESTS,
  CALENDAR,
  FAVORITES,
  CHAT,
} from "./CONSTANTS";

import RegistrationProvider from "../services/contexts/Registeration";
import PrivateRoutes from "./Auth/PrivateRoutes";
import Spinner from "../components/Spinner/Spinner";
import PublicRoutes from "./Auth/PublicRoutes";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const OnBoardingPage = lazy(() => import("../pages/OnBoardingPage/OnBoardingPage"));
const RestPasswordPage = lazy(() => import("../pages/RestPasswordPage/RestPasswordPage"));
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const EventPage = lazy(() => import("../pages/EventPage/EventPage"));
const CalendarPage = lazy(() => import("../pages/CalendarPage/CalendarPage"));
const InterestsPage = lazy(() => import("../pages/InterestsPage/InterestsPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage/DashboardPage"));
const CreateEventPage = lazy(() => import("../pages/CreateEventPage/CreateEventPage"));
const NotificationsPage = lazy(() =>
  import("../pages/NotificationsPage/NotificationsPage")
);
const EventsRequestsPage = lazy(() =>
  import("../pages/EventsRequestsPage/EventsRequestsPage")
);
const FavoritesPage = lazy(() => import("../pages/FavoritesPage/FavoritesPage"));
const ChatPage = lazy(() => import("../pages/ChatPage/ChatPage"));
function RoutesConfig() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path={ROOT} element={<HomePage />} />
          <Route path={LOGIN} element={<LoginPage />} />
          <Route
            path={REGISTER}
            element={
              <RegistrationProvider>
                <RegisterPage />
              </RegistrationProvider>
            }
          />
          <Route path={PASSWORD_REST} element={<RestPasswordPage />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path={INTERESTS} element={<InterestsPage />} />
          <Route path={ON_BOARDING} element={<OnBoardingPage />} />
          <Route index path={DASHBOARD} element={<DashboardPage />} />
          <Route path={"/events/:eventType/:eventId"} element={<EventPage />} />
          <Route path={CREATE_EVENT} element={<CreateEventPage />} />
          <Route path={NOTIFICATION} element={<NotificationsPage />} />
          <Route path={EVENTS_REQUESTS} element={<EventsRequestsPage />} />
          <Route path={"/profile/:username"} element={<ProfilePage />} />
          <Route path={CALENDAR} element={<CalendarPage />} />
          <Route path={FAVORITES} element={<FavoritesPage />} />
          <Route path={CHAT} element={<ChatPage />} />
        </Route>

        {/* Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default RoutesConfig;
