import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { CommonActions } from "@react-navigation/native";
import { HeaderLeft, HeaderTitle } from "@navigation/header";

type HeaderOptions = {
  title: string;
  headerLeftConfig?: {
    canGoBack: boolean;
    goBackAction?: () => void;
  };
};

const useHeaderOptions = (
  navigation: any, // Typ navigation z React Navigation
  options: HeaderOptions
) => {
  useFocusEffect(
    useCallback(() => {
      let parent: any = navigation;
      while (parent && "getParent" in parent) {
        const newParent = parent.getParent();
        if (!newParent) break;
        parent = newParent;
      }

      if (!parent) return;

      parent.setOptions({
        headerTitle: () => (
          <HeaderTitle
            isLeftVisible={options?.headerLeftConfig?.canGoBack || false}
            children={options.title}
          />
        ),
        headerLeft: options.headerLeftConfig
          ? () => (
              <HeaderLeft
                canGoBack={options.headerLeftConfig?.canGoBack || false}
                goBack={
                  options.headerLeftConfig?.goBackAction ||
                  (() => navigation.dispatch(CommonActions.goBack()))
                }
              />
            )
          : null,
      });

      return () => {};
    }, [navigation, options])
  );
};

export default useHeaderOptions;
