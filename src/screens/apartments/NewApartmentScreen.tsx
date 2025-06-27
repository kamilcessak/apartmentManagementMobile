import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import * as yup from "yup";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  reverseGeocodeAsync,
} from "expo-location";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { StackNavigationProp } from "@react-navigation/stack";

import { FilesSection } from "@components/files";
import { handleCreateApartment } from "@services/apartments";
import { CreateApartmentType } from "@typings/apartment.types";
import { useToastNotification } from "@hooks/useToastNotification";
import { ApartmentsStackNavigatorParamList } from "@typings/navigation.types";
import useHeaderOptions from "@hooks/useHeaderOptions";
import { useAppTheme } from "@hooks/useAppTheme";

const schema: yup.ObjectSchema<CreateApartmentType> = yup.object().shape({
  address: yup.string().defined().required("Adres jest wymagany."),
  metric: yup.number().defined().required("Metraz jest wymagany."),
  roomCount: yup.number().defined().required("Liczba pokoi jest wymagana."),
  monthlyCost: yup
    .number()
    .defined()
    .required("Miesięczny czynsz jest wymagany."),
  description: yup.string().defined().required("Opis jest wymagany."),
  equipment: yup.string().optional().default(undefined),
  documents: yup
    .array()
    .of(yup.string().defined())
    .optional()
    .default(undefined),
  photos: yup.array().of(yup.string().defined()).optional().default(undefined),
});

type FormValues = CreateApartmentType;

type NavigationPropType = StackNavigationProp<
  ApartmentsStackNavigatorParamList,
  "NewApartment"
>;

export const NewApartmentScreen = () => {
  const navigation = useNavigation<NavigationPropType>();
  const { showNotification } = useToastNotification();
  const queryClient = useQueryClient();
  const theme = useAppTheme();

  useHeaderOptions(navigation, {
    title: "Nowy apartament",
    headerLeftConfig: {
      canGoBack: navigation.canGoBack(),
      goBackAction: () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Apartments" }],
          })
        );
        navigation.goBack();
      },
    },
  });

  const {
    handleSubmit,
    register,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      address: "",
      metric: 0,
      roomCount: 0,
      monthlyCost: 0,
      description: "",
      equipment: undefined,
      documents: undefined,
      photos: undefined,
    },
    resolver: yupResolver(schema),
  });

  const handleAddPhotoToForm = (url: string) => {
    const currentPhotos = watch("photos") || [];
    setValue("photos", [...currentPhotos, url]);
  };

  const handleAddDocumentsToForm = (url: string) => {
    const currentDocuments = watch("documents") || [];
    setValue("documents", [...currentDocuments, url]);
  };

  const handleRemovePhotoFromForm = (url: string) => {
    const currentPhotos = watch("photos") || [];
    const result = currentPhotos.filter((e) => e !== url);
    setValue("photos", [...result]);
  };

  const handleRemoveDocumentsFromForm = (url: string) => {
    const currentDocuments = watch("documents") || [];
    const result = currentDocuments.filter((e) => e !== url);
    setValue("documents", [...result]);
  };

  const handleGetAddressFromCoords = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const address = await reverseGeocodeAsync({ latitude, longitude });
      if (address.length > 0) {
        const { street, streetNumber, postalCode, city } = address[0];
        setValue(
          "address",
          `ul.${street} ${streetNumber}, ${postalCode} ${city}`
        );
      } else {
        alert("Nie rozpoznanu adresu z pobranych koordynatów.");
      }
    } catch (error) {
      console.error(error);
      alert("Wystąpił błąd podczas rozpoznawania adresu lokalizacji.");
    }
  };

  const handleGetLocation = async () => {
    try {
      const result = await requestForegroundPermissionsAsync();
      if (result.status !== "granted") {
        alert("Brak uprawnień do pobrania lokalizacji mieszkania.");
        return;
      } else {
        const location = await getCurrentPositionAsync({});
        if (location.coords) {
          await handleGetAddressFromCoords(
            location.coords.latitude,
            location.coords.longitude
          );
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      console.error(error);
      alert("Wystąpił błąd podczas pobierania lokalizacji. Spróbuj ponownie.");
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormValues) => handleCreateApartment(data),
    onSuccess: () => {
      showNotification("Pomyślnie dodano nowy apartament!", "success");
      queryClient.invalidateQueries({ queryKey: ["apartments", "list"] });
      navigation.goBack();
    },
    onError: (error) => {
      console.error("hejka", { error });
      showNotification("Wystąpił błąd podczas tworzenia apartamentu.", "error");
    },
  });

  const onSubmit = (data: FormValues) => mutate(data);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.customBackground }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={{ padding: 16, gap: 8 }}>
        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Adres"
              mode="outlined"
              onChangeText={onChange}
              error={!!errors.address}
              onBlur={onBlur}
              value={value}
              right={
                <TextInput.Icon icon="map-marker" onPress={handleGetLocation} />
              }
            />
          )}
        />
        <TextInput
          label="Metraz"
          mode="outlined"
          {...register("metric")}
          onChangeText={(text: string) => setValue("metric", +text)}
          error={!!errors.metric}
        />
        <TextInput
          label="Liczba pokoi"
          mode="outlined"
          {...register("roomCount")}
          onChangeText={(text: string) => setValue("roomCount", +text)}
          error={!!errors.roomCount}
        />
        <TextInput
          label="Miesięczny czynsz"
          mode="outlined"
          {...register("monthlyCost")}
          onChangeText={(text: string) => setValue("monthlyCost", +text)}
          error={!!errors.monthlyCost}
        />
        <TextInput
          label="Opis"
          mode="outlined"
          multiline
          {...register("description")}
          onChangeText={(text: string) => setValue("description", text)}
          error={!!errors.description}
          style={{ height: 100 }}
        />
        <TextInput
          label="Wyposazenie"
          multiline
          mode="outlined"
          {...register("equipment")}
          onChangeText={(text: string) => setValue("equipment", text)}
          error={!!errors.equipment}
          style={{ height: 100 }}
        />
        <FilesSection
          title="Zdjęcia"
          handleAddForm={handleAddPhotoToForm}
          handleRemoveForm={handleRemovePhotoFromForm}
        />
        <FilesSection
          title="Dokumenty"
          handleAddForm={handleAddDocumentsToForm}
          handleRemoveForm={handleRemoveDocumentsFromForm}
        />
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isPending}
        >
          {`Dodaj apartament`}
        </Button>
        <Button mode="outlined" onPress={navigation.goBack}>
          {`Anuluj`}
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
