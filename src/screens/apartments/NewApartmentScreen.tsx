import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { useCallback } from "react";
import { Button, TextInput, useTheme } from "react-native-paper";
import * as yup from "yup";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  reverseGeocodeAsync,
} from "expo-location";

import { HeaderLeft, HeaderTitle } from "@navigation/header";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { FilesSection } from "@components/files";
import { handleCreateApartment } from "@services/apartments";
import { CreateApartmentType } from "@types/apartment.types";
import { useToastNotification } from "@hooks/useToastNotification";

const schema = yup.object().shape({
  address: yup.string().required("Address is required"),
  metric: yup.number().required("Metric is required"),
  roomCount: yup.number().required("Rooms count of your apartment is required"),
  monthlyCost: yup
    .number()
    .required("Monthly cost of renting your apartment is required"),
  description: yup.string().required("Description field is required"),
  equipment: yup.string(),
  documents: yup.array().of(yup.string()).notRequired(),
  photos: yup.array().of(yup.string()).notRequired(),
});

type FormValues = CreateApartmentType;

export const NewApartmentScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { showNotification } = useToastNotification();
  const queryClient = useQueryClient();

  useFocusEffect(
    useCallback(() => {
      let parent = navigation;
      while (parent && parent.getParent) {
        const newParent = parent.getParent();
        if (!newParent) break;
        parent = newParent;
      }

      if (parent) {
        parent.setOptions({
          headerLeft: () => (
            <HeaderLeft
              canGoBack
              goBack={() => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Apartments" }],
                  })
                );
                navigation.goBack();
              }}
            />
          ),
          headerTitle: () => (
            <HeaderTitle children="Nowy apartament" isLeftVisible />
          ),
        });
      }
    }, [])
  );

  const {
    handleSubmit,
    register,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
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

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white" }}
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
          label="Metric"
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
          Dodaj apartament
        </Button>
        <Button mode="outlined" onPress={() => navigation.goBack()}>
          Anuluj
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
