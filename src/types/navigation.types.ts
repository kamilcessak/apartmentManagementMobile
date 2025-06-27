import {
  CompositeNavigationProp,
  NavigationProp,
  NavigatorScreenParams,
  ParamListBase,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type MainNavigationPropType = CompositeNavigationProp<
  NavigationProp<ParamListBase>,
  StackNavigationProp<RootStackParamList>
>;

export type TenantsStackNavigatorParamList = {
  Tenants: undefined;
  NewTenant: undefined;
  TenantDetails: {
    tenantName?: string;
    id: string;
  };
};

export type ApartmentsStackNavigatorParamList = {
  Apartments: undefined;
  NewApartment: undefined;
  ApartmentDetails: {
    id: string;
  };
};

export type SettingsStackNavigatorParamList = {
  Settings: undefined;
  ProfileSettings: undefined;
};

export type LandlordStackParamList = {
  Home: undefined;
  Tenants: NavigatorScreenParams<TenantsStackNavigatorParamList>;
  Flats: NavigatorScreenParams<ApartmentsStackNavigatorParamList>;
  SettingsStack: NavigatorScreenParams<SettingsStackNavigatorParamList>;
};

export type TenantStackParamList = {
  Home: undefined;
  Rental: undefined;
  SettingsStack: NavigatorScreenParams<SettingsStackNavigatorParamList>;
};

export type UnauthenticatedStackParamList = {
  InitialScreen: undefined;
  SignInScreen: undefined;
};

export type RootStackParamList = {
  AuthenticatedLandlordStack: NavigatorScreenParams<LandlordStackParamList>;
  AuthenticatedTenantStack: NavigatorScreenParams<TenantStackParamList>;
  UnauthenticatedStack: NavigatorScreenParams<UnauthenticatedStackParamList>;
};
