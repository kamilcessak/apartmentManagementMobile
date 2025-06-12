import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { Button, TextInput, useTheme } from "react-native-paper";
import * as yup from "yup";

import { HeaderLeft, HeaderTitle } from "@navigation/header";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FilesSection } from "@components/common/FilesSection";

const schema = yup.object().shape({
  address: yup.string().required("Address is required"),
  metric: yup.number().required("Metric is required"),
  roomCount: yup.number().required("Rooms count of your apartment is required"),
  monthlyCost: yup
    .number()
    .required("Monthly cost of renting your apartment is required"),
  description: yup.string().required("Description field is required"),
  equipment: yup.string(),
});

type FormValues = {
  address: string;
  metric: number;
  roomCount: number;
  monthlyCost: number;
  description: string;
  equipment?: string;
  photos?: string[];
  documents?: string[];
};

export const NewApartmentScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();

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
            <HeaderLeft canGoBack goBack={() => navigation.goBack()} />
          ),
          headerTitle: () => <HeaderTitle children="Nowy apartament" />,
        });
      }
    }, [])
  );

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const photos = watch("photos");
  const documents = watch("documents");
  console.log({ photos, documents });

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

  const { mutate } = useMutation({
    mutationFn: () => {},
  });

  const onSubmit = (data: FormValues) => {
    console.log({ data });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={{ padding: 16, gap: 8 }}>
        <TextInput
          label="Adres"
          mode="outlined"
          {...register("address")}
          onChangeText={(text: string) => setValue("address", text)}
          error={!!errors.address}
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
        <TextInput
          label="Adres"
          mode="outlined"
          {...register("address")}
          onChangeText={(text: string) => setValue("address", text)}
          error={!!errors.address}
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
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          Dodaj apartament
        </Button>
        <Button mode="outlined" onPress={() => navigation.goBack()}>
          Anuluj
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
