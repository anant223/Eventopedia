import { useCallback, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectUpdateProfileError,
  selectChangeEmailError,
  selectOnboardingError,
  selectPreferencesError,
  selectNotificationsError,
  selectAuthInitialized,
  selectUser,
  selectUserEvents,
} from "@/app/selector/authSelector";
import {localNotificationPreferances} from "@/app/slices/authSlice"
import {
  fetchCurrentUser,
  login,
  logout,
  signup,
  updateProfile,
  updatingPreferences,
  onBoardingComplete,
  notificationPreferences,
  fetchHistory,
  resetPassword,
  changeEmail,
  emailUpdateConfirmation,
  updateLocation,
  updatePassword,
  forgetPassword
} from "@/features/authActions.js";


export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const initialized = useSelector(selectAuthInitialized);
  const user = useSelector(selectUser);
  const userHistory = useSelector(selectUserEvents);

  const authError = useSelector(selectAuthError);
  const updateProfileError = useSelector(selectUpdateProfileError);
  const changeEmailError = useSelector(selectChangeEmailError);
  const onboardingError = useSelector(selectOnboardingError);
  const preferencesError = useSelector(selectPreferencesError);
  const notificationsError = useSelector(selectNotificationsError);

  useEffect(() => {
    if (!initialized) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, initialized]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchHistory());
    }
  }, [dispatch, isAuthenticated]);

  const refetchCurrUser = useCallback(() => {
    return dispatch(fetchCurrentUser()).unwrap();
  }, [dispatch]);

  const updateNewEmail = useCallback(
    ({ newEmail, password }) => {
      return dispatch(changeEmail({ newEmail, password }));
    },
    [dispatch]
  );

  const confirmEmailUpdate = useCallback(
    (token) => {
      return dispatch(emailUpdateConfirmation(token)).unwrap();
    },
    [dispatch]
  );

  const createSession = useCallback(
    (data) => {
      return dispatch(login(data)).unwrap();
    },
    [dispatch]
  );

  const createAccount = useCallback(
    (data) => {
      return dispatch(signup(data)).unwrap();
    },
    [dispatch]
  );

  const updateUserProfile = useCallback(
    (data) => {
      return dispatch(updateProfile(data)).unwrap();
    },
    [dispatch]
  );

  const onBoardingCompletion = useCallback(
    (data) => {
      return dispatch(onBoardingComplete(data)).unwrap();
    },
    [dispatch]
  );
  const updateUserCategory = useCallback(
    (categoryId) => {
      return dispatch(updatingPreferences(categoryId)).unwrap();
    },
    [dispatch]
  );

  const settingUserNotificationPreferences = useCallback(
    async ({ key, value }) => {
      dispatch(localNotificationPreferances({ key, value }));
      try {
        return await dispatch(notificationPreferences({ key, value })).unwrap();
      } catch {
        dispatch(localNotificationPreferances({ key, value: !value }));
        throw new Error("Failed");
      }
    },
    [dispatch]
  );

  const changePassword = useCallback(
    async (data) => {
      return dispatch(updatePassword(data));
    },
    [dispatch]
  );

  const changeLocation = useCallback(
    async (data) => {
      return dispatch(updateLocation(data));
    },
    [dispatch]
  );

  const forgetOldPassword = useCallback(
    (data) => {
      return dispatch(forgetPassword(data)).unwrap();
    },
    [dispatch]
  );
  const createNewPassword = useCallback(
    ({token, password}) => {
      return dispatch(resetPassword({token, password})).unwrap();
    },
    [dispatch]
  );

  return {
    changePassword,
    onBoardingCompletion,
    updateUserCategory,
    loading,
    initialized,
    isAuthenticated,
    refetchCurrUser,
    createAccount,
    updateUserProfile,
    createSession,
    user,
    settingUserNotificationPreferences,
    userHistory,
    logout: () => dispatch(logout()).unwrap(),
    updateNewEmail,
    confirmEmailUpdate,
    changeLocation,
    authError,
    updateProfileError,
    changeEmailError,
    onboardingError,
    preferencesError,
    notificationsError,
    forgetOldPassword,
    createNewPassword
  };
};

export default useAuth;
